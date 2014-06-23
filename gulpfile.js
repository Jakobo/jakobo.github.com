var gulp = require('gulp');

var jekyll = require('gulp-jekyll');

var filter = require('gulp-filter');
var order = require('gulp-order');
var tap = require('gulp-tap');
var toBuffer = require('gulp-buffer');

var less = require('gulp-less');
var cssMin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var browserify = require('gulp-browserify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

gulp.task('default', ['css', 'js']);

gulp.task('css', function() {
  var lessFiles = filter('*.less');
  return gulp.src([
    './_css/*',
    './_less/*'
    ])
    .pipe(order([
      'reset*',
      '*'
    ]))
    .pipe(lessFiles)
    .pipe(less())
    .pipe(lessFiles.restore())
    .pipe(concat('_test_build.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('./css'))
});

gulp.task('js', function() {
  return gulp.src([
    './_js/index.js'
    ])
    .pipe(tap(function(file) {
      var bundler = (browserify)({entries: [file.path]});
      bundler.transform('brfs');
      file.contents = bundler.bundle();
    }))
    .pipe(toBuffer())
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename = '_test_' + path.basename
    }))
    .pipe(gulp.dest('./js'));
});