<?php
/**
 * Render template for the ACF "Collection Showcase" block.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$novan_classes = 'collection-showcase';
if ( ! empty( $block['align'] ) ) {
	$novan_classes .= ' align' . sanitize_html_class( $block['align'] );
}
$novan_anchor = ! empty( $block['anchor'] )
	? ' id="' . esc_attr( sanitize_html_class( $block['anchor'] ) ) . '"'
	: '';

$novan_heading = function_exists( 'get_field' ) ? get_field( 'block_heading' ) : '';
$novan_heading = $novan_heading ? $novan_heading : __( 'Featured collections', 'novan-base' );
$novan_items   = function_exists( 'get_field' ) ? get_field( 'block_items' ) : array();
?>
<div class="<?php echo esc_attr( $novan_classes ); ?>"<?php echo $novan_anchor; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<h2 class="collection-showcase__heading"><?php echo esc_html( $novan_heading ); ?></h2>

	<?php if ( ! empty( $novan_items ) ) : ?>
		<div class="collection-showcase__grid">
			<?php foreach ( $novan_items as $novan_item ) : ?>
				<?php
				$novan_image = isset( $novan_item['image'] ) ? $novan_item['image'] : null;
				$novan_url   = '';
				if ( is_array( $novan_image ) && ! empty( $novan_image['url'] ) ) {
					$novan_url = $novan_image['url'];
				} elseif ( is_numeric( $novan_image ) ) {
					$novan_url = wp_get_attachment_url( (int) $novan_image );
				}
				if ( ! $novan_url ) {
					continue;
				}
				?>
				<article class="novan-collection-card">
					<img
						class="novan-collection-card__image"
						src="<?php echo esc_url( $novan_url ); ?>"
						alt="<?php echo esc_attr( isset( $novan_item['title'] ) ? $novan_item['title'] : '' ); ?>"
						loading="lazy"
					>
					<h3 class="novan-collection-card__title"><?php echo esc_html( isset( $novan_item['title'] ) ? $novan_item['title'] : '' ); ?></h3>
				</article>
			<?php endforeach; ?>
		</div>
	<?php elseif ( is_admin() ) : ?>
		<p class="collection-showcase__empty"><?php esc_html_e( 'Add cards in the block settings.', 'novan-base' ); ?></p>
	<?php endif; ?>
</div>
