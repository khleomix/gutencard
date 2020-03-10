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
const { RichText, BlockControls, AlignmentToolbar, InspectorControls, ColorPalette } = wp.editor;
const { Fragment } = wp.element;
const { Panel, PanelBody, PanelRow } = wp.components;

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
	icon: { background: '#000', foreground: '#F38A8A', src: 'buddicons-activity' },
	category: 'common',
	keywords: [
		__( 'gutencard' ),
		__( 'custom card block' ),
	],
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
			type: 'object',
			default: {
				backgroundColor: 'white',
			}
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

		let { attributes: { title, content, contentStyle, backgroundStyle }, setAttributes, className } = props;

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
					textAlign: backgroundStyle.textAlign
				}
			});
		};

		return (
			<div className={className} style={backgroundStyle}>
				{
					<BlockControls>
						<AlignmentToolbar
							value={contentStyle.textAlign}
							onChange={onChangeAlignment}
						/>
					</BlockControls>
				}
				{
					<Fragment>
						<InspectorControls className={className}>
							<Panel>
								<PanelBody title="Color Settings" initialOpen={false}>
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
					</Fragment>
				}
				{
					<div className="card-content">
						<RichText
							className="heading"
							tagName="h3"
							style={contentStyle}
							onChange={onChangeTitle}
							placeholder="Your card title"
							value={title}
						/>
						<RichText
							tagName="p"
							style={contentStyle}
							onChange={onChangeContent}
							placeholder="Your card content"
							value={content}
						/>
					</div>
				}
			</div>
		);
	},
	save: (props) => {

		return (

			<div className="card" style={props.attributes.backgroundStyle}>

				<div className="card-content">
					<div className="card-title">
						<RichText.Content style={props.attributes.contentStyle} tagName="h3" value={props.attributes.title} />
					</div>
					<div className="card-body">
						<RichText.Content style={props.attributes.contentStyle} tagName="p" value={props.attributes.content} />
					</div>
				</div>

			</div>

		);
	}
});
