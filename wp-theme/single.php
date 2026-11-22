<?php
/**
 * Single article template.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();

	$maison_categories = get_the_category();
	$maison_category   = ! empty( $maison_categories ) ? $maison_categories[0]->name : __( 'Journal', 'maison' );
	?>
	<article <?php post_class( 'article' ); ?>>
		<header class="article__header" data-reveal>
			<p class="eyebrow"><?php echo esc_html( $maison_category ); ?></p>
			<h1><?php the_title(); ?></h1>
			<div class="article__meta">
				<span><?php echo esc_html( get_the_date() ); ?></span>
				<span aria-hidden="true">&middot;</span>
				<span><?php echo esc_html( maison_reading_time() ); ?></span>
			</div>
		</header>

		<?php if ( has_post_thumbnail() ) : ?>
			<div class="article__hero" data-reveal="zoom">
				<?php the_post_thumbnail( 'maison-article', array( 'fetchpriority' => 'high' ) ); ?>
			</div>
		<?php endif; ?>

		<div class="article__body" data-reveal="fade">
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

		<footer class="article__footer">
			<?php the_tags( '<p class="entry__tags">' . esc_html__( 'Tagged:', 'maison' ) . ' ', ', ', '</p>' ); ?>
		</footer>
	</article>

	<nav class="post-navigation content-wrap" aria-label="<?php esc_attr_e( 'Post navigation', 'maison' ); ?>">
		<?php previous_post_link( '<div class="post-navigation__prev">&larr; %link</div>' ); ?>
		<?php next_post_link( '<div class="post-navigation__next">%link &rarr;</div>' ); ?>
	</nav>

	<?php
	$maison_related = new WP_Query(
		array(
			'posts_per_page'      => 3,
			'post__not_in'        => array( get_the_ID() ),
			'ignore_sticky_posts' => true,
		)
	);

	if ( $maison_related->have_posts() ) :
		?>
		<section class="related-posts content-wrap" aria-labelledby="related-posts-title">
			<div class="section-heading">
				<h2 id="related-posts-title"><?php esc_html_e( 'Continue reading', 'maison' ); ?></h2>
			</div>
			<div class="post-grid">
				<?php
				while ( $maison_related->have_posts() ) :
					$maison_related->the_post();
					get_template_part( 'template-parts/content' );
				endwhile;
				?>
			</div>
		</section>
		<?php
		wp_reset_postdata();
	endif;

	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}
endwhile;

get_footer();
