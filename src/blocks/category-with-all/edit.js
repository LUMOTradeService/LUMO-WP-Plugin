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
import { useBlockProps } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

import { Spinner } from '@wordpress/components';

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
export default function Edit() {
	const blockProps = useBlockProps();

    const { categories, isResolving } = useSelect( ( select ) => {
        const query = {
            per_page: -1,
            hide_empty: true,
        };
        
        // Používáme novější selektor isResolving pro čistší kód
        return {
            categories: select( 'core' ).getEntityRecords( 'taxonomy', 'category', query ),
            isResolving: select( 'core' ).isResolving( 'getEntityRecords', [ 'taxonomy', 'category', query ] ),
        };
    }, [] );

	const allCategories = categories || [];

	return (
		<div { ...blockProps }>
            { isResolving ? (
                <Spinner />
            ) : (
                <ul className="wp-block-categories-list wp-block-categories">
                    <li className="cat-item cat-item-all">
                        <a href="#">{ __( 'All', 'lumo-wp-plugin' ) }</a>
                    </li>
                    
                    { allCategories.map( ( category ) => (
                        <li key={ category.id } className={ `cat-item cat-item-${ category.id }` }>
                            <a href="#">{ category.name }</a>
                        </li>
                    ) ) }

                    { ! isResolving && allCategories.length === 0 && (
                        <li>{ __( 'No categories found.', 'lumo-wp-plugin' ) }</li>
                    ) }
                </ul>
            ) }
        </div>
	);
}
