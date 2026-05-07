import Ajv, { ErrorObject } from 'ajv'
import addFormats from 'ajv-formats'
import { readFileSync } from 'fs'
import { basename, resolve } from 'path'

type ValidationResult = {
  file: string
  projectIndex?: number
  projectId?: string
  errors: ErrorObject[]
}

type ProjectList = {
  projects: unknown[]
}

function getProjectFile(): string {
  return process.argv[2] || 'projects.json'
}

function formatError(error: ErrorObject): string {
  const path = error.instancePath || '/'
  const params = Object.keys(error.params).length ? ` ${JSON.stringify(error.params)}` : ''

  return `${path} ${error.message || 'is invalid'}${params}`
}

function isProjectList(data: unknown): data is ProjectList {
  return Boolean(
    data &&
    typeof data === 'object' &&
    Array.isArray((data as ProjectList).projects)
  )
}

async function validate(): Promise<ValidationResult[]> {
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    validateSchema: false,
    verbose: true
  })
  addFormats(ajv)

  const schema = JSON.parse(readFileSync(resolve('schemes/project-schema.json'), 'utf-8'))
  const validator = ajv.compile(schema)
  const results: ValidationResult[] = []
  const file = resolve(getProjectFile())
  const data = JSON.parse(readFileSync(file, 'utf-8'))

  if (!isProjectList(data)) {
    return [{
      file,
      errors: [{
        instancePath: '/projects',
        schemaPath: '#/properties/projects',
        keyword: 'type',
        params: { type: 'array' },
        message: 'must be an array'
      } as ErrorObject]
    }]
  }

  for (const [projectIndex, project] of data.projects.entries()) {
    const valid = validator(project)

    if (!valid) {
      const projectId = project && typeof project === 'object' && 'id' in project
        ? String((project as { id: unknown }).id)
        : undefined

      results.push({
        file,
        projectIndex,
        projectId,
        errors: validator.errors ? [...validator.errors] : []
      })
    }
  }

  return results
}

validate()
  .then(results => {
    const projectFile = getProjectFile()

    if (results.length === 0) {
      console.log(`Valid project list: ${basename(projectFile)}`)
      return
    }

    for (const result of results) {
      const projectLabel = result.projectId || `#${result.projectIndex}`
      console.error(`Invalid project in ${basename(result.file)}: ${projectLabel}`)
      for (const error of result.errors) {
        console.error(`  - ${formatError(error)}`)
      }
    }

    process.exitCode = 1
  })
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
