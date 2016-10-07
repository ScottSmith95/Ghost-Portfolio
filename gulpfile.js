var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles: ['assets/styles/*.css'],
	indexScripts: ['node_modules/imagesloaded/imagesloaded.pkgd.js', 'node_modules/masonry-layout/dist/masonry.pkgd.js', 'assets/scripts/portfolio.js'],
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

gulp.task(function indexScripts() {
	return gulp.src(paths.indexScripts)
		.pipe(sourcemaps.init())
			.pipe(concat('portfolio.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/scripts/build/'));
});

gulp.task(function watch() {
	gulp.watch(paths.styles, gulp.series('styles'));
	gulp.watch(paths.indexScripts, gulp.series('indexScripts'));
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', gulp.parallel('styles', 'indexScripts', 'watch', function(done) {
	done();
}));

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', gulp.parallel('styles', 'indexScripts', function(done) {
	done();
}));