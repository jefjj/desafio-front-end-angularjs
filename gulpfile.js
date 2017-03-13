var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
//var sass        = require('gulp-sass');
var cssmin 		= require('gulp-cssmin');
var concat 		= require('gulp-concat');
var uglify      = require('gulp-uglify');
//var copy 		= require('gulp-copy');

// Static Server + watching scss/html files
gulp.task('serve', ['tplCopy', 'compressCss', 'compressComponents', 'compressAngular'], function() {

    browserSync.init({
        server: "./htdocs"
    });

    gulp.watch("src/css/*.css", ['compressCss']);
    gulp.watch("src/js/components/*.js", ['compressComponents']);
    gulp.watch("src/js/angular/app.js", ['compressAngular']);
    gulp.watch("src/js/angular/**/*.js", ['compressAngular']);
    gulp.watch("src/js/angular/template/*.html", ['tplCopy']).on('change', browserSync.reload);
    gulp.watch("htdocs/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
/*gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});*/

gulp.task('compressCss', function (cb) {
	return gulp.src([
    		'node_modules/bootstrap/dist/css/bootstrap.min.css',
    		'src/css/dlmenu.css',
    		'src/css/style.css'
    	])
        .pipe(concat('all.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('htdocs/assets/style/'))
        .pipe(browserSync.stream());
});

gulp.task('compressComponents', function (cb) {
	return gulp.src([
    		'node_modules/jquery/dist/jquery.min.js',
    		'node_modules/bootstrap/dist/js/bootstrap.min.js',
    		'node_modules/angular/angular.min.js',
    		'src/js/components/jquery.dlmenu.js',
    	])
        .pipe(concat('components.min.js'))
    	.pipe(uglify({mangle:false}))
        .pipe(gulp.dest('htdocs/assets/script/'))
        .pipe(browserSync.stream());
});

gulp.task('compressAngular', function (cb) {
	return gulp.src([
    		'src/js/angular/app.js',
    		'src/js/angular/**/*.js'
    	])
        .pipe(concat('angular.min.js'))
    	.pipe(uglify({mangle:false}))
        .pipe(gulp.dest('htdocs/assets/script/'))
        .pipe(browserSync.stream());
});

gulp.task('tplCopy', function (cb) {
    return gulp.src([
            'src/js/angular/template/*.html'
        ])
        .pipe(gulp.dest('htdocs/assets/template/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);