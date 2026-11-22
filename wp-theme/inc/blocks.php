<?php
/**
 * Native Gutenberg block registration.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'maison_register_blocks' );
/**
 * Register blocks from their block.json metadata.
 */
function maison_register_blocks() {
	$block_dir = MAISON_THEME_DIR . '/blocks/collection-card';

	if ( function_exists( 'register_block_type' ) && file_exists( $block_dir . '/block.json' ) ) {
		register_block_type( $block_dir );
	}
}
