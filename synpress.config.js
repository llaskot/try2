const { defineConfig } = require('cypress');
const synpressPlugins = require('@synthetixio/synpress/plugins');


module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'report/results',
    overwrite: true,
    html: true,
    json: true,
  },

  e2e: {
    baseUrl: 'https://redduck-flow-poc.netlify.app/',
    specPattern: 'tests/e2e/specs',
    supportFile: 'tests/support/index.js',
    viewportWidth: 1366,
    viewportHeight: 850,
    videosFolder: 'report/results/assets/videos',
    screenshotsFolder: 'report/results/assets',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
      return config
    },
    retries: { "runMode": 0, "openMode": 1 },
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 5000,
    requestTimeout: 5000,
  },
});