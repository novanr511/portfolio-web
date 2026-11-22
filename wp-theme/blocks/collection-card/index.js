/**
 * Collection Card block editor script.
 * Uses WordPress globals directly so no JS build step is required.
 */
(function () {
	'use strict';

	var registerBlockType = wp.blocks.registerBlockType;
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var Button = wp.components.Button;
	var __ = wp.i18n.__;

	registerBlockType('maison/collection-card', {
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			function onSelect(media) {
				setAttributes({
					imageUrl: media && media.url ? media.url : '',
					alt: media && media.alt ? media.alt : ''
				});
			}

			var image = attributes.imageUrl
				? el('img', {
						src: attributes.imageUrl,
						alt: attributes.alt || '',
						className: 'maison-collection-card__image'
				  })
				: el(
						'div',
						{ className: 'maison-collection-card__placeholder' },
						__('Choose an image', 'maison')
				  );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Card content', 'maison') },
						el(TextControl, {
							label: __('Title', 'maison'),
							value: attributes.title,
							onChange: function (value) {
								setAttributes({ title: value });
							}
						}),
						el(TextControl, {
							label: __('Caption', 'maison'),
							value: attributes.meta,
							onChange: function (value) {
								setAttributes({ meta: value });
							}
						}),
						el(TextControl, {
							label: __('Link URL', 'maison'),
							value: attributes.link,
							onChange: function (value) {
								setAttributes({ link: value });
							}
						}),
						el(
							MediaUploadCheck,
							null,
							el(MediaUpload, {
								onSelect: onSelect,
								allowedTypes: ['image'],
								render: function (obj) {
									return el(
										Button,
										{ onClick: obj.open },
										attributes.imageUrl
											? __('Replace image', 'maison')
											: __('Choose image', 'maison')
									);
								}
							})
						)
					)
				),
				el(
					'div',
					useBlockProps({ className: 'maison-collection-card' }),
					image,
					el('h3', { className: 'maison-collection-card__title' }, attributes.title),
					attributes.meta
						? el('p', { className: 'maison-collection-card__meta' }, attributes.meta)
						: null
				)
			);
		},

		save: function (props) {
			var attributes = props.attributes;
			var blockProps = useBlockProps.save({ className: 'maison-collection-card' });

			var image = attributes.imageUrl
				? el('img', {
						src: attributes.imageUrl,
						alt: attributes.alt || '',
						className: 'maison-collection-card__image'
				  })
				: null;

			var heading = el(
				'h3',
				{ className: 'maison-collection-card__title' },
				attributes.title
			);
			var meta = attributes.meta
				? el('p', { className: 'maison-collection-card__meta' }, attributes.meta)
				: null;

			var content = attributes.link
				? el(
						'a',
						{ href: attributes.link, className: 'maison-collection-card__link' },
						image,
						heading,
						meta
				  )
				: el(Fragment, null, image, heading, meta);

			return el('div', blockProps, content);
		}
	});
})();
