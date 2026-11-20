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

	registerBlockType('novan/collection-card', {
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
						className: 'novan-collection-card__image'
				  })
				: el(
						'div',
						{ className: 'novan-collection-card__placeholder' },
						__('Choose an image', 'novan-base')
				  );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Card content', 'novan-base') },
						el(TextControl, {
							label: __('Title', 'novan-base'),
							value: attributes.title,
							onChange: function (value) {
								setAttributes({ title: value });
							}
						}),
						el(TextControl, {
							label: __('Caption', 'novan-base'),
							value: attributes.meta,
							onChange: function (value) {
								setAttributes({ meta: value });
							}
						}),
						el(TextControl, {
							label: __('Link URL', 'novan-base'),
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
											? __('Replace image', 'novan-base')
											: __('Choose image', 'novan-base')
									);
								}
							})
						)
					)
				),
				el(
					'div',
					useBlockProps({ className: 'novan-collection-card' }),
					image,
					el('h3', { className: 'novan-collection-card__title' }, attributes.title),
					attributes.meta
						? el('p', { className: 'novan-collection-card__meta' }, attributes.meta)
						: null
				)
			);
		},

		save: function (props) {
			var attributes = props.attributes;
			var blockProps = useBlockProps.save({ className: 'novan-collection-card' });

			var image = attributes.imageUrl
				? el('img', {
						src: attributes.imageUrl,
						alt: attributes.alt || '',
						className: 'novan-collection-card__image'
				  })
				: null;

			var heading = el(
				'h3',
				{ className: 'novan-collection-card__title' },
				attributes.title
			);
			var meta = attributes.meta
				? el('p', { className: 'novan-collection-card__meta' }, attributes.meta)
				: null;

			var content = attributes.link
				? el(
						'a',
						{ href: attributes.link, className: 'novan-collection-card__link' },
						image,
						heading,
						meta
				  )
				: el(Fragment, null, image, heading, meta);

			return el('div', blockProps, content);
		}
	});
})();
