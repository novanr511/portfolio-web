<?php
/**
 * Front page template.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

get_template_part( 'template-parts/section-hero' );
get_template_part( 'template-parts/section-collections' );
get_template_part( 'template-parts/section-editorial' );

get_footer();
