const version = require('../package.json').version
const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const isCI = require('is-ci')

const zip = new JSZip().folder('md-ui')
const root = zip.folder('md-ui')

const assetsPath = path.resolve(__dirname, '..', 'assets', 'dist')
const phpSrcPath = path.resolve(__dirname, '..', 'src')
const viewsPath = path.resolve(__dirname, '..', 'views')

// Add files to ZIP
fs.readdirSync(assetsPath).forEach(file => {
  const stat = fs.statSync(path.resolve(assetsPath, file))
  if (stat.isFile()) {
    root
      .folder('assets')
      .folder('dist')
      .file(file, fs.readFileSync(path.resolve(assetsPath, file)))
  } else if (stat.isDirectory()) {
    fs
      .readdirSync(path.resolve(assetsPath, file))
      .forEach(f =>
        root
          .folder('assets')
          .folder('dist')
          .folder(file)
          .file(f, fs.readFileSync(path.resolve(assetsPath, file, f)))
      )
  }
})

fs
  .readdirSync(phpSrcPath)
  .forEach(file =>
    root
      .folder('src')
      .file(file, fs.readFileSync(path.resolve(phpSrcPath, file)))
  )

fs
  .readdirSync(viewsPath)
  .forEach(file =>
    root
      .folder('views')
      .file(file, fs.readFileSync(path.resolve(viewsPath, file)))
  )

;['bootstrap.php', 'LICENSE', 'package.json'].forEach(file =>
  root.file(file, fs.readFileSync(path.resolve(__dirname, '..', file)))
)

// Generate ZIP file
zip
  .generateNodeStream({
    streamFiles: true,
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  })
  .pipe(fs.createWriteStream(
    isCI
      ? path.resolve(process.env.CIRCLE_ARTIFACTS, 'md_ui.zip')
      : `./md-ui_${version}.zip`
  ))
