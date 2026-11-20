<?php
/**
 * Demo content seeder used only by blueprint.json.
 *
 * Creates sample products, product categories and journal articles so the
 * shop, product, category and article templates have something to render.
 * Safe to run more than once (skips existing titles).
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$novan_asset_base = 'https://raw.githubusercontent.com/novanr511/portfolio-web/main/wp-theme/assets/images/';

/**
 * Download a bundled WebP into the media library and attach it to a post.
 *
 * @param string $file    Image filename.
 * @param int    $post_id Parent post ID.
 * @return int Attachment ID or 0.
 */
$novan_upload_image = function ( $file, $post_id ) use ( $novan_asset_base ) {
	$url = $novan_asset_base . $file;
	$tmp = download_url( $url );

	if ( is_wp_error( $tmp ) ) {
		return 0;
	}

	$attachment_id = media_handle_sideload(
		array(
			'name'     => basename( $url ),
			'tmp_name' => $tmp,
		),
		$post_id
	);

	return is_wp_error( $attachment_id ) ? 0 : (int) $attachment_id;
};

/* --------------------------------------------------------- Product cats */

if ( taxonomy_exists( 'product_cat' ) ) {
	foreach ( array( 'New Arrivals', 'Tailoring', 'Denim', 'Accessories' ) as $novan_cat_name ) {
		if ( ! term_exists( $novan_cat_name, 'product_cat' ) ) {
			wp_insert_term( $novan_cat_name, 'product_cat' );
		}
	}
}

/* -------------------------------------------------------------- Products */

if ( class_exists( 'WooCommerce' ) ) {
	$novan_products = array(
		array( 'Camel Longline Blazer', '189.00', 'collection-dresses.webp', 'Tailoring' ),
		array( 'Oversized Denim Jacket', '139.00', 'collection-tops.webp', 'Denim' ),
		array( 'Wide Leg Denim Jeans', '129.00', 'collection-jeans.webp', 'Denim' ),
		array( 'Sage Utility Co-ord', '215.00', 'collection-cord.webp', 'New Arrivals' ),
		array( 'Pleated Midi Skirt', '99.00', 'collection-skirts.webp', 'Tailoring' ),
		array( 'The Editorial Tote', '89.00', 'hero-editorial.webp', 'Accessories' ),
	);

	foreach ( $novan_products as $novan_product ) {
		if ( get_page_by_title( $novan_product[0], OBJECT, 'product' ) ) {
			continue;
		}

		$novan_product_id = wp_insert_post(
			array(
				'post_title'   => $novan_product[0],
				'post_type'    => 'product',
				'post_status'  => 'publish',
				'post_content' => 'A considered piece from the COLLECTIVE edit. Tailored for effortless everyday elegance, with a focus on considered details and a relaxed, modern silhouette.',
				'post_excerpt' => 'A considered piece from the COLLECTIVE edit, designed for effortless everyday elegance.',
			)
		);

		if ( is_wp_error( $novan_product_id ) || ! $novan_product_id ) {
			continue;
		}

		wp_set_object_terms( $novan_product_id, 'simple', 'product_type' );
		update_post_meta( $novan_product_id, '_regular_price', $novan_product[1] );
		update_post_meta( $novan_product_id, '_price', $novan_product[1] );
		update_post_meta( $novan_product_id, '_stock_status', 'instock' );
		update_post_meta( $novan_product_id, '_visibility', 'visible' );
		wp_set_object_terms( $novan_product_id, array( $novan_product[3] ), 'product_cat' );

		$novan_image_id = $novan_upload_image( $novan_product[2], $novan_product_id );
		if ( $novan_image_id ) {
			set_post_thumbnail( $novan_product_id, $novan_image_id );
		}
	}
}

/* --------------------------------------------------------------- Articles */

$novan_articles = array(
	array(
		'The Art of Considered Dressing',
		'Style',
		'collection-dresses.webp',
		'Good style is less about accumulation and more about intention. A considered wardrobe begins with pieces that work harder, feel better, and stay relevant season after season.',
	),
	array(
		'A Wardrobe Built to Last',
		'Journal',
		'collection-cord.webp',
		'The pieces we return to are rarely the loudest. They are the ones whose cut, cloth and quiet confidence make getting dressed feel effortless.',
	),
	array(
		'Notes on Everyday Elegance',
		'Style',
		'hero-editorial.webp',
		'Elegance is not reserved for occasions. It lives in the small choices: a clean line, a considered texture, a silhouette that lets you move through the day with ease.',
	),
);

foreach ( $novan_articles as $novan_article ) {
	if ( get_page_by_title( $novan_article[0], OBJECT, 'post' ) ) {
		continue;
	}

	$novan_term = term_exists( $novan_article[1], 'category' );
	if ( ! $novan_term ) {
		$novan_term = wp_insert_term( $novan_article[1], 'category' );
	}
	$novan_term_id = ( is_array( $novan_term ) && isset( $novan_term['term_id'] ) ) ? (int) $novan_term['term_id'] : 0;

	$novan_article_id = wp_insert_post(
		array(
			'post_title'    => $novan_article[0],
			'post_type'     => 'post',
			'post_status'   => 'publish',
			'post_category' => $novan_term_id ? array( $novan_term_id ) : array(),
			'post_content'  => '<p>' . esc_html( $novan_article[3] ) . '</p>'
				. '<h2>A quieter kind of confidence</h2>'
				. '<p>Start with the foundations: a well-cut blazer, a fluid trouser, a shirt that sits just right. From there, add texture and personality rather than noise. The result is a wardrobe that feels like you — only more certain.</p>'
				. '<h2>Made to be worn</h2>'
				. '<p>We believe the best pieces are the ones you reach for again and again. That is why every piece in the COLLECTIVE edit is chosen for the way it lives in your day, not just the way it looks on a hanger.</p>',
			'post_excerpt'  => esc_html( $novan_article[3] ),
		)
	);

	if ( is_wp_error( $novan_article_id ) || ! $novan_article_id ) {
		continue;
	}

	$novan_image_id = $novan_upload_image( $novan_article[2], $novan_article_id );
	if ( $novan_image_id ) {
		set_post_thumbnail( $novan_article_id, $novan_image_id );
	}
}
