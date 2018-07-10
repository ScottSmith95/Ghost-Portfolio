const layoutTrigger = document.querySelector( '.secondary-items h2' );
const layout        = document.querySelector( '#secondary-items-container' );

function toggleLayout() {
	layout.classList.toggle( 'grid' );
	layout.classList.toggle( 'scroll-well' );
	layoutTrigger.classList.toggle( 'active' );
}

layoutTrigger.addEventListener( 'click', toggleLayout );

/* Open by default if viewport width is wide in load. */
if ( document.body.clientWidth > 720 ) {
	layoutTrigger.classList.add( 'active' );
	layout.classList.add( 'grid' );
	layout.classList.remove( 'scroll-well' );
}