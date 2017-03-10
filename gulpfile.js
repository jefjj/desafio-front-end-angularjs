var gulp   = require('gulp'),
	cssmin = require('gulp-cssmin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	env    = require('minimist')(process.argv.slice(2)),
	gulpif = require('gulp-if');

gulp.task('default', ['compressCss', 'compressJs']);

gulp.task('compressCss', function (cb) {
	return gulp.src([
		'src/css/client-default.css'
	])
    .pipe(concat('all.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('compressComponents', function (cb) {
	return gulp.src([
		'src/js/components/angular-perfect-scrollbar.js'
	])
    .pipe(concat('ezoop-components.min.js'))
	.pipe(gulpif(env.p, uglify({mangle:false})))
    .pipe(gulp.dest('dist/js/'));
});
