'use strict';

var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles: ['assets/styles/*.css']
};

gulp.task(function styles() {
	var processors = [
		require('postcss-import'),
		require('postcss-nested'),
		require('postcss-custom-properties'),
		require('css-mqpacker')({sort: true}),
		require('autoprefixer')('last 2 versions', '> 1%', 'ie 9', 'ie 8', 'Firefox ESR'),
		require('cssnano')({autoprefixer: false})
    ];
	return gulp.src('assets/styles/portfolio.css')
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/styles/build/'));
});

gulp.task(function watch() {
	gulp.watch(paths.styles, gulp.series('styles'));
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', gulp.parallel('styles', 'watch', function(done) {
	done();
}));

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', gulp.parallel('styles', function(done) {
	done();
}));