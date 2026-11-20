<?php
/**
 * Collections carousel section.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$novan_items = novan_collections();
?>
<section class="collections" id="collections" aria-labelledby="collections-title">
	<div class="section-heading">
		<div data-reveal>
			<p class="eyebrow"><?php esc_html_e( 'Curated for you', 'novan-base' ); ?></p>
			<h2 id="collections-title"><?php esc_html_e( 'Discover signature collections', 'novan-base' ); ?></h2>
		</div>

		<div class="carousel-controls" data-reveal data-reveal-delay="120ms">
			<button class="carousel-button" type="button" data-carousel="prev" aria-label="<?php esc_attr_e( 'Previous collections', 'novan-base' ); ?>">
				<?php echo novan_arrow_icon( 'left' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>
			<button class="carousel-button" type="button" data-carousel="next" aria-label="<?php esc_attr_e( 'Next collections', 'novan-base' ); ?>">
				<?php echo novan_arrow_icon( 'right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>
		</div>
	</div>

	<div
		class="collection-track"
		data-collection-track
		role="region"
		aria-label="<?php esc_attr_e( 'Collections carousel', 'novan-base' ); ?>"
		tabindex="0"
	>
		<?php foreach ( $novan_items as $novan_item ) : ?>
			<article class="collection-card" data-reveal>
				<a class="collection-card__link" href="<?php echo esc_url( home_url( '/shop/' ) ); ?>">
					<img
						class="collection-card__image"
						src="<?php echo esc_url( $novan_item['image'] ); ?>"
						alt="<?php echo esc_attr( $novan_item['title'] ); ?>"
						width="1024"
						height="1536"
						loading="lazy"
						decoding="async"
					>
					<h3 class="collection-card__title"><?php echo esc_html( $novan_item['title'] ); ?></h3>
					<p class="collection-card__meta"><?php echo esc_html( $novan_item['meta'] ); ?></p>
				</a>
			</article>
		<?php endforeach; ?>
	</div>
</section>
