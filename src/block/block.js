/**
 * BLOCK: unicard
 *
 * Registering a customizable block.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

// Import Icons.
import icons from './icons/icons.js'

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, InspectorControls, ColorPalette, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Fragment } = wp.element;
const { Panel, PanelBody, PanelRow, Button, RadioControl } = wp.components;

const ALLOWED_MEDIA_TYPES = ['image'];


/**
 * Register: UniCard Block.
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
registerBlockType( 'unicard/block-unicard', {
	title: __( 'UniCard', 'unicard' ),
	icon: { background: '#11acee', src: icons.unicard },
	category: 'common',
	keywords: [
		__( 'unicard', 'unicard' ),
		__( 'custom card block', 'unicard' ),
	],
	supports: {
		align: ['full', 'wide'],
		anchor: true,
	},
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h3',
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
			type: 'object',
			default: {
				backgroundColor: 'transparent',
			}
		},
		imageAlt: {
			attribute: 'alt',
			selector: '.featured-image',
		},
		imageUrl: {
			attribute: 'src',
			selector: '.featured-image',
		},
		imageId: {
			type: 'number',
		},
		displayValue: {
			type: 'string',
			default: 'column',
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
		let { attributes: { title, content, contentStyle, backgroundStyle, imageUrl, imageId, displayValue }, setAttributes, className }=props;

		const onSelectImage=(openEvent) => {
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
							onClick={openEvent}
						>
							{!imageId && (__( 'Set featured image', 'unicard' ))}
						</Button>
					</div>
				);
			}
		};

		const onRemoveImage = () => {
			setAttributes({
				imageUrl: null,
			});
		};

		const onChangeTitle = (newTitle) => {
			setAttributes({
				title: newTitle,
			});
		};

		const onChangeContent = (newContent) => {
			setAttributes({
				content: newContent,
			});
		};

		const onChangeAlignment = (newAlignment) => {
			let alignmentValue = (newAlignment === undefined) ? 'none' : newAlignment;
			setAttributes({
				contentStyle: {
					color: contentStyle.color,
					textAlign: alignmentValue,
				}
			});
		};

		const onChangeTextColor = (newColor) => {
			let newColorValue = (newColor === undefined) ? 'none' : newColor;
			setAttributes({
				contentStyle: {
					color: newColorValue,
					textAlign: contentStyle.textAlign,
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

		const onChangeDisplay = (newDisplay) => {
			setAttributes({
				displayValue: newDisplay,
			});
		}

		return [

			<BlockControls>
				<AlignmentToolbar
					value={contentStyle.textAlign}
					onChange={onChangeAlignment}
				/>
			</BlockControls>,

			<Fragment>
				<InspectorControls>
					<Panel className={className}>
						<PanelBody
							title={__( 'Color Settings', 'unicard' )}
							initialOpen={true}
						>
							<PanelRow>{__('Choose a text color.', 'unicard')}</PanelRow>
							<ColorPalette
								value={contentStyle.color}
								onChange={onChangeTextColor}
							/>
							<PanelRow>{__('Choose a background color.', 'unicard')}</PanelRow>
							<ColorPalette
								value={backgroundStyle.backgroundColor}
								onChange={onChangeBackgroundColor}
							/>
						</PanelBody>
						<PanelBody
							title={__( 'Display Settings', 'unicard' )}
							initialOpen={false}
						>
							<RadioControl
								label={__( 'Choose Card Layout', 'unicard' )}
								selected={displayValue}
								options={[
									{ label: 'Column', value: 'column' },
									{ label: 'Column Reverse', value: 'column-reverse' },
									{ label: 'Row', value: 'row' },
									{ label: 'Row Reverse', value: 'row-reverse' },
								]}
								onChange={onChangeDisplay}
							/>

						</PanelBody>
					</Panel>
				</InspectorControls>
			</Fragment>,

			<div className="unicard-title">
				<h2>{__('UniCard Block', 'unicard')}</h2>
			</div>,
			<div className={[className, displayValue].join(' ')} style={backgroundStyle}>
				<div className="card-image">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media => { setAttributes({ imageAlt: media.alt, imageUrl: media.sizes.large.url }); }}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							type="image"
							value={imageId}
							render={({ open }) => onSelectImage( open )}
						/>
					</MediaUploadCheck>
					{!!imageUrl &&
						<MediaUploadCheck>
							<div className="button-container">
								<Button
									className="button"
									onClick={onRemoveImage} isLink isDestructive
								>
									{__( 'Remove', 'unicard' )}
								</Button>
							</div>
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
							placeholder={__( 'Your card title', 'unicard' )}
							keepPlaceholderOnFocus={true}
							value={title}
						/>
					</div>
					<div className="card-description">
						<RichText
							tagName="p"
							style={contentStyle}
							onChange={onChangeContent}
							placeholder={__( 'Your card content', 'unicard' )}
							keepPlaceholderOnFocus={true}
							value={content}
						/>
					</div>
				</div>
			</div>

		];
	},
	save: (props) => {

		const background = props.attributes.backgroundStyle;
		const display = props.attributes.displayValue;
		const layout = props.option;
		const style = props.attributes.contentStyle;
		const title = props.attributes.title;
		const content = props.attributes.content;
		const url = props.attributes.imageUrl;
		const alt = props.attributes.imageAlt;

		const cardImage=(imgSrc, imgAlt) => {
			if (!imgSrc) return null;

			if (imgAlt) {
				return (
					<div className="card-image">
						<img
							className="featured-image"
							src={imgSrc}
							alt={imgAlt}
						/>
					</div>
				);
			};

			// No alt set, so let's hide it from screen readers
			return (
				<div className="card-image">
					<img
						className="featured-image"
						src={imgSrc}
						alt=""
						aria-hidden="true"
					/>
				</div>
			);
		};

		const cardTitle = () => {
			if (!title) return null;

			if (title) {
				return (
					<div className="card-title">
						<RichText.Content
							style={style}
							tagName="h3"
							value={title}
						/>
					</div>
				);
			};

		};

		const cardContent = () => {
			if (!content) return null;

			if (content) {
				return (
					<div className="card-description">
						<RichText.Content
							style={style}
							tagName="p"
							value={content}
						/>
					</div>
				);
			};

		};

		return (

			<div className={['card', display].join(' ')} style={background}>

				{cardImage(url, alt)}

				<div className="card-content" style={layout}>
					{title.length > 0 &&
						cardTitle()
					}
					{content.length > 0 &&
						cardContent()
					}
				</div>

			</div>

		);
	}
});
