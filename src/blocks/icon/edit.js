/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, CustomSelectControl, ToggleControl, Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { Icons } from './icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { iconName, customIconUrl, useCustomIcon } = attributes;
	const iconOptions = Object.keys(Icons).map((key) => ({
		key: key,
		name: Icons[key].label,
		icon: Icons[key].component
	}));
	const selectedOption = iconOptions.find(option => option.key === iconName);
	const SelectedIcon = Icons[iconName]?.component || Icons.check.component;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Nastavení ikony">
					<ToggleControl
						label="Použít vlastní ikonu"
						checked={useCustomIcon}
						onChange={(val) => setAttributes({ useCustomIcon: val })}
					/>
					{!useCustomIcon ? (
						<CustomSelectControl
							label="Vyberte ikonu"
							value={selectedOption}
							options={iconOptions}
							onChange={({ selectedItem }) => setAttributes({ iconName: selectedItem.key })}
						/>
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ customIconUrl: media.url, customIconId: media.id })}
								allowedTypes={['image/svg+xml']}
								value={attributes.customIconId}
								render={({ open }) => (
									<Button
										variant='secondary'
										onClick={open}
									>
										{customIconUrl ? 'Změnit ikonu' : 'Nahrát ikonu'}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{useCustomIcon && customIconUrl ? (
					<object src={customIconUrl} style={{ width: '48px', height: "48px" }} />
				) : (
					<SelectedIcon width="48px" height="48px" />
				)}
			</div>
		</>
	);
}
