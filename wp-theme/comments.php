<?php
/**
 * Comments template.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="comments" aria-labelledby="comments-title">
	<h2 id="comments-title"><?php comments_number( esc_html__( 'Leave a comment', 'maison' ), esc_html__( '1 comment', 'maison' ), esc_html__( '% comments', 'maison' ) ); ?></h2>

	<?php
	wp_list_comments(
		array(
			'style'      => 'ol',
			'avatar_size' => 48,
			'short_ping' => true,
		)
	);

	the_comments_pagination();

	comment_form();
	?>
</section>
