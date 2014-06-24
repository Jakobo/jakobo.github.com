var gulp = require('gulp');

// util
var filter = require('gulp-filter');
var order = require('gulp-order');
var tap = require('gulp-tap');
var toBuffer = require('gulp-buffer');

// all types
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// css
var less = require('gulp-less');
var cssMin = require('gulp-cssmin');

// js
var browserify = require('browserify');
var uglify = require('gulp-uglify');

// TASKS ==================================================
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
    .pipe(concat('all.css'))
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
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./js'));
});
