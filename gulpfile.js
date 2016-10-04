var gulp = require ('gulp');
var uglify = require ('gulp-uglify');

gulp.task('default', function(){
  gulp.src('js/*.js').pipe(uglify());
});


//CONCATENATE JS FILES

//CONCATENATE STYLESHEETS

//MINIFY FILES

//SAVE MINIFIED FILES IN A .min EXTENSION IN A DIFFERENT DIRECTORY
