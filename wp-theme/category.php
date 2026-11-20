<?php
/**
 * Category archive template.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$novan_term = get_queried_object();
?>

<section class="archive-hero" aria-labelledby="archive-title">
	<p class="eyebrow"><?php esc_html_e( 'The Journal', 'novan-base' ); ?></p>
	<h1 id="archive-title"><?php single_cat_title(); ?></h1>
	<?php if ( $novan_term && ! empty( $novan_term->description ) ) : ?>
		<p class="archive-hero__description"><?php echo wp_kses_post( $novan_term->description ); ?></p>
	<?php endif; ?>
</section>

<div class="content-wrap">
	<?php if ( have_posts() ) : ?>
		<div class="post-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/content' );
			endwhile;
			?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'No articles found in this category.', 'novan-base' ); ?></p>
	<?php endif; ?>
</div>

<?php
get_footer();
