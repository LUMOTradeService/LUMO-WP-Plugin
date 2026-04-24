/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

import { Icons } from './icons';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { iconName, customIconUrl, useCustomIcon } = attributes;
	const SelectedIcon = Icons[iconName]?.component || Icons.check.component;

	return (
		<div {...useBlockProps.save()}>
			{
				useCustomIcon && customIconUrl ? (
					<object src={customIconUrl} style={{ width: '48px', height: "48px" }} />
				) : (
					<SelectedIcon width="48px" height="48px" />
				)
			}
		</div>
	);
}
