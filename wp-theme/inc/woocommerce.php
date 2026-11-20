<?php
/**
 * WooCommerce integration.
 *
 * Guarded so the theme never fatals when WooCommerce is not active.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'widgets_init', 'novan_woocommerce_widgets' );
/**
 * Register the shop filter sidebar.
 */
function novan_woocommerce_widgets() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	register_sidebar(
		array(
			'name'          => __( 'Shop Sidebar', 'novan-base' ),
			'id'            => 'shop-sidebar',
			'description'   => __( 'Filters and widgets for the shop archive.', 'novan-base' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widget__title">',
			'after_title'   => '</h2>',
		)
	);
}

add_filter( 'woocommerce_output_related_products_args', 'novan_related_products_args' );
/**
 * Show three related products in a row.
 *
 * @param array $args Query args.
 * @return array
 */
function novan_related_products_args( $args ) {
	$args['posts_per_page'] = 3;
	$args['columns']        = 3;
	return $args;
}

add_filter( 'woocommerce_product_thumbnails_columns', 'novan_thumbnail_columns' );
/**
 * Number of thumbnails in the product gallery.
 *
 * @return int
 */
function novan_thumbnail_columns() {
	return 4;
}
