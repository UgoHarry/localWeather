var gulp = require ('gulp');
var gulpLoadPlugins = require ('gulp-load-plugins');
var browserSync = require ('browser-sync');
var wiredep = require ('wiredep').stream;
var runSequence = require ('run-sequence');
var del = require ('del');

var $ = gulpLoadPlugins();


/*************PATHS***************/

var jsFiles = 'app/js/*.js';
var jsDest = 'dist/scripts';
var cssFiles = 'app/styles/css/*.css';
var scssFiles = 'app/styles/scss/*.scss';
var cssDest = 'dist/styles';



/*************TASKS***************/

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
  .pipe(gulp.dest('app/styles/css'));
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
  gulp.src('app/index.html')
  .pipe(wiredep())
  .pipe(gulp.dest('dist'));
});

//inject styles and scripts
gulp.task('inject', function() {
  var target = gulp.src('dist/index.html');
  var source = gulp.src(['dist/scripts/*.js', 'dist/styles/*.css']);
  target.pipe($.inject(source))
  .pipe(gulp.dest('dist'));
});

//clean out redundant file and directories
gulp.task('clean', del.bind(null, ['dist/scripts/*.js', 'dist/styles/*.css']));


//serve task
gulp.task('serve', function (){
  runSequence('clean', 'bower', 'sass', 'scripts', 'styles', 'bower',function(){
    browserSync({
      port: 3005,
      server: {
        baseDir: 'dist',
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });
  });
});


//default gulp task
gulp.task('default', function(){
  gulp.src('app/js/*.js').
  pipe(uglify());
});
