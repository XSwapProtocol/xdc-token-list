import { schema } from '@uniswap/token-lists'
import Ajv, { ErrorObject } from 'ajv'
import { readdirSync, readFileSync } from 'fs'
import addFormats from 'ajv-formats'
import { basename, resolve } from 'path'

type ValidationResult = {
  file: string
  errors: ErrorObject[]
}

function getTokenListFiles(): string[] {
  const cliFiles = process.argv.slice(2)

  if (cliFiles.length > 0) {
    return cliFiles
  }

  return readdirSync(process.cwd())
    .filter(file => file.endsWith('.tokenlist.json'))
    .sort()
}

function formatError(error: ErrorObject): string {
  const path = error.instancePath || '/'
  const params = Object.keys(error.params).length ? ` ${JSON.stringify(error.params)}` : ''

  return `${path} ${error.message || 'is invalid'}${params}`
}

async function validate(): Promise<ValidationResult[]> {
  const ajv = new Ajv({ allErrors: true, verbose: true, strict: false })
  addFormats(ajv)
  const validator = ajv.compile(schema)
  const results: ValidationResult[] = []

  for (const file of getTokenListFiles()) {
    const resolvedFile = resolve(file)
    const data = JSON.parse(readFileSync(resolvedFile, 'utf-8'))
    const valid = validator(data)

    if (!valid) {
      results.push({
        file: resolvedFile,
        errors: validator.errors ? [...validator.errors] : []
      })
    }
  }

  return results
}

validate()
  .then(results => {
    if (results.length === 0) {
      console.log(`Valid token lists: ${getTokenListFiles().map(file => basename(file)).join(', ')}`)
      return
    }

    for (const result of results) {
      console.error(`Invalid token list: ${basename(result.file)}`)
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
