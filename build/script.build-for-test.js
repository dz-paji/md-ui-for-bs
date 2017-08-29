process.env.NODE_ENV = 'production'

require('colors')

var
  shell = require('shelljs'),
  path = require('path'),
  env = require('./env-utils'),
  css = require('./css-utils'),
  config = require('../config'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.test.conf'),
  targetPath = path.join(__dirname, '../assets/dist')

require('./script.clean.js')
console.log((' Building Quasar App with "' + env.platform.theme + '" theme...\n').bold)

shell.mkdir('-p', targetPath)
shell.cp('-R', 'assets/src/statics', targetPath)

webpack(webpackConfig, function (err, stats) {
  if (err) throw err

  shell.cp('-R', 'test/mock/img', targetPath)
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')

  if (config.build.purifyCSS) {
    css.purify()
  }
})
