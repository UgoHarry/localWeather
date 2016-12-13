var gulp = require ('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var del = require('del');

var $ = gulpLoadPlugins();

/*****************TASKS******************/

//COMPILING SASS TO CSS
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe($.plumber())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
      stream:true
  }));
});


//LIVE RELOADING USING BROWSERSYNC
gulp.task('browserSync', function () {
    browserSync.init({
        server : {
            baseDir: 'app'
        }
    });
});



gulp.task('watch', function() {
    runSequence('browserSync', 'sass', function () {
        gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/js/**.*.js', browserSync.reload);
    });
    //ADD OTHER WATCH TASKS
});


//LOADING SCRIPTS INTO DIST PAGE
gulp.task('useref', function() {
    return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.uglifycss({
        "maxLineLen" : 80,
        "uglyComments": true
    })))
    .pipe(gulp.dest('dist'));
});


//LOAD BOWER FILES INTO DIST FILES
gulp.task('bower', function () {
    gulp.src ('dist/index.html')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist')); //TODO: Where do I add this
});

//CLEANING THE DIST FOLDER
gulp.task('clean:dist', function() {
    del.sync('dist');
});

//BUILD OPTIMISED FILES
gulp.task ('build', function() {
    runSequence('clean:dist', ['sass', 'useref'], 'bower', function() {
        console.log('Building files...');
    });
});
