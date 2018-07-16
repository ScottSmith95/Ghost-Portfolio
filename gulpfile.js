'use strict';

const gulp       = require('gulp');
const postcss    = require('gulp-postcss');
// Use uglify-es minifier with gulp-uglify for ES2015 support.
const composer   = require('gulp-uglify/composer');
const uglifyes   = require('uglify-es');
const minify     = composer(uglifyes, console);
const sourcemaps = require('gulp-sourcemaps');

const paths = {
	styles: {
		src: 'assets/styles/portfolio.css',
		dest: 'assets/styles/build/',
		watch: 'assets/styles/*.css'
	},
	scripts: {
		src: 'assets/scripts/*.js',
		dest: 'assets/scripts/build/'
	}
};

const processors = [
	require('postcss-import'),
	require('postcss-nested'),
	require('postcss-custom-properties'),
	require('postcss-normalize')({forceImport: true}),
	require('css-mqpacker')({sort: true}),
	require('autoprefixer'),
	require('cssnano')({preset: 'default'})
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
			.pipe(minify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.scripts.src, scripts);
}

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
const defaultTask = gulp.parallel(styles, scripts, watch);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For const.
const buildTask = gulp.parallel(styles, scripts);

// Exports
// Externalise individual tasks.
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

// Externalise Workflows.
exports.build = buildTask;
exports.default = defaultTask;