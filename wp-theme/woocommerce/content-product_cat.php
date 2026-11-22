<?php
/**
 * Product category card.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $wp_query, $post;

$term = isset( $wp_query->queried_object ) ? $wp_query->queried_object : null;
if ( ! $term && isset( $post ) ) {
	$term = $post;
}
?>
<li <?php post_class( 'category-card' ); ?>>
	<a class="category-card__link" href="<?php echo esc_url( get_term_link( $term ) ); ?>">
		<?php
		$thumbnail_id = get_term_meta( $term->term_id, 'thumbnail_id', true );
		if ( $thumbnail_id ) {
			echo wp_get_attachment_image( $thumbnail_id, 'maison-collection', false, array( 'loading' => 'lazy' ) );
		}
		?>
		<h2 class="category-card__title"><?php echo esc_html( $term->name ); ?></h2>
	</a>
</li>
