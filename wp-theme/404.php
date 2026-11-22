<?php
/**
 * 404 template.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<div class="content-wrap content-wrap--narrow error-404">
	<p class="eyebrow">404</p>
	<h1><?php esc_html_e( 'This page has moved on.', 'maison' ); ?></h1>
	<p><?php esc_html_e( 'The page you are looking for could not be found.', 'maison' ); ?></p>
	<a class="button button--solid" href="<?php echo esc_url( home_url( '/' ) ); ?>">
		<?php esc_html_e( 'Back to home', 'maison' ); ?>
	</a>
</div>

<?php
get_footer();
