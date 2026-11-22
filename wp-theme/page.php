<?php
/**
 * Page template.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<div class="content-wrap content-wrap--narrow">
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class( 'entry' ); ?>>
			<header class="entry__header">
				<h1><?php the_title(); ?></h1>
			</header>
			<div class="entry__content">
				<?php
				the_content();
				wp_link_pages(
					array(
						'before' => '<nav class="page-links" aria-label="' . esc_attr__( 'Pages', 'maison' ) . '">',
						'after'  => '</nav>',
					)
				);
				?>
			</div>
		</article>

		<?php
		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}
		?>
	<?php endwhile; ?>
</div>

<?php
get_footer();
