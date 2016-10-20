var gulp = require ('gulp');
var gulpLoadPlugins = require ('gulp-load-plugins');
var browserSync = require ('browser-sync');
var wiredep = require ('wiredep').stream;
var uglify = require ('gulp-uglify');

var $ = gulpLoadPlugins();


//////////////PATHS/////////////
var jsFiles = 'js/*.js';
var jsDest = 'dist/scripts';
var cssFiles = 'styles/css/*.css';
var scssFiles = 'styles/scss/*.scss';
var cssDest = 'dist/styles';

//////////////TASKS/////////////

//concatenate and minify the scripts
gulp.task('scripts', function(){
  return gulp.src(jsFiles)
  .pipe($.plumber())
  .pipe($.concat('scripts.js'))
  .pipe($.rename('scripts.min.js'))
  .pipe($.uglify())
  .pipe(gulp.dest(jsDest));
});


//convert scss to css ad places them in the (source) css directory
gulp.task('sass', function() {
  return gulp.src(scssFiles)
  .pipe($.plumber())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest('styles/css'));
});

//join, minify and rename css files, then place in the 'dist' directory
gulp.task ('styles', function() {
  return gulp.src(cssFiles)
  .pipe($.plumber())
  .pipe($.concat('mainStyle.css'))
  .pipe($.uglifycss({
    "uglyComments": true
  }))
  .pipe($.rename('mainStyle.min.css'))
  .pipe(gulp.dest(cssDest));
});


//wiredep
gulp.task('bower', function() {
  gulp.src('index.html')
  .pipe(wiredep())
  .pipe(gulp.dest('dist'));
});





gulp.task('default', function(){
  gulp.src('js/*.js').
  pipe(uglify());
});
