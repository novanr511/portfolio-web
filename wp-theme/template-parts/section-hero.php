<?php
/**
 * Hero section.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$novan_hero = novan_hero();
?>
<section class="hero" aria-labelledby="hero-title">
	<div class="hero__content">
		<p class="eyebrow"><?php echo esc_html( $novan_hero['eyebrow'] ); ?></p>
		<h1 id="hero-title"><?php echo esc_html( $novan_hero['title'] ); ?></h1>
		<p class="hero__text"><?php echo esc_html( $novan_hero['text'] ); ?></p>

		<div class="hero__actions">
			<a class="button button--solid" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>">
				<?php esc_html_e( 'Shop now', 'novan-base' ); ?>
				<?php echo novan_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a class="button button--outline" href="#collections">
				<?php esc_html_e( 'View collection', 'novan-base' ); ?>
				<?php echo novan_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
	</div>

	<div class="hero__media">
		<img
			src="<?php echo novan_image_url( 'hero_image', 'hero-editorial.webp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>"
			alt="<?php esc_attr_e( 'Model in a cream blazer and tailored trousers seated on classical stone steps', 'novan-base' ); ?>"
			width="1672"
			height="941"
			fetchpriority="high"
		>
	</div>
</section>
