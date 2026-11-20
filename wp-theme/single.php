<?php
/**
 * Single post template.
 *
 * @package Novan_Base
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
				<p class="eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
				<h1><?php the_title(); ?></h1>
			</header>

			<?php if ( has_post_thumbnail() ) : ?>
				<div class="entry__thumbnail"><?php the_post_thumbnail( 'large' ); ?></div>
			<?php endif; ?>

			<div class="entry__content">
				<?php
				the_content();
				wp_link_pages(
					array(
						'before' => '<nav class="page-links" aria-label="' . esc_attr__( 'Pages', 'novan-base' ) . '">',
						'after'  => '</nav>',
					)
				);
				?>
			</div>

			<footer class="entry__footer">
				<?php the_tags( '<p class="entry__tags">' . esc_html__( 'Tagged:', 'novan-base' ) . ' ', ', ', '</p>' ); ?>
			</footer>
		</article>

		<nav class="post-navigation" aria-label="<?php esc_attr_e( 'Post navigation', 'novan-base' ); ?>">
			<?php previous_post_link( '<div class="post-navigation__prev">&larr; %link</div>' ); ?>
			<?php next_post_link( '<div class="post-navigation__next">%link &rarr;</div>' ); ?>
		</nav>

		<?php
		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}
		?>
	<?php endwhile; ?>
</div>

<?php
get_footer();
