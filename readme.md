# UniCard #

## Description ##
UniCard - A block plugin that can be used to create a card block with featured image, title, description fields.

Features optional featured image, title and description fields. Text color as well as background color can be changed through the block's Color Settings. With option to change card layout, defaults to `column`.

## Installation ##
1. Upload the entire `/unicard` directory to the `/wp-content/plugins/` directory.
2. Activate UniCard through the \'Plugins\' menu in WordPress.
3. Add a UniCard block by selecting the `UniCard` block from `Common Blocks`
4. Choose or upload a featured image, add a title and description.
5. You can choose to change the text color and/or background color from the block settings.
6. The block can be set to full-width or wide-width when needed.
7. Text alignment can also be changed, alignment will be the same for both title and description.
8. Card layout can be set to `column`, `column-reverse`, `row`, `row-reverse`.

## Development Setup ##
1. Clone the repo https://github.com/khleomix/unicard `develop` branch to the `/wp-contents/plugins/`directory run `git clone -b develop git@github.com:khleomix/unicard.git`
2. Navigate to the plugin directory, run `cd unicard`
3. Install NPM: `npm install`
4. Run `npm start` or `npm run build` to compile.

## Frequently Asked Questions ##
### Are all fields required? ###
Featured image, title, and description fields are all optional and you can use one or a combination of two or all fields according to your needs.

### How do you change the alignment and width of UniCard? ###
The block can be set as full-width or wide-width together with the option to change text alignment through the Block Toolbar.

### How to change text color and background color? ###
UniCard settings on the sidebar allows you to set the following:
1. Color settings allow text color and background color change.
2. Display settings control card layout, defaults to `column` can be set to the following: `column`, `column-reverse`, `row`, `row-reverse`

## Changelog ##

### 1.0.2 ###
* Fix Image upload issue.

### 1.0.1 ###
* Added conditional to only show field containers if not empty.
* Added Display Option to change card layout.

### 1.0.0 ###
* Update README
* First release

