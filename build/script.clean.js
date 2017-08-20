var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../assets/dist/*'))
shell.rm('-rf', path.resolve(__dirname, '../assets/dist/.*'))
console.log(' Cleaned build artifacts.\n')
