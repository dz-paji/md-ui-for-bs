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
    autoWatch: true,
    browsers: ['ChromeHeadless', 'Firefox'],
    singleRun: true,
    concurrency: Infinity
  })
}
