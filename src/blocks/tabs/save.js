/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
    const { tabTitles, showSeparator } = attributes;

    const blockProps = useBlockProps.save({
        className: 'lumo-tabs',
    });

    return (
        <div {...blockProps}>
            <ul className="lumo-tabs__nav" role="tablist">
                {tabTitles.map((title, index) => (
                    <li
                        key={index}
                        className={`lumo-tabs__nav-item${index === 0 ? ' current-tab' : ''}`}
                        role="tab"
                        data-tab-index={index}
                        tabIndex={index === 0 ? 0 : -1}
                        aria-selected={index === 0}
                    >
                        { /* Titles are plain text (no formats allowed in RichText for tab-item) */}
                        <span className="lumo-tabs__nav-item-content">{title}</span>
                    </li>
                ))}
            </ul>

            {showSeparator && (
                <hr className="wp-block-separator has-alpha-channel-opacity" />
            )}

            <div className="lumo-tabs__panels">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
