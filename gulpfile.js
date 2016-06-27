var gulp = require('gulp'); // npm install gulp
var sass = require('gulp-sass'); // npm install gulp-sass
var minify = require('gulp-minify'); // npm install gulp-minify
var htmlmin = require('gulp-htmlmin'); //// npm install gulp-htmlmin
// var concat = require('gulp-concat');
var babel = require('gulp-babel'); // npm install gulp-babel babel-preset-es2015
var beautify = require('gulp-jsbeautify'); // npm install gulp-jsbeautify
var browserify = require('gulp-browserify') // npm install gulp-browserify
// VALIDATORS
// var validate = require('gulp-w3c-css');
// var htmlhint = require('gulp-htmlhint');
// var jsValidate = require('gulp-jsvalidate');

// SPECIFYING DEPENDENCIES
// gulp.task('default',['html', 'css', 'js'])
gulp.task('default', ['html', 'css', 'js'])

// SASS TO CSS
gulp.task('css', function (){
  gulp.src('./sass/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public'))
  // .pipe(validate())
  // .pipe(gulp.dest('./temp'));
});

// MINIFY
gulp.task('html', function(){
  gulp.src('./index.html')
    // .pipe(htmlhint())
    // .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('./public'))
});

//JS
gulp.task('js', function(){
  gulp.src('./js/app.js')
    // .pipe(jsValidate())
    // .pipe(concat('./js/app.js'))
    .pipe(babel({
      presets: ['es2015']
      }))
    .pipe(browserify())
    .pipe(beautify({indent_Size: 2}))
    .pipe(gulp.dest('./public'))
});

// WATCH CHANGES
gulp.task('watch', function(){ //npm install gulp-watch
  gulp.watch('./sass/*.scss', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/app.js', ['js']);
});
