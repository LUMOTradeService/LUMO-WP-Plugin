/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
 
function activateTab( navItems, panels, targetIndex ) {
	navItems.forEach( ( item, i ) => {
		const isActive = i === targetIndex;
		item.classList.toggle( 'current-tab', isActive );
		item.setAttribute( 'aria-selected', String( isActive ) );
		item.setAttribute( 'tabindex', isActive ? '0' : '-1' );
	} );
 
	panels.forEach( ( panel, i ) => {
		panel.classList.toggle( 'current-tab', i === targetIndex );
	} );
}
 
document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.lumo-tabs' ).forEach( ( tabsEl ) => {
		const navItems = Array.from( tabsEl.querySelectorAll( '.lumo-tabs__nav-item' ) );
		const panels   = Array.from( tabsEl.querySelectorAll( '.lumo-tab-item' ) );
 
		if ( ! navItems.length || ! panels.length ) return;
 
		// Ensure the first panel starts active (save.js already adds the class,
		// but this covers any edge-cases / server-side-rendering).
		activateTab( navItems, panels, 0 );
 
		navItems.forEach( ( navItem ) => {
			// Click
			navItem.addEventListener( 'click', () => {
				const index = parseInt( navItem.dataset.tabIndex, 10 );
				activateTab( navItems, panels, index );
				navItem.focus();
			} );
 
			// Keyboard: Enter / Space activate; Arrow keys move focus
			navItem.addEventListener( 'keydown', ( e ) => {
				const index = parseInt( navItem.dataset.tabIndex, 10 );
 
				if ( e.key === 'Enter' || e.key === ' ' ) {
					e.preventDefault();
					activateTab( navItems, panels, index );
				}
 
				if ( e.key === 'ArrowRight' || e.key === 'ArrowDown' ) {
					e.preventDefault();
					const next = navItems[ ( index + 1 ) % navItems.length ];
					next.focus();
				}
 
				if ( e.key === 'ArrowLeft' || e.key === 'ArrowUp' ) {
					e.preventDefault();
					const prev = navItems[ ( index - 1 + navItems.length ) % navItems.length ];
					prev.focus();
				}
 
				if ( e.key === 'Home' ) {
					e.preventDefault();
					navItems[ 0 ].focus();
				}
 
				if ( e.key === 'End' ) {
					e.preventDefault();
					navItems[ navItems.length - 1 ].focus();
				}
			} );
		} );
	} );
} );