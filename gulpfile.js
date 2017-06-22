'use strict';

var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles: {
		src: 'assets/styles/portfolio.css',
		dest: 'assets/styles/build/',
		watch: 'assets/styles/*.css'
	},
	scripts: {
		src: 'assets/scipts/*.js',
		dest: 'assets/scripts/build/'
	}
};

var processors = [
	require('postcss-import'),
	require('postcss-nested'),
	require('postcss-custom-properties'),
	require('css-mqpacker')({sort: true}),
	require('autoprefixer'),
	require('cssnano')({autoprefixer: false})
];

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(sourcemaps.init())
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.scripts.src, scripts);
}

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
var defaultTask = gulp.parallel(styles, scripts, watch);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
var buildTask = gulp.parallel(styles, scripts);

// Exports
// Externalise individual tasks.
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

// Externalise Workflows.
exports.build = buildTask;
exports.default = defaultTask;