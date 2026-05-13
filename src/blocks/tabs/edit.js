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
import { useBlockProps, InnerBlocks, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { PanelBody, ToggleControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
    const { tabTitles, showSeparator } = attributes;

    const innerBlocks = useSelect(
        (select) => select(blockEditorStore).getBlocks(clientId),
        [clientId]
    );

    // Keep tabTitles attribute in sync with inner block title attributes.
    useEffect(() => {
        const titles = innerBlocks.map(
            (block, i) =>
                block.attributes.title ||
				/* translators: %d: tab number */ sprintf(__('Tab %d', 'lumo-wp-plugin'), i + 1)
        );
        if (JSON.stringify(titles) !== JSON.stringify(tabTitles)) {
            setAttributes({ tabTitles: titles });
        }
    }, [innerBlocks]);

    const blockProps = useBlockProps({
        className: 'lumo-tabs',
    });

    return (
        <>
            { /* ── Sidebar inspector panel ───────────────────────────────── */}
            < InspectorControls >
                <PanelBody title={__('Separator', 'lumo-wp-plugin')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show separator', 'lumo-wp-plugin')}
                        checked={showSeparator}
                        onChange={(value) => setAttributes({ showSeparator: value })}
                    />
                </PanelBody>
            </InspectorControls >

            <div {...blockProps}>
                {/* Read-only nav preview — titles are edited inside each Tab Item */}
                <ul className="lumo-tabs__nav">
                    {innerBlocks.length > 0
                        ? innerBlocks.map((block, index) => (
                            <li
                                key={block.clientId}
                                className={`lumo-tabs__nav-item${index === 0 ? ' current-tab' : ''}`}
                            >
                                <span className="lumo-tabs__nav-item-content"
                                    // Title may contain safe inline HTML from RichText (no formats allowed,
                                    // but dangerouslySetInnerHTML keeps the preview consistent with save output).
                                    dangerouslySetInnerHTML={{
                                        __html: block.attributes.title || __('Tab title…', 'lumo-wp-plugin'),
                                    }}
                                />
                            </li>
                        ))
                        : /* Placeholder shown before any Tab Items are added */
                        (<li className="lumo-tabs__nav-item current-tab">
                            {__('Tab 1', 'lumo-wp-plugin')}
                        </li>)}
                </ul>

                { /* ── Separator ───────────────────────────────────────────── */}
                {showSeparator && (
                    <hr className="wp-block-separator has-alpha-channel-opacity"/>
                )}

                {/* All Tab Item child blocks are rendered and editable here */}
                <div className="lumo-tabs__panels">
                    <InnerBlocks
                        allowedBlocks={['lumo-wp-plugin/tab-item']}
                        template={[
                            ['lumo-wp-plugin/tab-item', { title: __('Tab 1', 'lumo-wp-plugin') }],
                            ['lumo-wp-plugin/tab-item', { title: __('Tab 2', 'lumo-wp-plugin') }],
                        ]}
                        templateLock={false}
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                </div>
            </div>
        </>
    );
}
