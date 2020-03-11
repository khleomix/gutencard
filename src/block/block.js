/**
 * BLOCK: gutencard
 *
 * Registering a customizable block.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, InspectorControls, ColorPalette, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Fragment } = wp.element;
const { Panel, PanelBody, PanelRow, Button, ResponsiveWrapper } = wp.components;

const ALLOWED_MEDIA_TYPES = ['image'];

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutencard/block-gutencard', {
	title: __( 'Gutencard' ),
	icon: { background: '#8a2387', foreground: '#fff9c0', src: 'buddicons-activity' },
	category: 'common',
	keywords: [
		__( 'gutencard' ),
		__( 'custom card block' ),
	],
	supports: {
		align: ['full', 'wide'],
	},
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h3'
		},
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		contentStyle: {
			type: 'object',
			default: {
				color: 'black',
				textAlign: 'left',
			}
		},
		backgroundStyle: {
			type: 'object'
		},
		imageAlt: {
			attribute: 'alt',
			selector: '.featured-image'
		},
		imageUrl: {
			attribute: 'src',
			selector: '.featured-image'
		},
		imageId: {
			type: 'number',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

		let { attributes: { title, content, contentStyle, backgroundStyle, image, imageUrl, imageId }, setAttributes, className } = props;

		const onSelectImage = (openEvent) => {
			if (imageUrl) {
				return (
					<img
						src={imageUrl}
						onClick={openEvent}
						className="image"
					/>
				);
			}
			else {
				return (
					<div className="button-container">
						<Button
							className={!imageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
							onClick={openEvent}>
							{!imageId && (__('Set featured image', 'gutenberg'))}
							{!!imageId && imageUrl &&
								<ResponsiveWrapper
									naturalWidth={image.media_details.width}
									naturalHeight={image.media_details.height}
								>
									<img src={image.source_url} alt={__('Featured Image', 'gutenberg')} />
								</ResponsiveWrapper>
							}
						</Button>
					</div>
				);
			}
		};

		const onRemoveImage = () => {
			setAttributes({
				imageUrl: null
			});
		};

		const onChangeTitle = (newTitle) => {
			setAttributes({ title: newTitle });
		};

		const onChangeContent = (newContent) => {
			setAttributes({ content: newContent });
		};

		const onChangeAlignment = (newAlignment) => {
			let alignmentValue = (newAlignment === undefined) ? 'none' : newAlignment;
			setAttributes({
				contentStyle: {
					color: contentStyle.color,
					textAlign: alignmentValue
				}
			});
		};

		const onChangeTextColor = (newColor) => {
			let newColorValue = (newColor === undefined) ? 'none' : newColor;
			setAttributes({
				contentStyle: {
					color: newColorValue,
					textAlign: contentStyle.textAlign
				}
			});
		};

		const onChangeBackgroundColor = (newBgcolor) => {
			let newBgcolorValue = (newBgcolor === undefined) ? 'none' : newBgcolor;
			setAttributes({
				backgroundStyle: {
					backgroundColor: newBgcolorValue,
				}
			});
		};

		return [

			<BlockControls>
				<AlignmentToolbar
					value={contentStyle.textAlign}
					onChange={onChangeAlignment}
				/>
			</BlockControls>,

			<Fragment>
				<InspectorControls className={className}>
					<Panel>
						<PanelBody
							title={__('Color Settings')}
							initialOpen={true}
						>
							<PanelRow>Choose a text color.</PanelRow>
							<ColorPalette
								onChange={onChangeTextColor}
							/>
							<PanelRow>Choose a background color.</PanelRow>
							<ColorPalette
								onChange={onChangeBackgroundColor}
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
			</Fragment>,

			<div className={className} style={backgroundStyle}>
				<div class="gutencard-title">
					<h2>Gutencard Block</h2>
				</div>
				<div className="card-image">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media => { setAttributes({ imageAlt: media.alt, imageUrl: media.sizes.large.url }); }}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							type="image"
							value={imageId}
							render={({ open }) => onSelectImage(open)}
						/>
					</MediaUploadCheck>
					{!!imageUrl &&
						<MediaUploadCheck>
							<Button className="button" onClick={onRemoveImage} isLink isDestructive>
								{__('Remove', 'gutenberg')}
							</Button>
						</MediaUploadCheck>
					}
				</div>
				<div className="card-content">
					<div className="card-title">
						<RichText
							className="heading"
							tagName="h3"
							style={contentStyle}
							onChange={onChangeTitle}
							placeholder="Your card title"
							value={title}
						/>
					</div>
					<div className="card-description">
						<RichText
							tagName="p"
							style={contentStyle}
							onChange={onChangeContent}
							placeholder="Your card content"
							value={content}
						/>
					</div>
				</div>
			</div>

		];
	},
	save: (props) => {

		const cardImage = (src, alt) => {
			if (!src) return null;

			if (alt) {
				return (
					<img
						className="featured-image"
						src={src}
						alt={alt}
					/>
				);
			}

			// No alt set, so let's hide it from screen readers
			return (
				<img
					className="featured-image"
					src={src}
					alt=""
					aria-hidden="true"
				/>
			);
		};

		return (

			<div className="card" style={props.attributes.backgroundStyle}>

				<div className="card-image">
					{cardImage(props.attributes.imageUrl, props.attributes.imageAlt)}
				</div>

				<div className="card-content">
					<div className="card-title">
						<RichText.Content style={props.attributes.contentStyle} tagName="h3" value={props.attributes.title} />
					</div>
					<div className="card-description">
						<RichText.Content style={props.attributes.contentStyle} tagName="p" value={props.attributes.content} />
					</div>
				</div>

			</div>

		);
	}
});
