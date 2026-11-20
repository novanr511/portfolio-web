<?php
/**
 * Styles and scripts.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_enqueue_scripts', 'novan_enqueue_assets' );
/**
 * Enqueue front-end assets with cache-busting file versions.
 */
function novan_enqueue_assets() {
	$css = NOVAN_THEME_DIR . '/assets/css/main.css';
	$js  = NOVAN_THEME_DIR . '/assets/js/main.js';

	wp_enqueue_style(
		'novan-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'novan-main',
		NOVAN_THEME_URI . '/assets/css/main.css',
		array(),
		file_exists( $css ) ? (string) filemtime( $css ) : NOVAN_THEME_VERSION
	);

	wp_enqueue_script(
		'novan-main',
		NOVAN_THEME_URI . '/assets/js/main.js',
		array(),
		file_exists( $js ) ? (string) filemtime( $js ) : NOVAN_THEME_VERSION,
		true
	);
}

add_action( 'enqueue_block_editor_assets', 'novan_enqueue_editor_assets' );
/**
 * Enqueue block editor styles and the custom block editor script.
 */
function novan_enqueue_editor_assets() {
	$css = NOVAN_THEME_DIR . '/assets/css/main.css';
	wp_enqueue_style(
		'novan-editor',
		NOVAN_THEME_URI . '/assets/css/main.css',
		array(),
		file_exists( $css ) ? (string) filemtime( $css ) : NOVAN_THEME_VERSION
	);

	$editor_js = NOVAN_THEME_DIR . '/blocks/collection-card/index.js';
	if ( file_exists( $editor_js ) ) {
		wp_enqueue_script(
			'novan-collection-card-editor',
			NOVAN_THEME_URI . '/blocks/collection-card/index.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
			(string) filemtime( $editor_js ),
			true
		);
	}
}

add_filter( 'wp_resource_hints', 'novan_resource_hints', 10, 2 );
/**
 * Add preconnect hints for Google Fonts.
 *
 * @param array  $urls          Existing hints.
 * @param string $relation_type Relation type.
 * @return array
 */
function novan_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'crossorigin',
		);
	}
	return $urls;
}
