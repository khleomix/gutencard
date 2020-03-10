/**
 * BLOCK: gutencard
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, PlainText, BlockControls, AlignmentToolbar, InspectorControls, ColorPalette } = wp.editor;
const { Fragment } = wp.element;
const { TextControl, ToggleControl, Panel, PanelBody, PanelRow } = wp.components;

/**
 * Register: aa Gutenberg Block.
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
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Gutencard' ), // Block title.
	icon: { background: '#000', foreground: '#F38A8A', src: 'buddicons-activity' },
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
		titleStyle: {
			type: 'object',
			default: {
				color: 'black',
				textAlign: 'left'
			}
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
				textAlign: 'left'
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

		let { attributes: { title, content, contentStyle }, setAttributes, className } = props;

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

		return (
			<div className={className}>
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
							<Panel header="Gutencard Settings">
								<PanelBody title="Text Settings" initialOpen={true}>
									<PanelRow>Choose a text color.</PanelRow>
									<ColorPalette
										onChange={onChangeTextColor}
									/>
								</PanelBody>
							</Panel>
						</InspectorControls>
					</Fragment>
				}
				<div className="card-content" style={props.attributes.contentStyle}>
					<RichText
						className="heading"
						tagName="h3"
						onChange={onChangeTitle}
						value={title}
					/>
					<RichText
						tagName="p"
						style={contentStyle}
						onChange={onChangeContent}
						value={content}
					/>
				</div>
			</div>
		);
	},
	save: (props) => {

		return (

			<div className="card">

				<div className="card-content" >
					<div className="card-title">
						<RichText.Content tagName="h3" value={props.attributes.title} />
					</div>
					<div className="card-body">
						<RichText.Content tagName="p" value={props.attributes.content} />
					</div>
				</div>
			</div>

		);
	}
});
