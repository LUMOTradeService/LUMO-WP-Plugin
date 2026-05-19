# LUMO WP Plugin

Collection of gutenberg blocks and patterns.

## Included Blocks & Patterns

- Tabs (`tabs`): Accessible, keyboard-navigable tab container used to group related content into tabbed panels. Works together with one or more `tab-item` blocks.
- Tab item (`tab-item`): An individual tab panel that lives inside a `tabs` block; holds the content displayed when its tab is active.
- Icon (`icon`): Select and insert SVG icons from the bundled icon set (assets/icons/48px). Outputs an inline SVG with an editable label.
- Code / Prism (`code-prism`): Syntax-highlighted code block powered by Prism.js; includes language classes and client-side features (copy/download toolbar, language label).
- Category with all (`category-with-all`): Server-rendered block/pattern that lists post categories plus an "All" link; highlights the current category when on category/archive views.

## Requirements

- WordPress 6.8 or newer
- PHP 7.4 or newer
- Node.js (for building assets)

## Getting Started

### Installation

1. Copy the plugin folder into your WordPress `wp-content/plugins/` directory:

	 - `wp-content/plugins/lumo-wp-plugin`

2. From the WordPress admin, go to Plugins and activate **LUMO WP Plugin**.

### Development

- Build production-ready block assets:

	```bash
	npm run build
	```

- Start a watcher for local development:

	```bash
	npm run start
	```
 
## Usage

After activation you can insert the included blocks from the block inserter in the block editor. Registered block patterns (from `patterns/`) will also be available under the Patterns inserter.

The plugin registers block metadata from `build/blocks` using the block type registration APIs so blocks will automatically enqueue their editor and front-end assets.

## Contributing

- Fork the repository and open a pull request.
- Run the build and linters locally before submitting changes.
- Keep translations in mind when editing strings — the plugin uses the `lumo-wp-plugin` text domain.

## License

This plugin is released under the GPL-2.0-or-later license. See the `LICENSE` file for details.

## Author

LUMO trade service — https://lumopos.com/
