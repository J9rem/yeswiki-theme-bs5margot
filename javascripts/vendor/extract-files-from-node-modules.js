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
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'javascripts/bs.bootstrap.bundle.min.js',
  { overwrite: true }
)
copySync(
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
  'javascripts/bootstrap.bundle.min.js.map',
  { overwrite: true }
)
copySync(
  'node_modules/bootstrap/LICENSE',
  'javascripts/BOOTSTRAP_LICENSE',
  { overwrite: true }
)

//mdbootstrap
copySync(
  'node_modules/mdbootstrap/js/mdb.min.js',
  'javascripts/vendor/mdbootstrap/mdb.min.js',
  { overwrite: true }
)
copySync(
  'node_modules/mdbootstrap/js/mdb.min.js.map',
  'javascripts/vendor/mdbootstrap/mdb.min.js.map',
  { overwrite: true }
)
copySync(
  'node_modules/mdbootstrap/license.txt',
  'javascripts/vendor/mdbootstrap/LICENSE',
  { overwrite: true }
)
copySync(
  'node_modules/mdbootstrap/css/mdb.min.css',
  'styles/vendor/mdbootstrap/mdb.min.css',
  { overwrite: true }
)
copySync(
  'node_modules/mdbootstrap/css/mdb.min.css.map',
  'styles/vendor/mdbootstrap/mdb.min.css.map',
  { overwrite: true }
)
copySync(
  'node_modules/mdbootstrap/license.txt',
  'styles/vendor/mdbootstrap/LICENSE',
  { overwrite: true }
)