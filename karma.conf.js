const isCI = require('is-ci')

const baseWebpackConfig = require('./build/webpack.base.conf')

const webpackConfig = {
  module: baseWebpackConfig.module,
  resolve: baseWebpackConfig.resolve
}

module.exports = function (config) {
  config.set({
    basePath: '',
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    frameworks: ['jasmine'],
    files: ['specs/**/*.spec.js'],
    exclude: [],
    preprocessors: {
      'specs/**/*.spec.js': ['webpack']
    },
    webpack: webpackConfig,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browserConsoleLogOptions: { terminal: false },
    autoWatch: false,
    browsers: ['ChromeHeadless', isCI ? 'Firefox' : 'FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    singleRun: true,
    concurrency: Infinity
  })
}
