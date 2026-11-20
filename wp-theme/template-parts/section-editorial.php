<?php
/**
 * Dark editorial story section.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$novan_editorial = novan_editorial();
?>
<section class="editorial" aria-labelledby="editorial-title">
	<div class="editorial__media">
		<img
			src="<?php echo novan_image_url( 'editorial_image', 'editorial-story.webp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>"
			alt="<?php esc_attr_e( 'Editorial portrait of three women in sage and rust outfits', 'novan-base' ); ?>"
			width="1536"
			height="1024"
			loading="lazy"
			decoding="async"
		>
	</div>

	<div class="editorial__content">
		<p class="eyebrow"><?php echo esc_html( $novan_editorial['eyebrow'] ); ?></p>
		<h2 id="editorial-title"><?php echo esc_html( $novan_editorial['title'] ); ?></h2>
		<p><?php echo esc_html( $novan_editorial['text'] ); ?></p>
		<a class="button button--light" href="<?php echo esc_url( home_url( '/journal/' ) ); ?>">
			<?php esc_html_e( 'Read the story', 'novan-base' ); ?>
			<?php echo novan_arrow_icon( 'up-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	</div>
</section>
