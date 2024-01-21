const { defineConfig } = require('cypress');
const synpressPlugins = require('@synthetixio/synpress/plugins');


module.exports =  defineConfig({
  e2e: {
    baseUrl: 'https://redduck-flow-poc.netlify.app/',
    specPattern: 'tests/e2e/specs',
    supportFile: 'tests/support/index.js',
    viewportWidth: 1366,
    viewportHeight: 850,
    videosFolder: 'tests/e2e/videos',
    screenshotsFolder: 'tests/e2e/screenshots',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
      return config
    },
    retries: { "runMode": 1, "openMode": 1},
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    requestTimeout: 10000,
},
});