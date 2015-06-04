var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles: 'assets/styles/*.css',
	scripts: ['node_modules/imagesloaded/imagesloaded.pkgd.js', 'node_modules/masonry-layout/dist/masonry.pkgd.js', 'assets/scripts/portfolio.js'],
};

gulp.task('styles', function() {
	var processors = [
		require('postcss-import'),
		require('postcss-nested'),
		require('postcss-simple-vars'),
		require('css-mqpacker'),
		require('autoprefixer-core')('last 2 versions', '> 1%', 'ie 9', 'ie 8', 'Firefox ESR'),
		require('csswring')
    ];
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/styles/build/'));
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(concat('portfolio.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/scripts/build/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.scripts, ['scripts']);
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', ['styles', 'scripts', 'watch']);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', ['styles', 'scripts']);