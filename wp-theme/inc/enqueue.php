<?php
/**
 * Styles and scripts.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_enqueue_scripts', 'maison_enqueue_assets' );
/**
 * Enqueue front-end assets with cache-busting file versions.
 */
function maison_enqueue_assets() {
	$css = MAISON_THEME_DIR . '/assets/css/main.css';
	$js  = MAISON_THEME_DIR . '/assets/js/main.js';

	wp_enqueue_style(
		'maison-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'maison-main',
		MAISON_THEME_URI . '/assets/css/main.css',
		array(),
		file_exists( $css ) ? (string) filemtime( $css ) : MAISON_THEME_VERSION
	);

	wp_enqueue_script(
		'maison-main',
		MAISON_THEME_URI . '/assets/js/main.js',
		array(),
		file_exists( $js ) ? (string) filemtime( $js ) : MAISON_THEME_VERSION,
		true
	);
}

add_action( 'enqueue_block_editor_assets', 'maison_enqueue_editor_assets' );
/**
 * Enqueue block editor styles and the custom block editor script.
 */
function maison_enqueue_editor_assets() {
	$css = MAISON_THEME_DIR . '/assets/css/main.css';
	wp_enqueue_style(
		'maison-editor',
		MAISON_THEME_URI . '/assets/css/main.css',
		array(),
		file_exists( $css ) ? (string) filemtime( $css ) : MAISON_THEME_VERSION
	);

	$editor_js = MAISON_THEME_DIR . '/blocks/collection-card/index.js';
	if ( file_exists( $editor_js ) ) {
		wp_enqueue_script(
			'maison-collection-card-editor',
			MAISON_THEME_URI . '/blocks/collection-card/index.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
			(string) filemtime( $editor_js ),
			true
		);
	}
}

add_filter( 'wp_resource_hints', 'maison_resource_hints', 10, 2 );
/**
 * Add preconnect hints for Google Fonts.
 *
 * @param array  $urls          Existing hints.
 * @param string $relation_type Relation type.
 * @return array
 */
function maison_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'crossorigin',
		);
	}
	return $urls;
}
