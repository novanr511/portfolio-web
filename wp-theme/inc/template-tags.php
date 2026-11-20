<?php
/**
 * Reusable template helpers with safe fallbacks when ACF is unavailable.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Read a theme option from ACF with a fallback value.
 *
 * @param string $key     Field name.
 * @param mixed  $default Fallback.
 * @return mixed
 */
function novan_option( $key, $default = '' ) {
	if ( function_exists( 'get_field' ) ) {
		$value = get_field( $key, 'option' );
		if ( is_string( $value ) && '' !== trim( $value ) ) {
			return $value;
		}
		if ( is_array( $value ) && ! empty( $value ) ) {
			return $value;
		}
	}
	return $default;
}

/**
 * Resolve an ACF image field (array or ID) to a URL, with a local fallback.
 *
 * @param string $key           Field name.
 * @param string $fallback_file File inside assets/images/.
 * @return string
 */
function novan_image_url( $key, $fallback_file ) {
	$image = function_exists( 'get_field' ) ? get_field( $key, 'option' ) : null;

	if ( is_array( $image ) && ! empty( $image['url'] ) ) {
		return esc_url( $image['url'] );
	}

	if ( is_numeric( $image ) ) {
		$url = wp_get_attachment_url( (int) $image );
		if ( $url ) {
			return esc_url( $url );
		}
	}

	return esc_url( NOVAN_THEME_URI . '/assets/images/' . $fallback_file );
}

/**
 * Brand wordmark text.
 *
 * @return string
 */
function novan_brand_name() {
	return (string) novan_option( 'brand_name', 'COLLECTIVE' );
}

/**
 * Announcement bar copy.
 *
 * @return string
 */
function novan_announcement() {
	return (string) novan_option(
		'announcement_text',
		'Big savings on everyday fashion. Only for a short time.'
	);
}

/**
 * Hero copy.
 *
 * @return array
 */
function novan_hero() {
	return array(
		'eyebrow' => (string) novan_option( 'hero_eyebrow', 'New Season' ),
		'title'   => (string) novan_option( 'hero_title', 'Effortless style. Timeless elegance.' ),
		'text'    => (string) novan_option(
			'hero_text',
			'Discover tailored blazers, relaxed trousers, and sophisticated everyday essentials designed for the modern woman.'
		),
	);
}

/**
 * Collection cards. Uses ACF repeater when available, otherwise bundled defaults.
 *
 * @return array
 */
function novan_collections() {
	$items = novan_option( 'collections', array() );

	if ( is_array( $items ) && ! empty( $items ) ) {
		$result = array();
		foreach ( $items as $item ) {
			$image      = isset( $item['image'] ) ? $item['image'] : null;
			$image_url  = '';
			if ( is_array( $image ) && ! empty( $image['url'] ) ) {
				$image_url = esc_url( $image['url'] );
			} elseif ( is_numeric( $image ) ) {
				$attachment = wp_get_attachment_url( (int) $image );
				$image_url  = $attachment ? esc_url( $attachment ) : '';
			}

			if ( ! $image_url ) {
				continue;
			}

			$result[] = array(
				'title' => isset( $item['title'] ) ? (string) $item['title'] : '',
				'meta'  => isset( $item['meta'] ) ? (string) $item['meta'] : '',
				'image' => $image_url,
			);
		}
		if ( ! empty( $result ) ) {
			return $result;
		}
	}

	$base = NOVAN_THEME_URI . '/assets/images/';

	return array(
		array(
			'title' => __( 'Dresses', 'novan-base' ),
			'meta'  => __( 'Effortless silhouettes', 'novan-base' ),
			'image' => esc_url( $base . 'collection-dresses.webp' ),
		),
		array(
			'title' => __( 'Tops', 'novan-base' ),
			'meta'  => __( 'Considered essentials', 'novan-base' ),
			'image' => esc_url( $base . 'collection-tops.webp' ),
		),
		array(
			'title' => __( 'Jeans', 'novan-base' ),
			'meta'  => __( 'Relaxed tailoring', 'novan-base' ),
			'image' => esc_url( $base . 'collection-jeans.webp' ),
		),
		array(
			'title' => __( 'Co-ord Sets', 'novan-base' ),
			'meta'  => __( 'Complete looks', 'novan-base' ),
			'image' => esc_url( $base . 'collection-cord.webp' ),
		),
		array(
			'title' => __( 'Skirts', 'novan-base' ),
			'meta'  => __( 'Modern classics', 'novan-base' ),
			'image' => esc_url( $base . 'collection-skirts.webp' ),
		),
	);
}

/**
 * Editorial section copy.
 *
 * @return array
 */
function novan_editorial() {
	return array(
		'eyebrow' => (string) novan_option( 'editorial_eyebrow', 'The Edit' ),
		'title'   => (string) novan_option( 'editorial_title', 'Discover your signature style' ),
		'text'    => (string) novan_option(
			'editorial_text',
			'Explore expressive layouts, striking imagery, and stories that elevate the way you dress — and the way you feel.'
		),
	);
}

/**
 * Estimated reading time for the current post.
 *
 * @return string
 */
function novan_reading_time() {
	$content   = get_post_field( 'post_content', get_the_ID() );
	$words     = str_word_count( wp_strip_all_tags( $content ) );
	$minutes   = max( 1, (int) ceil( $words / 200 ) );

	/* translators: %d: number of minutes. */
	return sprintf( _n( '%d min read', '%d min read', $minutes, 'novan-base' ), $minutes );
}

/**
 * Fallback menu when no menu is assigned in Appearance > Menus.
 */
function novan_default_menu() {
	echo '<ul class="primary-menu__list">';
	wp_list_pages(
		array(
			'title_li' => '',
			'depth'    => 1,
		)
	);
	echo '</ul>';
}

/**
 * Inline SVG arrow icon (decorative by default).
 *
 * @param string $direction 'up-right', 'left' or 'right'.
 * @return string
 */
function novan_arrow_icon( $direction = 'up-right' ) {
	$paths = array(
		'up-right' => 'M5 19 19 5M8 5h11v11',
		'left'     => 'M19 12H5m7-7-7 7 7 7',
		'right'    => 'M5 12h14m-7-7 7 7-7 7',
	);
	$path = isset( $paths[ $direction ] ) ? $paths[ $direction ] : $paths['up-right'];

	return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="' . esc_attr( $path ) . '"/></svg>';
}
