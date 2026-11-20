<?php
/**
 * Shop archive template.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="shop-hero" aria-labelledby="shop-title">
	<div class="shop-hero__inner">
		<p class="eyebrow"><?php esc_html_e( 'The Collection', 'novan-base' ); ?></p>
		<h1 id="shop-title"><?php echo esc_html( woocommerce_page_title( false ) ); ?></h1>
		<p class="shop-hero__text">
			<?php esc_html_e( 'Considered pieces, tailored for everyday elegance. Discover the full COLLECTIVE edit.', 'novan-base' ); ?>
		</p>
	</div>
</section>

<div class="shop-layout">
	<aside class="shop-sidebar" aria-label="<?php esc_attr_e( 'Product filters', 'novan-base' ); ?>">
		<?php if ( is_active_sidebar( 'shop-sidebar' ) ) : ?>
			<?php dynamic_sidebar( 'shop-sidebar' ); ?>
		<?php else : ?>
			<div class="widget">
				<h2 class="widget__title"><?php esc_html_e( 'Shop by category', 'novan-base' ); ?></h2>
				<ul class="shop-categories">
					<?php
					wp_list_categories(
						array(
							'taxonomy'    => 'product_cat',
							'title_li'    => '',
							'show_count'  => true,
							'hide_empty'  => true,
						)
					);
					?>
				</ul>
			</div>
		<?php endif; ?>
	</aside>

	<div class="shop-results woocommerce">
		<?php do_action( 'woocommerce_before_main_content' ); ?>

		<?php if ( woocommerce_product_loop() ) : ?>
			<?php do_action( 'woocommerce_before_shop_loop' ); ?>
			<?php woocommerce_product_loop_start(); ?>
			<?php if ( wc_get_loop_prop( 'total' ) ) : ?>
				<?php
				while ( have_posts() ) :
					the_post();
					wc_get_template_part( 'content', 'product' );
				endwhile;
				?>
			<?php endif; ?>
			<?php woocommerce_product_loop_end(); ?>
			<?php do_action( 'woocommerce_after_shop_loop' ); ?>
		<?php else : ?>
			<?php do_action( 'woocommerce_no_products_found' ); ?>
		<?php endif; ?>

		<?php do_action( 'woocommerce_after_main_content' ); ?>
	</div>
</div>

<?php
get_footer();
