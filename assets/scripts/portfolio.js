docReady( function() {
	
	var grid = document.querySelector('.site-content');
	
	// Setup Masonry.
	var msnry = new Masonry( grid, {
		itemSelector: '.post',
		transitionDuration: 0
	});
	
	imagesLoaded( grid, function() {
		// Layout Masonry after each image loads.
		msnry.layout();
	});

});