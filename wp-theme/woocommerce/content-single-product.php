<?php
/**
 * Single product layout.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product;

if ( ! is_a( $product, 'WC_Product' ) && function_exists( 'wc_get_product' ) ) {
	$product = wc_get_product( get_the_ID() );
}

$novan_terms = get_the_terms( get_the_ID(), 'product_cat' );
$novan_cat  = ( $novan_terms && ! is_wp_error( $novan_terms ) ) ? $novan_terms[0]->name : __( 'The Edit', 'novan-base' );
?>

<div class="product-single">
	<div class="product-single__gallery">
		<?php
		if ( has_post_thumbnail() ) {
			the_post_thumbnail( 'woocommerce_single', array( 'fetchpriority' => 'high' ) );
		}

		$novan_gallery = $product ? $product->get_gallery_image_ids() : array();
		if ( ! empty( $novan_gallery ) ) :
			?>
			<div class="product-single__thumbs" aria-label="<?php esc_attr_e( 'Product images', 'novan-base' ); ?>">
				<?php foreach ( $novan_gallery as $novan_attachment_id ) : ?>
					<?php echo wp_get_attachment_image( $novan_attachment_id, 'thumbnail' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="product-single__info">
		<p class="eyebrow"><?php echo esc_html( $novan_cat ); ?></p>
		<h1 class="product-single__title"><?php the_title(); ?></h1>

		<div class="product-single__price"><?php woocommerce_template_single_price(); ?></div>

		<div class="product-single__desc"><?php woocommerce_template_single_excerpt(); ?></div>

		<?php woocommerce_template_single_add_to_cart(); ?>

		<div class="product-single__meta"><?php woocommerce_template_single_meta(); ?></div>

		<p class="product-single__note">
			<?php esc_html_e( 'Complimentary shipping on orders over $150. Easy returns within 30 days.', 'novan-base' ); ?>
		</p>
	</div>
</div>

<div class="product-single__tabs"><?php woocommerce_output_product_data_tabs(); ?></div>

<section class="related-products" aria-labelledby="related-title">
	<div class="section-heading">
		<h2 id="related-title"><?php esc_html_e( 'You may also like', 'novan-base' ); ?></h2>
	</div>
	<?php woocommerce_output_related_products(); ?>
</section>
