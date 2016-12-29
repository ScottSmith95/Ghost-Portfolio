'use strict';

var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles: ['assets/styles/*.css'],
	scripts: ['assets/scipts/*.js']
};

gulp.task(function styles() {
	var processors = [
		require('postcss-import'),
		require('postcss-nested'),
		require('postcss-custom-properties'),
		require('css-mqpacker')({sort: true}),
		require('autoprefixer'),
		require('cssnano')({autoprefixer: false})
    ];
	return gulp.src('assets/styles/portfolio.css')
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/styles/build/'));
});

gulp.task(function scripts() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/scripts/build/'));
});

gulp.task(function watch() {
	gulp.watch(paths.styles, gulp.series('styles'));
	gulp.watch(paths.scripts, gulp.series('scripts'));
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', gulp.parallel('styles', 'scripts', 'watch', function(done) {
	done();
}));

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', gulp.parallel('styles', 'scripts', function(done) {
	done();
}));