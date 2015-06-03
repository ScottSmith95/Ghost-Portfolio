docReady( function() {
  var grid = document.querySelector('.site-content');

  var msnry = new Masonry( grid, {
    itemSelector: '.post',
    transitionDuration: 0
  });

  imagesLoaded( grid, function() {
    // layout Masonry after each image loads
    msnry.layout();
  });

});