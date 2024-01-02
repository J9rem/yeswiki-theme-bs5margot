/*
 * This file is part of the YesWiki Theme bs5margot.
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Extract files that we need from the node_modules folder
// The extracted files are integrated to the repository, so production server don't need to
// have node installed

// Include fs and path module

const fs = require('fs-extra')
const path = require('path')

const basePath = path.join(__dirname, '../../')

const copySync = (src, dest, opts) => {
  if (fs.existsSync(src)) {
    fs.copySync(path.join(basePath, src), path.join(basePath, dest), opts)
  } else {
    console.log(`${src} is not existing !`)
  }
}

const replaceInFile = (src,anchor,replacement) => {
  if (fs.existsSync(src)) {
    const filepath = path.join(basePath, src)
    fs.readFile(filepath, 'utf8', (err,data) => {
      if (err) {
        return console.log(err)
      }
      fs.writeFile(
        filepath,
        data.replace(anchor, replacement),
        'utf8',
        (err) => {
          if (err) {
            return console.log(err)
          }
        }
      )
    })
  } else {
    console.log(`${src} is not existing !`)
  }
}

// bootstrap
copySync(
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'javascripts/bs.bootstrap.bundle.min.js',
  { overwrite: true }
)
replaceInFile(
  'javascripts/bs.bootstrap.bundle.min.js',
  '//# sourceMappingURL=bootstrap.bundle.min.js.map',
  ''
)
copySync(
  'node_modules/bootstrap/LICENSE',
  'javascripts/BOOTSTRAP_LICENSE',
  { overwrite: true }
)
