<?php
/**
 * Comments template.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="comments" aria-labelledby="comments-title">
	<h2 id="comments-title"><?php comments_number( esc_html__( 'Leave a comment', 'novan-base' ), esc_html__( '1 comment', 'novan-base' ), esc_html__( '% comments', 'novan-base' ) ); ?></h2>

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
