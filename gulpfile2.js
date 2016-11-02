var gulp = require ('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();



/*****************TASKS******************/

//COMPILING SASS TO CSS
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe($.plumber())
  .pipe($.sass.on('error', sass.logError))
  .pipe(gulp.dest('app/css'));
});




//BROWSER RELOADING
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});


//COMBINING SASS AND RELOAD FUNCTION INTO A WATCH TASK
gulp.task('watch', ['sass', 'browserSync'], function() {
  gulp.watch('app.scss/**/*/scss', ['sass']);
});
