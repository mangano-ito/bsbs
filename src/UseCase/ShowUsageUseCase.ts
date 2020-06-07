export function showUsage() {
    console.log(`
BSBS
----

A BackstopJS-like Visual Regression Testing Tool with BrowserStack Automate

npx bsbs
  --mode=(reference|test|report)
  --file=<path to the backstop.json or backstop.js>
  --capabilities=<path to the selenium capability config>
  (--filter=<regexp of scenario>)
  (--local)


Options
=======

--mode:
  reference: run tests on reference pages
  test:      run tests on test pages
  report:    generate test reports (reference & test must be done before this)

--file:
  Path to BackstopJS Test (backstop.json | backstop.js)

--capabilities:
  Path to Selenium Capabilities Configuration for BrowserStack Automate
  (see https://www.browserstack.com/automate/capabilities)

--filter: (Optional)
  filter scenarios to run by RegExp given
  (e.g.: --filter="my-top-page.*")

--local: (Optional)
  enable BrowserStack local testing (using your internal network)
  (see https://www.browserstack.com/automate/node#setting-local-tunnel)


Environment Variables
=====================

BROWSERSTACK_USERNAME: (Required unless given in capabilities file)
  The User ID for BrowserStack Automate
  (see https://www.browserstack.com/accounts/settings)

BROWSERSTACK_ACCESS_KEY: (Required unless given in capabilities file)
  The Access Key for BrowserStack Automate
  (see https://www.browserstack.com/accounts/settings)

ARTIFACTS_REFERENCE_PATH: (Optional)
  Path to the Directory for Reference Screenshots

ARTIFACTS_TEST_PATH: (Optional)
  Path to the Directory for Test Screenshots

ARTIFACTS_DIFFERENCE_PATH: (Optional)
  Path to the Directory for Difference Images

ARTIFACTS_REPORT_PATH: (Optional)
  Path to the Directory for Test Reports

`);
}
