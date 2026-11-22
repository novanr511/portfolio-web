<?php
/**
 * Render template for the ACF "Collection Showcase" block.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$maison_classes = 'collection-showcase';
if ( ! empty( $block['align'] ) ) {
	$maison_classes .= ' align' . sanitize_html_class( $block['align'] );
}
$maison_anchor = ! empty( $block['anchor'] )
	? ' id="' . esc_attr( sanitize_html_class( $block['anchor'] ) ) . '"'
	: '';

$maison_heading = function_exists( 'get_field' ) ? get_field( 'block_heading' ) : '';
$maison_heading = $maison_heading ? $maison_heading : __( 'Featured collections', 'maison' );
$maison_items   = function_exists( 'get_field' ) ? get_field( 'block_items' ) : array();
?>
<div class="<?php echo esc_attr( $maison_classes ); ?>"<?php echo $maison_anchor; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<h2 class="collection-showcase__heading"><?php echo esc_html( $maison_heading ); ?></h2>

	<?php if ( ! empty( $maison_items ) ) : ?>
		<div class="collection-showcase__grid">
			<?php foreach ( $maison_items as $maison_item ) : ?>
				<?php
				$maison_image = isset( $maison_item['image'] ) ? $maison_item['image'] : null;
				$maison_url   = '';
				if ( is_array( $maison_image ) && ! empty( $maison_image['url'] ) ) {
					$maison_url = $maison_image['url'];
				} elseif ( is_numeric( $maison_image ) ) {
					$maison_url = wp_get_attachment_url( (int) $maison_image );
				}
				if ( ! $maison_url ) {
					continue;
				}
				?>
				<article class="maison-collection-card">
					<img
						class="maison-collection-card__image"
						src="<?php echo esc_url( $maison_url ); ?>"
						alt="<?php echo esc_attr( isset( $maison_item['title'] ) ? $maison_item['title'] : '' ); ?>"
						loading="lazy"
					>
					<h3 class="maison-collection-card__title"><?php echo esc_html( isset( $maison_item['title'] ) ? $maison_item['title'] : '' ); ?></h3>
				</article>
			<?php endforeach; ?>
		</div>
	<?php elseif ( is_admin() ) : ?>
		<p class="collection-showcase__empty"><?php esc_html_e( 'Add cards in the block settings.', 'maison' ); ?></p>
	<?php endif; ?>
</div>
