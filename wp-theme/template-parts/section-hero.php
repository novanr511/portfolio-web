<?php
/**
 * Hero section.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$maison_hero = maison_hero();
?>
<section class="hero" aria-labelledby="hero-title">
	<div class="hero__content">
		<p class="eyebrow" data-reveal data-reveal-delay="80ms"><?php echo esc_html( $maison_hero['eyebrow'] ); ?></p>
		<h1 id="hero-title" data-reveal data-reveal-delay="160ms"><?php echo esc_html( $maison_hero['title'] ); ?></h1>
		<p class="hero__text" data-reveal data-reveal-delay="240ms"><?php echo esc_html( $maison_hero['text'] ); ?></p>

		<div class="hero__actions" data-reveal data-reveal-delay="320ms">
			<a class="button button--solid" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>">
				<?php esc_html_e( 'Shop now', 'maison' ); ?>
				<?php echo maison_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a class="button button--outline" href="#collections">
				<?php esc_html_e( 'View collection', 'maison' ); ?>
				<?php echo maison_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
	</div>

	<div class="hero__media">
		<img
			src="<?php echo maison_image_url( 'hero_image', 'hero-editorial.webp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>"
			alt="<?php esc_attr_e( 'Model in a cream blazer and tailored trousers seated on classical stone steps', 'maison' ); ?>"
			width="1672"
			height="941"
			fetchpriority="high"
		>
	</div>
</section>
