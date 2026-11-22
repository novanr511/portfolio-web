<?php
/**
 * Category archive template.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maison_term = get_queried_object();
?>

<section class="archive-hero" aria-labelledby="archive-title" data-reveal>
	<p class="eyebrow"><?php esc_html_e( 'The Journal', 'maison' ); ?></p>
	<h1 id="archive-title"><?php single_cat_title(); ?></h1>
	<?php if ( $maison_term && ! empty( $maison_term->description ) ) : ?>
		<p class="archive-hero__description"><?php echo wp_kses_post( $maison_term->description ); ?></p>
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
		<p><?php esc_html_e( 'No articles found in this category.', 'maison' ); ?></p>
	<?php endif; ?>
</div>

<?php
get_footer();
