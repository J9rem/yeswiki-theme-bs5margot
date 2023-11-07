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

function copySync(src, dest, opts) {
  if (fs.existsSync(src)) {
    fs.copySync(path.join(basePath, src), path.join(basePath, dest), opts)
  } else {
    console.log(`${src} is not existing !`)
  }
}

// bootstrap
copySync(
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'javascripts/bootstrap.min.js',
  { overwrite: true }
)
copySync(
  'node_modules/bootstrap/dist/js/bootstrap.min.js.map',
  'javascripts/bootstrap.min.js.map',
  { overwrite: true }
)
copySync(
  'node_modules/bootstrap/LICENSE',
  'javascripts/BOOTSTRAP_LICENSE',
  { overwrite: true }
)

copySync(
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'styles/vendor/bootstrap/bootstrap.min.css',
  { overwrite: true }
)

copySync(
  'node_modules/bootstrap/LICENSE',
  'styles/vendor/bootstrap/LICENSE',
  { overwrite: true }
)
