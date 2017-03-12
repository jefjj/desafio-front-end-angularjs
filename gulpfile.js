var gulp   = require('gulp'),
	cssmin = require('gulp-cssmin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', ['compressCss', 'compressJs']);

gulp.task('compressCss', function (cb) {
	return gulp.src([
		'htdocs/assets/style/dlmenu.css',
		'htdocs/assets/style/style.css'
	])
    .pipe(concat('all.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('htdocs/assets/style/'));
});

gulp.task('compressJs', function (cb) {
	return gulp.src([
		'htdocs/assets/script/jquery.dlmenu.js',
		'htdocs/assets/script/app.js'
	])
    .pipe(concat('all.min.js'))
	.pipe(uglify({mangle:false}))
    .pipe(gulp.dest('htdocs/assets/script/'));
});
