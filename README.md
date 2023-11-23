# yeswiki-theme-bs5margot

 - [Français](LISEZMOI.md)

Theme [YesWiki](https://yeswiki.net/) to use `bootstrap 5`.

## Authors

 - Jérémy Dufraisse
 - and all contributors indicated on this page : <https://github.com/J9rem/yeswiki-theme-bs5margot/graphs/contributors>

## Install

In page `GererMisesAJour` on your YesWiki website, search theme  `bs5margot` and install it. (The not official extension [`alternativeupdatej9rem`](https://github.com/J9rem/yeswiki-extension-alternativeupdatej9rem) is required for the automatic install but the them can be manually installed by those who know.)

## Develop

The theme uses [SASS](https://sass-lang.com/) css files. Development should be done in `styles/scss/main.scss`.  
Then you should generate the `.css` file (see below).

**DOES NOT EDIT** `styles/not-editable/main.css`.  
If you want to help to develop this theme but does not know how to use SASS, put your `css` code into `style/bs5.bs.css` and ask to other developpers to integrate it into `styles/scss/main.scss`.

### Usage of `SASS`

[SASS](https://sass-lang.com/) is a way to automate the generation of `CSS` files from variables, extending and other features usable to pool lines of code.

The most known way to install it is:
 - on your developper computer, install [`nodejs`](https://nodejs.org/en/download) (with `npm`)
 - global usage:
   - install `sass` from command line : `npm install -g sass`
   - start the watcher `sass --watch ./styles/scss/main.scss ./styles/not-editable/main.css`
 - local usage:
   - install [`yarn`](https://yarnpkg.com/)
   - start watcher from command line from root folder of this project `yarn watch-css`

When you have finish your changes, think to push the commit on `git`.

## Warranty

Like written in the licence file, there is no warranty on usage of this software. Refer to licence file for details.
Developpers of this extension can not be responsible of consequences of the usage of this extension.
