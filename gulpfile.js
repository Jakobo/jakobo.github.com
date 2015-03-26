var IS_PRODUCTION = true;

var gulp = require("gulp");
var fs = require("fs");
var rimraf = require("rimraf");

// JS
var browserify = require("browserify");
var babelify = require("babelify");
var uglify = require("gulp-uglify");

// CSS
var sass = require("gulp-sass");
var minifyCSS = require('gulp-minify-css')

// Source Streams, File Transforms, etc
var source = require("vinyl-source-stream");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var streamProxy = require("gulp-streamify");
var iff = require("gulp-if");

// Server
var browserSync = require("browser-sync");
var reload = browserSync.reload;

// clean the output directory
gulp.task("cleanJS", function(cb){
  rimraf("./js", cb);
});

gulp.task("cleanCSS", function(cb) {
  rimraf("./css", cb);
});

// the meta-build task
gulp.task("build-all", ["js", "css"]);

// js from a single entry point using browserify
gulp.task("js", ["cleanJS"], function() {
  return browserify("./_js/app.js")
    .transform(babelify)
    .bundle()
    .pipe(plumber())
    .pipe(source("app.js"))
    .pipe(iff(IS_PRODUCTION, streamProxy(uglify())))
    .pipe(gulp.dest("./js"))
    .pipe(reload({ stream: true }));
});

gulp.task("css", ["cleanCSS"], function() {
  return gulp.src("./_sass/app.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest("./css"))
});

// build will exit on complete
gulp.task("build", ["build-all"], function() {
  process.exit(0);
});

// watch starts a browser sync and retriggers builds
gulp.task("watch", function() {
  watch("_js/**/*", function() {
    gulp.start("js");
  });

  watch("_scss/**/*", function() {
    gulp.start("css");
  });

  // TODO: this goes away once gulp4 is out and will require a rethink
  IS_PRODUCTION = false;
  gulp.start("build-all");

  browserSync({
    server: {
      baseDir: './'
    }
  });
});
