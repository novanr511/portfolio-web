<?php
/**
 * Search results template.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<div class="content-wrap">
	<header class="page-header">
		<h1>
			<?php
			printf(
				/* translators: %s: search query. */
				esc_html__( 'Results for: %s', 'maison' ),
				'<span>' . esc_html( get_search_query() ) . '</span>'
			);
			?>
		</h1>
	</header>

	<?php if ( have_posts() ) : ?>
		<div class="post-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/content', get_post_type() );
			endwhile;
			?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'Nothing matched your search. Try another term.', 'maison' ); ?></p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</div>

<?php
get_footer();
