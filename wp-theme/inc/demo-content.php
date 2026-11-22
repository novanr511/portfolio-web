<?php
/**
 * Demo content seeder used only by blueprint.json.
 *
 * Creates sample products, product categories and journal articles so the
 * shop, product, category and article templates have something to render.
 * Safe to run more than once (skips existing titles).
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

foreach ( array( 'image.php', 'file.php', 'media.php' ) as $maison_admin_file ) {
	$maison_admin_path = ABSPATH . 'wp-admin/includes/' . $maison_admin_file;
	if ( file_exists( $maison_admin_path ) ) {
		require_once $maison_admin_path;
	}
}

$maison_asset_base = 'https://raw.githubusercontent.com/novanr511/portfolio-web/main/wp-theme/assets/images/';

/**
 * Download a bundled WebP into the media library and attach it to a post.
 *
 * @param string $file    Image filename.
 * @param int    $post_id Parent post ID.
 * @return int Attachment ID or 0.
 */
$maison_upload_image = function ( $file, $post_id ) use ( $maison_asset_base ) {
	$url = $maison_asset_base . $file;
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
	foreach ( array( 'New Arrivals', 'Tailoring', 'Denim', 'Accessories' ) as $maison_cat_name ) {
		if ( ! term_exists( $maison_cat_name, 'product_cat' ) ) {
			wp_insert_term( $maison_cat_name, 'product_cat' );
		}
	}
}

/* -------------------------------------------------------------- Products */

if ( class_exists( 'WooCommerce' ) ) {
	$maison_products = array(
		array( 'Camel Longline Blazer', '189.00', 'collection-dresses.webp', 'Tailoring' ),
		array( 'Oversized Denim Jacket', '139.00', 'collection-tops.webp', 'Denim' ),
		array( 'Wide Leg Denim Jeans', '129.00', 'collection-jeans.webp', 'Denim' ),
		array( 'Sage Utility Co-ord', '215.00', 'collection-cord.webp', 'New Arrivals' ),
		array( 'Pleated Midi Skirt', '99.00', 'collection-skirts.webp', 'Tailoring' ),
		array( 'The Editorial Tote', '89.00', 'hero-editorial.webp', 'Accessories' ),
	);

	foreach ( $maison_products as $maison_product ) {
		if ( get_page_by_title( $maison_product[0], OBJECT, 'product' ) ) {
			continue;
		}

		$maison_product_id = wp_insert_post(
			array(
				'post_title'   => $maison_product[0],
				'post_type'    => 'product',
				'post_status'  => 'publish',
				'post_content' => 'A considered piece from the COLLECTIVE edit. Tailored for effortless everyday elegance, with a focus on considered details and a relaxed, modern silhouette.',
				'post_excerpt' => 'A considered piece from the COLLECTIVE edit, designed for effortless everyday elegance.',
			)
		);

		if ( is_wp_error( $maison_product_id ) || ! $maison_product_id ) {
			continue;
		}

		wp_set_object_terms( $maison_product_id, 'simple', 'product_type' );
		update_post_meta( $maison_product_id, '_regular_price', $maison_product[1] );
		update_post_meta( $maison_product_id, '_price', $maison_product[1] );
		update_post_meta( $maison_product_id, '_stock_status', 'instock' );
		update_post_meta( $maison_product_id, '_visibility', 'visible' );
		wp_set_object_terms( $maison_product_id, array( $maison_product[3] ), 'product_cat' );

		$maison_image_id = $maison_upload_image( $maison_product[2], $maison_product_id );
		if ( $maison_image_id ) {
			set_post_thumbnail( $maison_product_id, $maison_image_id );
		}
	}
}

/* --------------------------------------------------------------- Articles */

$maison_articles = array(
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

foreach ( $maison_articles as $maison_article ) {
	if ( get_page_by_title( $maison_article[0], OBJECT, 'post' ) ) {
		continue;
	}

	$maison_term = term_exists( $maison_article[1], 'category' );
	if ( ! $maison_term ) {
		$maison_term = wp_insert_term( $maison_article[1], 'category' );
	}
	$maison_term_id = ( is_array( $maison_term ) && isset( $maison_term['term_id'] ) ) ? (int) $maison_term['term_id'] : 0;

	$maison_article_id = wp_insert_post(
		array(
			'post_title'    => $maison_article[0],
			'post_type'     => 'post',
			'post_status'   => 'publish',
			'post_category' => $maison_term_id ? array( $maison_term_id ) : array(),
			'post_content'  => '<p>' . esc_html( $maison_article[3] ) . '</p>'
				. '<h2>A quieter kind of confidence</h2>'
				. '<p>Start with the foundations: a well-cut blazer, a fluid trouser, a shirt that sits just right. From there, add texture and personality rather than noise. The result is a wardrobe that feels like you — only more certain.</p>'
				. '<h2>Made to be worn</h2>'
				. '<p>We believe the best pieces are the ones you reach for again and again. That is why every piece in the COLLECTIVE edit is chosen for the way it lives in your day, not just the way it looks on a hanger.</p>',
			'post_excerpt'  => esc_html( $maison_article[3] ),
		)
	);

	if ( is_wp_error( $maison_article_id ) || ! $maison_article_id ) {
		continue;
	}

	$maison_image_id = $maison_upload_image( $maison_article[2], $maison_article_id );
	if ( $maison_image_id ) {
		set_post_thumbnail( $maison_article_id, $maison_image_id );
	}
}
