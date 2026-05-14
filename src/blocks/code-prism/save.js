import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, language } = attributes;
    
    return (
        <div { ...useBlockProps.save() }>
            {/* 
                1. 'line-numbers' class is optional but looks good.
                2. The data-download-link attribute enables the download plugin.
            */}
            <pre 
                className={`language-${language}`} data-src={`lumo-code-${language}.${language}`}
                data-download-link
            >
                <code className={`language-${language}`}>
                    { content }
                </code>
            </pre>
        </div>
    );
}