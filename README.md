# XDC Token List

## Short Guide
1) Create pair and add liquidity in [XSWAP](https://app.xspswap.finance/add/XDC)
2) Fork this repo
3) (optional) JSON file and fragment(for token list extending) can be generated here: https://xdc.sale/generate-json
4) Extend token list file for [Mainnet](https://raw.githubusercontent.com/XSwapProtocol/xdc-token-list/master/mainnet.tokenlist.json) | [Testnet](https://raw.githubusercontent.com/XSwapProtocol/xdc-token-list/master/testnet.tokenlist.json).
5) Create directory in [assets folder](https://github.com/XSwapProtocol/xdc-token-list/tree/master/assets/). The directory name for each token should be the [ERC-55](https://eips.ethereum.org/EIPS/eip-55)-formatted address of the token contract.
6) Open your token directory.
7) Add `logo.png` and `info.json`. Logo must be a **square** (recommended: 128x128) PNG w/ transparent background. Please compress using https://tinypng.com.
8) Create Pull Request to this repo from your forked one.
9) (optional) Ping me on telegram [@romanow_eth](https://t.me/popovitsch) to speed up merging process.


## Extending Fields for token list:

### Mandatory 

-  `chainId`:   Chain id. Mainnet - 50, Testnet - 51. As Number and not String.
-  `symbol`:    Short ticker style symbol of token.
-  `name`:      Longer human version of token.
-  `address`:   Address of XRC-20 token, in [ERC-55](https://eips.ethereum.org/EIPS/eip-55) mixed-case format.
-  `decimals`:  The decimals of the token. As Number and not String.

### Optional

-  `logoURI`: An optional logo of your token. Must be a **square** (recommended: 128x128) PNG w/ transparent background. Please compress using https://tinypng.com. By default: https://raw.githubusercontent.com/XSwapProtocol/xdc-token-list/master/assets/${address}/logo.png
-  `tags`:    An array of tag identifiers associated with the token.

### Example of editing `mainnet.tokenlist.json` file

- Before:
```
...
"tokens": [
    ...,
    {
      "chainId": 50,
      "address": "0x951857744785E80e2De051c32EE7b25f9c458C42",
      "name": "Wrapped XDC",
      "symbol": "WXDC",
      "decimals": 18
    }
 ]
```
- After:
```
...
"tokens": [
    ...,
    {
      "chainId": 50,
      "address": "0x951857744785E80e2De051c32EE7b25f9c458C42",
      "name": "Wrapped XDC",
      "symbol": "WXDC",
      "decimals": 18
    },
    {
     "chainId": 50,
      "address": "your_token_address",
      "name": "YOUR TOKEN NAME",
      "symbol": "YOUR TOKEN SMBL",
      "decimals": 18
    }
 ]
```

## `info.json` properties

-  `chainId`:     Chain id. Mainnet - 50, Testnet - 51. As Number and not String.
-  `symbol`:      Short ticker style symbol of token.
-  `name`:        Longer human version of token.
-  `address`:     Address of XRC-20 token, in [ERC-55](https://eips.ethereum.org/EIPS/eip-55) mixed-case format.
-  `decimals`:    The decimals of the token. As Number and not String.
-  `logoURI`:     An optional logo of your token. Must be a **square** (recommended: 128x128) PNG w/ transparent background. Please compress using https://tinypng.com. By default: https://raw.githubusercontent.com/XSwapProtocol/xdc-token-list/master/assets/${address}/logo.png
-  `website`:     Official URL of the website.
-  `tags`:        An array of tag identifiers associated with the token.
-  `links`:       Informational links array: twitter, telegram, email, discord, facebook, github, whitepaper.
-  `description`: Short description of the project.

# A last note

This list is maintained by volunteers in the community &amp; people like you around the internet. It may not always be up to date, and it may occasionally get it wrong. If you find an error or omission, please open an issue or make a PR with any corrections.

---

If you have a problem with git please don't hesitate to contact me on Telegram: [@popovitsch](https://t.me/popovitsch)
