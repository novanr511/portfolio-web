<?php
/**
 * Small public REST endpoints used by the theme demo.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'rest_api_init', 'novan_register_rest_routes' );
/**
 * Register custom REST routes.
 */
function novan_register_rest_routes() {
	register_rest_route(
		'novan/v1',
		'/collections',
		array(
			'methods'             => 'GET',
			'callback'            => 'novan_rest_collections',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		'novan/v1',
		'/site',
		array(
			'methods'             => 'GET',
			'callback'            => 'novan_rest_site',
			'permission_callback' => '__return_true',
		)
	);
}

/**
 * Return collection cards as JSON.
 *
 * @return WP_REST_Response
 */
function novan_rest_collections() {
	$items = novan_collections();
	$data  = array();

	foreach ( $items as $item ) {
		$data[] = array(
			'title'   => $item['title'],
			'caption' => $item['meta'],
			'image'   => $item['image'],
		);
	}

	return rest_ensure_response( $data );
}

/**
 * Return basic site information as JSON.
 *
 * @return WP_REST_Response
 */
function novan_rest_site() {
	return rest_ensure_response(
		array(
			'name'        => get_bloginfo( 'name' ),
			'description' => get_bloginfo( 'description' ),
			'brand'       => novan_brand_name(),
			'home'        => esc_url_raw( home_url( '/' ) ),
		)
	);
}
