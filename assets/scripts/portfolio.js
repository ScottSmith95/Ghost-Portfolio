document.addEventListener( "DOMContentLoaded", function() {
	
	var elem = document.querySelector('.content');
	
	// Setup Masonry.
	var msnry = new Masonry( elem, {
		itemSelector: '.post',
		transitionDuration: 0
	});
	
	imagesLoaded( elem ).on( 'progress', function() {
		// Layout Masonry after each image loads.
		msnry.layout();
	});

});

