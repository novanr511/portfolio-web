<?php
/**
 * Advanced Custom Fields integration.
 *
 * Everything here is guarded: the theme works without ACF installed and
 * falls back to the bundled content in inc/template-tags.php.
 *
 * @package Novan_Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/init', 'novan_register_acf_options' );
/**
 * Register the theme options page and its fields.
 */
function novan_register_acf_options() {
	if ( ! function_exists( 'acf_add_options_page' ) || ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_options_page(
		array(
			'page_title' => __( 'Novan Theme Options', 'novan-base' ),
			'menu_title' => __( 'Theme Options', 'novan-base' ),
			'menu_slug'  => 'novan-theme-options',
			'capability' => 'edit_theme_options',
			'redirect'   => false,
			'position'   => 60,
		)
	);

	acf_add_local_field_group(
		array(
			'key'    => 'group_novan_options',
			'title'  => __( 'Theme Content', 'novan-base' ),
			'fields' => array(
				array(
					'key'   => 'field_novan_tab_brand',
					'label' => __( 'Brand', 'novan-base' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'     => 'field_novan_brand_name',
					'label'   => __( 'Wordmark', 'novan-base' ),
					'name'    => 'brand_name',
					'type'    => 'text',
					'default' => 'COLLECTIVE',
				),
				array(
					'key'     => 'field_novan_announcement',
					'label'   => __( 'Announcement text', 'novan-base' ),
					'name'    => 'announcement_text',
					'type'    => 'text',
					'default' => 'Big savings on everyday fashion. Only for a short time.',
				),
				array(
					'key'   => 'field_novan_tab_hero',
					'label' => __( 'Hero', 'novan-base' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'   => 'field_novan_hero_eyebrow',
					'label' => __( 'Eyebrow', 'novan-base' ),
					'name'  => 'hero_eyebrow',
					'type'  => 'text',
				),
				array(
					'key'     => 'field_novan_hero_title',
					'label'   => __( 'Heading', 'novan-base' ),
					'name'    => 'hero_title',
					'type'    => 'text',
					'default' => 'Effortless style. Timeless elegance.',
				),
				array(
					'key'   => 'field_novan_hero_text',
					'label' => __( 'Description', 'novan-base' ),
					'name'  => 'hero_text',
					'type'  => 'textarea',
					'rows'  => 3,
				),
				array(
					'key'           => 'field_novan_hero_image',
					'label'         => __( 'Hero image', 'novan-base' ),
					'name'          => 'hero_image',
					'type'          => 'image',
					'return_format' => 'array',
				),
				array(
					'key'   => 'field_novan_tab_collections',
					'label' => __( 'Collections', 'novan-base' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'           => 'field_novan_collections',
					'label'         => __( 'Collection cards', 'novan-base' ),
					'name'          => 'collections',
					'type'          => 'repeater',
					'button_label'  => __( 'Add collection', 'novan-base' ),
					'collapsed'     => 'field_novan_collection_title',
					'sub_fields'    => array(
						array(
							'key'           => 'field_novan_collection_image',
							'label'         => __( 'Image', 'novan-base' ),
							'name'          => 'image',
							'type'          => 'image',
							'return_format' => 'array',
						),
						array(
							'key'  => 'field_novan_collection_title',
							'label' => __( 'Title', 'novan-base' ),
							'name' => 'title',
							'type' => 'text',
						),
						array(
							'key'  => 'field_novan_collection_meta',
							'label' => __( 'Caption', 'novan-base' ),
							'name' => 'meta',
							'type' => 'text',
						),
					),
				),
				array(
					'key'   => 'field_novan_tab_editorial',
					'label' => __( 'Editorial', 'novan-base' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'     => 'field_novan_editorial_eyebrow',
					'label'   => __( 'Eyebrow', 'novan-base' ),
					'name'    => 'editorial_eyebrow',
					'type'    => 'text',
					'default' => 'The Edit',
				),
				array(
					'key'     => 'field_novan_editorial_title',
					'label'   => __( 'Heading', 'novan-base' ),
					'name'    => 'editorial_title',
					'type'    => 'text',
					'default' => 'Discover your signature style',
				),
				array(
					'key'   => 'field_novan_editorial_text',
					'label' => __( 'Description', 'novan-base' ),
					'name'  => 'editorial_text',
					'type'  => 'textarea',
					'rows'  => 3,
				),
				array(
					'key'           => 'field_novan_editorial_image',
					'label'         => __( 'Editorial image', 'novan-base' ),
					'name'          => 'editorial_image',
					'type'          => 'image',
					'return_format' => 'array',
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'options_page',
						'operator' => '==',
						'value'    => 'novan-theme-options',
					),
				),
			),
		)
	);
}

add_action( 'acf/init', 'novan_register_acf_block' );
/**
 * Register an ACF-powered (PHP rendered) block.
 */
function novan_register_acf_block() {
	if ( ! function_exists( 'acf_register_block_type' ) ) {
		return;
	}

	acf_register_block_type(
		array(
			'name'            => 'collection-showcase',
			'title'           => __( 'Collection Showcase', 'novan-base' ),
			'description'     => __( 'A grid of collections with editable cards.', 'novan-base' ),
			'category'        => 'design',
			'icon'            => 'grid-view',
			'mode'            => 'preview',
			'align'           => 'full',
			'supports'        => array(
				'align'  => array( 'wide', 'full' ),
				'anchor' => true,
			),
			'keywords'        => array( 'collection', 'fashion', 'card' ),
			'render_template' => NOVAN_THEME_DIR . '/template-parts/block-collection-showcase.php',
		)
	);

	acf_add_local_field_group(
		array(
			'key'    => 'group_novan_block_collection',
			'title'  => __( 'Collection Showcase Settings', 'novan-base' ),
			'fields' => array(
				array(
					'key'     => 'field_novan_block_heading',
					'label'   => __( 'Heading', 'novan-base' ),
					'name'    => 'block_heading',
					'type'    => 'text',
					'default' => __( 'Featured collections', 'novan-base' ),
				),
				array(
					'key'          => 'field_novan_block_items',
					'label'        => __( 'Cards', 'novan-base' ),
					'name'         => 'block_items',
					'type'         => 'repeater',
					'button_label' => __( 'Add card', 'novan-base' ),
					'sub_fields'   => array(
						array(
							'key'           => 'field_novan_block_item_image',
							'label'         => __( 'Image', 'novan-base' ),
							'name'          => 'image',
							'type'          => 'image',
							'return_format' => 'array',
						),
						array(
							'key'   => 'field_novan_block_item_title',
							'label' => __( 'Title', 'novan-base' ),
							'name'  => 'title',
							'type'  => 'text',
						),
					),
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'block',
						'operator' => '==',
						'value'    => 'acf/collection-showcase',
					),
				),
			),
		)
	);
}
