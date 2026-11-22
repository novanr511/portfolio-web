<?php
/**
 * Maison theme bootstrap.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAISON_THEME_VERSION', '1.0.0' );
define( 'MAISON_THEME_DIR', get_template_directory() );
define( 'MAISON_THEME_URI', get_template_directory_uri() );

$maison_includes = array(
	'inc/setup.php',
	'inc/enqueue.php',
	'inc/template-tags.php',
	'inc/acf.php',
	'inc/blocks.php',
	'inc/rest.php',
	'inc/woocommerce.php',
);

foreach ( $maison_includes as $maison_include ) {
	$maison_path = MAISON_THEME_DIR . '/' . $maison_include;
	if ( file_exists( $maison_path ) ) {
		require_once $maison_path;
	}
}
