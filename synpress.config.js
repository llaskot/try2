const { defineConfig } = require('cypress');
const synpressPlugins = require('@synthetixio/synpress/plugins');


module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    timestamp: "longDate",
    reportDir: 'results',
    charts: true,
    code: true,
    overwrite: false,
    html: false,
    json: true,
    addUncougth: true
  },

  e2e: {
    baseUrl: 'https://redduck-flow-poc.netlify.app/',
    specPattern: 'tests/e2e/specs',
    supportFile: 'tests/support/index.js',
    viewportWidth: 1920,
    viewportHeight: 1080,
    videosFolder: 'mochawesome-report/assets/videos',
    screenshotsFolder: 'mochawesome-report/assets/screenshots',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
      return config
    },
    retries: { "runMode": 2, "openMode": 2 },
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 5000,
    requestTimeout: 5000,
  },
});