module.exports = {
  baseUrl: 'http://automationexercise.com',
  
  browser: {
    name: 'chrome',
    headless: false,
    windowSize: {
      width: 1920,
      height: 1080
    },
    implicitWait: 10000,
    pageLoadTimeout: 30000,
    scriptTimeout: 30000
  },

  timeouts: {
    element: 20000,
    page: 60000,
    script: 60000,
    implicit: 10000
  },

  screenshots: {
    enabled: true,
    onFailure: true,
    directory: './screenshots'
  },

  reporting: {
    enabled: true,
    directory: './reports',
    format: 'json'
  },

  test: {
    retries: 2,
    parallel: false,
    cleanup: true
  }
};
