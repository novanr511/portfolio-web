<?php
/**
 * Product card for loops.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;

}
?>
<li <?php post_class( 'product-card' ); ?> data-reveal>
	<a class="product-card__link" href="<?php the_permalink(); ?>">
		<span class="product-card__image">
			<?php
			if ( has_post_thumbnail() ) {
				the_post_thumbnail( 'maison-product', array( 'loading' => 'lazy' ) );
			} elseif ( function_exists( 'wc_placeholder_img' ) ) {
				echo wc_placeholder_img( 'maison-product' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			?>
		</span>

		<h2 class="product-card__title woocommerce-loop-product__title"><?php the_title(); ?></h2>
		<span class="product-card__price"><?php woocommerce_template_loop_price(); ?></span>
	</a>

	<?php woocommerce_template_loop_add_to_cart(); ?>
</li>
