<?php
/**
 * Theme supports, menus and image sizes.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'after_setup_theme', 'novan_theme_setup' );
/**
 * Register theme features and navigation menus.
 */
function novan_theme_setup() {
	load_theme_textdomain( 'novan-base', NOVAN_THEME_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'wp-block-styles' );

	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
			'navigation-widgets',
		)
	);

	add_theme_support(
		'custom-logo',
		array(
			'height'      => 64,
			'width'       => 240,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

	add_theme_support(
		'custom-background',
		array(
			'default-color' => 'f7f4ef',
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'novan-base' ),
			'footer'  => __( 'Footer Menu', 'novan-base' ),
		)
	);

	add_image_size( 'novan-collection', 680, 1020, true );
	add_image_size( 'novan-hero', 1672, 941, true );
}

add_filter( 'nav_menu_css_class', 'novan_menu_classes', 10, 2 );
/**
 * Add a consistent class to nav items.
 *
 * @param array    $classes CSS classes.
 * @param WP_Post  $item    Menu item object.
 * @return array
 */
function novan_menu_classes( $classes, $item ) {
	$classes[] = 'primary-menu__item';
	return $classes;
}
