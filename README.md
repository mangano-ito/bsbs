# BSBS

A BackstopJS-like Visual Regression Testing Tool for BrowserStack Automate

```sh
bsbs
  --mode=(reference|test|report)
  --file=<path to the backstop.json or backstop.js>
  --capabilities=<path to the selenium capability config>
  (--filter=<regexp of scenario>)
  (--local)
```

## See Example

Example Report: (TBD)
Configurations: (TBD)

## Usage

1. Capture Reference Pages:
   `bsbs --mode=reference --file=backstop.json --capabilities=capabilities.json`
2. Capture Test Pages:
   `bsbs --mode=test --file=backstop.json --capabilities=capabilities.json`
3. Compare and Generate Test Report:
   `bsbs --mode=report --file=backstop.json --capabilities=capabilities.json`

## Options

### `--mode`

  reference: run tests on reference pages
  test:      run tests on test pages
  report:    generate test reports (reference & test must be done before this)

### `--file`

  Path to BackstopJS Test: `backstop.json` | `backstop.js`
  (see https://github.com/garris/BackstopJS/tree/e4ef74b0f25c27125dffab1b14237f924dbf597e#using-backstopjs)

### `--capabilities`

  Path to Selenium Capabilities Configuration for BrowserStack Automate.
  (see https://www.browserstack.com/automate/capabilities)

  This file also can be provided in `.json` (`{ ... }`) or in `.js` (with `module.exports = { ... };`)

### `--filter` (Optional)

  filter scenarios to run by RegExp given
  (e.g.: `--filter="my-top-page.*"`)

### `--local` (Optional)

  enable BrowserStack local testing (using your internal network)
  (see https://www.browserstack.com/automate/node#setting-local-tunnel)

## Environment Variables

### `BROWSERSTACK_USERNAME` (Required unless given in capabilities file)

  The User ID for BrowserStack Automate
  (see https://www.browserstack.com/accounts/settings)

### `BROWSERSTACK_ACCESS_KEY` (Required unless given in capabilities file)

  The Access Key for BrowserStack Automate
  (see https://www.browserstack.com/accounts/settings)

### `ARTIFACTS_REFERENCE_PATH` (Optional)

  Path to the Directory for Reference Screenshots
  (default: `${working directory}/artifacts/reference/`)

### `ARTIFACTS_TEST_PATH` (Optional)

  Path to the Directory for Test Screenshots
  (default: `${working directory}/artifacts/test/`)

### `ARTIFACTS_DIFFERENCE_PATH` (Optional)

  Path to the Directory for Difference Images
  (default: `${working directory}/artifacts/difference/`)

### `ARTIFACTS_REPORT_PATH` (Optional)

  Path to the Directory for Test Reports
  (default: `${working directory}/artifacts/`)
