<?php
/**
 * Single product layout.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product;

if ( ! is_a( $product, 'WC_Product' ) && function_exists( 'wc_get_product' ) ) {
	$product = wc_get_product( get_the_ID() );
}

$maison_terms = get_the_terms( get_the_ID(), 'product_cat' );
$maison_cat  = ( $maison_terms && ! is_wp_error( $maison_terms ) ) ? $maison_terms[0]->name : __( 'The Edit', 'maison' );
?>

<div class="product-single">
	<div class="product-single__gallery" data-reveal="zoom">
		<?php
		if ( has_post_thumbnail() ) {
			the_post_thumbnail( 'woocommerce_single', array( 'fetchpriority' => 'high' ) );
		}

		$maison_gallery = $product ? $product->get_gallery_image_ids() : array();
		if ( ! empty( $maison_gallery ) ) :
			?>
			<div class="product-single__thumbs" aria-label="<?php esc_attr_e( 'Product images', 'maison' ); ?>">
				<?php foreach ( $maison_gallery as $maison_attachment_id ) : ?>
					<?php echo wp_get_attachment_image( $maison_attachment_id, 'thumbnail' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="product-single__info" data-reveal="fade">
		<p class="eyebrow"><?php echo esc_html( $maison_cat ); ?></p>
		<h1 class="product-single__title"><?php the_title(); ?></h1>

		<div class="product-single__price"><?php woocommerce_template_single_price(); ?></div>

		<div class="product-single__desc"><?php woocommerce_template_single_excerpt(); ?></div>

		<?php woocommerce_template_single_add_to_cart(); ?>

		<div class="product-single__meta"><?php woocommerce_template_single_meta(); ?></div>

		<p class="product-single__note">
			<?php esc_html_e( 'Complimentary shipping on orders over $150. Easy returns within 30 days.', 'maison' ); ?>
		</p>
	</div>
</div>

<div class="product-single__tabs"><?php woocommerce_output_product_data_tabs(); ?></div>

<section class="related-products" aria-labelledby="related-title">
	<div class="section-heading">
		<h2 id="related-title"><?php esc_html_e( 'You may also like', 'maison' ); ?></h2>
	</div>
	<?php woocommerce_output_related_products(); ?>
</section>
