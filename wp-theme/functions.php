<?php
/**
 * Novan Base theme bootstrap.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'NOVAN_THEME_VERSION', '1.0.0' );
define( 'NOVAN_THEME_DIR', get_template_directory() );
define( 'NOVAN_THEME_URI', get_template_directory_uri() );

$novan_includes = array(
	'inc/setup.php',
	'inc/enqueue.php',
	'inc/template-tags.php',
	'inc/acf.php',
	'inc/blocks.php',
	'inc/rest.php',
	'inc/woocommerce.php',
);

foreach ( $novan_includes as $novan_include ) {
	$novan_path = NOVAN_THEME_DIR . '/' . $novan_include;
	if ( file_exists( $novan_path ) ) {
		require_once $novan_path;
	}
}
