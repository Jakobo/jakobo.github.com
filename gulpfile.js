var gulp = require("gulp");
var fs = require("fs");
var rimraf = require("rimraf");

// JS
var browserify = require("browserify");
var babelify = require("babelify");

// Source Streams, File Transforms, etc
var source = require("vinyl-source-stream");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var batch = require("gulp-batch");

// Server
var browserSync = require("browser-sync");
var reload = browserSync.reload;

// clean the output directory
gulp.task("cleanJS", function(cb){
  rimraf("./js", cb);
});

// the meta-build task
gulp.task("build-all", ["js"]);

// js from a single entry point using browserify
gulp.task("js", ["cleanJS"], function() {
  return browserify("./_js/app.js")
    .transform(babelify)
    .bundle()
    .pipe(plumber())
    .pipe(source("app.js"))
    .pipe(gulp.dest("./js"))
    .pipe(reload({ stream: true }));
});

// build will exit on complete
gulp.task("build", ["build-all"], function() {
  process.exit(0);
});

// watch starts a browser sync and retriggers builds
gulp.task("watch", ["build-all"], function() {
  watch("_js/**/*", function() {
    gulp.start("js");
  });

  browserSync({
    server: {
      baseDir: './'
    }
  });
});
