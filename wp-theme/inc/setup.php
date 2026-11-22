<?php
/**
 * Theme supports, menus and image sizes.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'after_setup_theme', 'maison_theme_setup' );
/**
 * Register theme features and navigation menus.
 */
function maison_theme_setup() {
	load_theme_textdomain( 'maison', MAISON_THEME_DIR . '/languages' );

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
			'primary' => __( 'Primary Menu', 'maison' ),
			'footer'  => __( 'Footer Menu', 'maison' ),
		)
	);

	add_image_size( 'maison-collection', 680, 1020, true );
	add_image_size( 'maison-hero', 1672, 941, true );
	add_image_size( 'maison-product', 900, 1350, true );
	add_image_size( 'maison-article', 1400, 800, true );

	add_theme_support(
		'woocommerce',
		array(
			'thumbnail_image_width' => 600,
			'single_image_width'    => 1200,
			'product_grid'          => array(
				'default_rows'    => 3,
				'min_rows'        => 2,
				'max_rows'        => 8,
				'default_columns' => 4,
				'min_columns'     => 2,
				'max_columns'     => 5,
			),
		)
	);

	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}

add_filter( 'nav_menu_css_class', 'maison_menu_classes', 10, 2 );
/**
 * Add a consistent class to nav items.
 *
 * @param array    $classes CSS classes.
 * @param WP_Post  $item    Menu item object.
 * @return array
 */
function maison_menu_classes( $classes, $item ) {
	$classes[] = 'primary-menu__item';
	return $classes;
}
