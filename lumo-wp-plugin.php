<?php

/**
 * Plugin Name:       LUMO WP Plugin
 * Plugin URI:		  https://lumopos.com/wordpress/lumo-wp-plugin
 * Description:       Custom blocks and patterns used in lumo trade service websites.
 * Version:           1.0.1
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            LUMO trade service
 * Author URI:        https://lumopos.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lumo-wp-plugin
 *
 * @package LumoWpPlugin
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function lumo_wp_plugin_lumo_wp_plugin_block_init()
{
	wp_register_block_types_from_metadata_collection(
		__DIR__ . '/build/blocks',
		__DIR__ . '/build/blocks-manifest.php'
	);
}
add_action('init', 'lumo_wp_plugin_lumo_wp_plugin_block_init');

function lumo_wp_plugin_register_patterns()
{
	$dir = plugin_dir_path(__FILE__) . 'patterns/';

	if (! is_dir($dir)) return;

	$files = glob($dir . '*.php');

	foreach ($files as $file) {
		$data = get_file_data($file, array(
			'title'      => 'Title',
			'slug'       => 'Slug',
			'categories' => 'Categories',
			'keywords'   => 'Keywords',
		));

		if (! empty($data['slug']) && ! empty($data['title'])) {
			ob_start();
			include $file; 
			$content = ob_get_clean();

			register_block_pattern(
				$data['slug'],
				array(
					'title'      => $data['title'],
					'content'    => trim( $content ),
					'categories' => explode(',', $data['categories']),
					'keywords'   => explode(',', $data['keywords']),
					'source'	 => 'plugin'
				)
			);
		}
	}
}
add_action('init', 'lumo_wp_plugin_register_patterns');
