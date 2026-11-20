<?php
/**
 * Site header.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<script>document.documentElement.classList.add('js');</script>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>

	<div class="scroll-progress" aria-hidden="true"><span data-scroll-progress></span></div>

	<a class="skip-link" href="#main"><?php esc_html_e( 'Skip to content', 'novan-base' ); ?></a>

	<div class="announcement">
		<p><?php echo esc_html( novan_announcement() ); ?></p>
	</div>

	<header class="site-header" id="site-header">
		<div class="site-header__inner">
			<button
				class="menu-toggle"
				type="button"
				aria-expanded="false"
				aria-controls="primary-menu"
				aria-label="<?php esc_attr_e( 'Open menu', 'novan-base' ); ?>"
			>
				<span class="menu-toggle__bars" aria-hidden="true">
					<span></span><span></span>
				</span>
			</button>

			<a class="site-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php echo esc_html( novan_brand_name() ); ?>
			</a>

			<div class="site-header__actions">
				<button
					class="icon-button search-toggle"
					type="button"
					aria-expanded="false"
					aria-controls="header-search"
					aria-label="<?php esc_attr_e( 'Open search', 'novan-base' ); ?>"
				>
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
				</button>

				<a class="icon-button account-link" href="<?php echo esc_url( wp_login_url() ); ?>" aria-label="<?php esc_attr_e( 'Account', 'novan-base' ); ?>">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>
				</a>

				<a class="icon-button bag-link" href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" aria-label="<?php esc_attr_e( 'Shopping bag', 'novan-base' ); ?>">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
					<span class="bag-count" aria-hidden="true">0</span>
				</a>
			</div>
		</div>

		<div class="header-search" id="header-search" hidden>
			<?php get_search_form(); ?>
		</div>

		<nav class="primary-menu" id="primary-menu" aria-label="<?php esc_attr_e( 'Primary menu', 'novan-base' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'primary-menu__list',
					'fallback_cb'    => 'novan_default_menu',
				)
			);
			?>
		</nav>
	</header>

	<main class="site-main" id="main">
