<?php
/**
 * Default post card.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<article <?php post_class( 'post-card' ); ?> data-reveal>
	<?php if ( has_post_thumbnail() ) : ?>
		<a class="post-card__thumb" href="<?php the_permalink(); ?>">
			<?php the_post_thumbnail( 'medium_large', array( 'loading' => 'lazy' ) ); ?>
		</a>
	<?php endif; ?>

	<p class="eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
	<h2 class="post-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
	<div class="post-card__excerpt"><?php the_excerpt(); ?></div>
</article>
