<?php
/**
 * Advanced Custom Fields integration.
 *
 * Everything here is guarded: the theme works without ACF installed and
 * falls back to the bundled content in inc/template-tags.php.
 *
 * @package Maison
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/init', 'maison_register_acf_options' );
/**
 * Register the theme options page and its fields.
 */
function maison_register_acf_options() {
	if ( ! function_exists( 'acf_add_options_page' ) || ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_options_page(
		array(
			'page_title' => __( 'Maison Theme Options', 'maison' ),
			'menu_title' => __( 'Theme Options', 'maison' ),
			'menu_slug'  => 'maison-theme-options',
			'capability' => 'edit_theme_options',
			'redirect'   => false,
			'position'   => 60,
		)
	);

	acf_add_local_field_group(
		array(
			'key'    => 'group_maison_options',
			'title'  => __( 'Theme Content', 'maison' ),
			'fields' => array(
				array(
					'key'   => 'field_maison_tab_brand',
					'label' => __( 'Brand', 'maison' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'     => 'field_maison_brand_name',
					'label'   => __( 'Wordmark', 'maison' ),
					'name'    => 'brand_name',
					'type'    => 'text',
					'default' => 'COLLECTIVE',
				),
				array(
					'key'     => 'field_maison_announcement',
					'label'   => __( 'Announcement text', 'maison' ),
					'name'    => 'announcement_text',
					'type'    => 'text',
					'default' => 'Big savings on everyday fashion. Only for a short time.',
				),
				array(
					'key'   => 'field_maison_tab_hero',
					'label' => __( 'Hero', 'maison' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'   => 'field_maison_hero_eyebrow',
					'label' => __( 'Eyebrow', 'maison' ),
					'name'  => 'hero_eyebrow',
					'type'  => 'text',
				),
				array(
					'key'     => 'field_maison_hero_title',
					'label'   => __( 'Heading', 'maison' ),
					'name'    => 'hero_title',
					'type'    => 'text',
					'default' => 'Effortless style. Timeless elegance.',
				),
				array(
					'key'   => 'field_maison_hero_text',
					'label' => __( 'Description', 'maison' ),
					'name'  => 'hero_text',
					'type'  => 'textarea',
					'rows'  => 3,
				),
				array(
					'key'           => 'field_maison_hero_image',
					'label'         => __( 'Hero image', 'maison' ),
					'name'          => 'hero_image',
					'type'          => 'image',
					'return_format' => 'array',
				),
				array(
					'key'   => 'field_maison_tab_collections',
					'label' => __( 'Collections', 'maison' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'           => 'field_maison_collections',
					'label'         => __( 'Collection cards', 'maison' ),
					'name'          => 'collections',
					'type'          => 'repeater',
					'button_label'  => __( 'Add collection', 'maison' ),
					'collapsed'     => 'field_maison_collection_title',
					'sub_fields'    => array(
						array(
							'key'           => 'field_maison_collection_image',
							'label'         => __( 'Image', 'maison' ),
							'name'          => 'image',
							'type'          => 'image',
							'return_format' => 'array',
						),
						array(
							'key'  => 'field_maison_collection_title',
							'label' => __( 'Title', 'maison' ),
							'name' => 'title',
							'type' => 'text',
						),
						array(
							'key'  => 'field_maison_collection_meta',
							'label' => __( 'Caption', 'maison' ),
							'name' => 'meta',
							'type' => 'text',
						),
					),
				),
				array(
					'key'   => 'field_maison_tab_editorial',
					'label' => __( 'Editorial', 'maison' ),
					'name'  => '',
					'type'  => 'tab',
				),
				array(
					'key'     => 'field_maison_editorial_eyebrow',
					'label'   => __( 'Eyebrow', 'maison' ),
					'name'    => 'editorial_eyebrow',
					'type'    => 'text',
					'default' => 'The Edit',
				),
				array(
					'key'     => 'field_maison_editorial_title',
					'label'   => __( 'Heading', 'maison' ),
					'name'    => 'editorial_title',
					'type'    => 'text',
					'default' => 'Discover your signature style',
				),
				array(
					'key'   => 'field_maison_editorial_text',
					'label' => __( 'Description', 'maison' ),
					'name'  => 'editorial_text',
					'type'  => 'textarea',
					'rows'  => 3,
				),
				array(
					'key'           => 'field_maison_editorial_image',
					'label'         => __( 'Editorial image', 'maison' ),
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
						'value'    => 'maison-theme-options',
					),
				),
			),
		)
	);
}

add_action( 'acf/init', 'maison_register_acf_block' );
/**
 * Register an ACF-powered (PHP rendered) block.
 */
function maison_register_acf_block() {
	if ( ! function_exists( 'acf_register_block_type' ) ) {
		return;
	}

	acf_register_block_type(
		array(
			'name'            => 'collection-showcase',
			'title'           => __( 'Collection Showcase', 'maison' ),
			'description'     => __( 'A grid of collections with editable cards.', 'maison' ),
			'category'        => 'design',
			'icon'            => 'grid-view',
			'mode'            => 'preview',
			'align'           => 'full',
			'supports'        => array(
				'align'  => array( 'wide', 'full' ),
				'anchor' => true,
			),
			'keywords'        => array( 'collection', 'fashion', 'card' ),
			'render_template' => MAISON_THEME_DIR . '/template-parts/block-collection-showcase.php',
		)
	);

	acf_add_local_field_group(
		array(
			'key'    => 'group_maison_block_collection',
			'title'  => __( 'Collection Showcase Settings', 'maison' ),
			'fields' => array(
				array(
					'key'     => 'field_maison_block_heading',
					'label'   => __( 'Heading', 'maison' ),
					'name'    => 'block_heading',
					'type'    => 'text',
					'default' => __( 'Featured collections', 'maison' ),
				),
				array(
					'key'          => 'field_maison_block_items',
					'label'        => __( 'Cards', 'maison' ),
					'name'         => 'block_items',
					'type'         => 'repeater',
					'button_label' => __( 'Add card', 'maison' ),
					'sub_fields'   => array(
						array(
							'key'           => 'field_maison_block_item_image',
							'label'         => __( 'Image', 'maison' ),
							'name'          => 'image',
							'type'          => 'image',
							'return_format' => 'array',
						),
						array(
							'key'   => 'field_maison_block_item_title',
							'label' => __( 'Title', 'maison' ),
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
