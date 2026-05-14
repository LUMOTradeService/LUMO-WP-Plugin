import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToolbarDropdownMenu } from '@wordpress/components';
import { useMemo, useEffect, useRef } from '@wordpress/element';
import Prism from './prism.js'; // Import your custom Prism file
import './editor.scss';

export default function Edit({ attributes, setAttributes, isSelected }) {
	const { content, language } = attributes;
	const blockProps = useBlockProps();
	const previewRef = useRef();

	// Auto-focus textarea when block becomes selected.
	useEffect(() => {
        if (!isSelected && previewRef.current) {
            Prism.highlightElement(previewRef.current);
        }
    }, [isSelected, content, language]);

	// 1. Extract languages dynamically from Prism.js
	// Prism.languages contains grammar objects. We filter out prototype/helper methods.
	const languageOptions = Object.keys(Prism.languages)
		.filter((key) => typeof Prism.languages[key] === 'object' && !Array.isArray(Prism.languages[key]))
		.map((lang) => ({
			label: lang.toUpperCase(), // e.g., "JAVASCRIPT", "JSON"
			value: lang,
		}));

	// 2. Map options for the ToolbarDropdownMenu
	const toolbarControls = languageOptions.map((option) => ({
		title: option.label,
		isActive: language === option.value,
		onClick: () => setAttributes({ language: option.value }),
	}));

	return (
		<div {...blockProps}>
			{/* Toolbar Dropdown */}
			<BlockControls>
				<ToolbarDropdownMenu
					icon="editor-code"
					label={__('Select Language', 'your-textdomain')}
					controls={toolbarControls}
				/>
			</BlockControls>

			{/* Sidebar Dropdown */}
			<InspectorControls>
				<PanelBody title={__('Code Settings', 'your-textdomain')}>
					<SelectControl
						label={__('Language', 'your-textdomain')}
						value={language}
						options={languageOptions}
						onChange={(newLang) => setAttributes({ language: newLang })}
					/>
				</PanelBody>
			</InspectorControls>

			{isSelected ? (

				<pre className={`language-${language}`}>
					<RichText
						tagName="code"
						className={`language-${language}`}
						value={content}
						onChange={(newContent) => setAttributes({ content: newContent })}
						placeholder={__('Write your code here...', 'lumo-wp-plugin')}
						preserveWhiteSpace={true}
						allowedFormats={[]} // Prevent bold/italic inside code
					/>
				</pre>
			) : (
				<pre className={`language-${language}`}>
                    <code ref={ previewRef } className={`language-${language}`}>
                        { content }
                    </code>
                </pre>
			)}
		</div >
	);
}