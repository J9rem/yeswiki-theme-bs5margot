# yeswiki-theme-bs5margot

 - [English](README.md)

Thème [YesWiki](https://yeswiki.net/) pour utiliser `bootstrap 5`.

## Auteurs

 - Jérémy Dufraisse
 - et tous les contributeurs et toutes les contributrices indiqués sur cette page : <https://github.com/J9rem/yeswiki-theme-bs5margot/graphs/contributors>

## Installation

Dans la page `GererMisesAJour` de votre YesWiki, rechercher le thème  `bs5margot` et l'installer. (L'extension non officielle [`alternativeupdatej9rem`](https://github.com/J9rem/yeswiki-extension-alternativeupdatej9rem) est nécessaire pour l'installation automatisée mais le thème peut aussi être installé à la main pour les connaisseurs et connaisseuses.)

## Coder

Le theme utilise des fichiers css [SASS](https://sass-lang.com/). Les développements doivent être faits dans `styles/scss/main.scss`.  
Puis vous devriez générer le fichier `.css` file (voir ci-dessous).

**NE PAS MODIFIER** `styles/not-editable/main.css`.  
Si vous voulez aider à développer ce thème mais que vous ne savez pas utilsier SASS, mettez vos lignes de code `css` dans le fichier `style/bs5.bs.css` et demandez aux développeurs de l'intégrer dans `styles/scss/main.scss`.

### Utilisation de `SASS`

[SASS](https://sass-lang.com/) est un moyen de générer automatiquemend des fichies `CSS` à partir de variables, d'héritage de class ou d'autres fonctionnalités utiles pour mutualiser les lignes de code.

Le moyen d'installation el plus connu est:
 - sur votre ordinateur de développement, installez [`nodejs`](https://nodejs.org/en/download) (avec `npm`)
 - pour un usage général à l'ordinateur:
   - installer `sass` en ligne de commande : `npm install -g sass`
   - démarrer l'outil de surveillance `sass --watch ./styles/scss/main.scss ./styles/not-editable/main.min.css --style compressed`
 - pour un usage local au projet :
   - installer [`yarn`](https://yarnpkg.com/)
   - démarrer l'outil de surveillance à partir de la ligne de commande depuis le dossier racine de ce projet `yarn watch-css`

Quand vous avez fini vos modifications, pensez à pousser le commit sur `git`.

## Garantie

Comme énoncé dans le fichier de licence, il n'y a pas de garantie sur l'usage de ce logiciel. Se référer au fichier de licence pour les détails.
Les développeurs de cette extension ne peuvent être responsables des conséquences qui découlent de l'usage de cette extension.