var IS_PRODUCTION = true;

var gulp = require("gulp");
var fs = require("fs");
var rimraf = require("rimraf");

// JS
var browserify = require("browserify");
var babelify = require("babelify");
var brfs = require("brfs");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");

// CSS
var sass = require("gulp-sass");
var minifyCSS = require('gulp-minify-css')

// Source Streams, File Transforms, etc
var source = require("vinyl-source-stream");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var streamProxy = require("gulp-streamify");
var iff = require("gulp-if");
var add = require("gulp-add-src");
var concat = require("gulp-concat");

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

// the meta-build tasks
gulp.task("build-all", ["js", "css"]);
gulp.task("css", ["sass", "fonts"]);
gulp.task("sass", ["main-sass", "slides-sass"])
gulp.task("fonts", ["octicons", "font-awesome"])
gulp.task("lint", ["eslint"]);

// js from a single entry point using browserify
gulp.task("js", ["cleanJS", "eslint"], function() {
  return browserify("./_js/app.js")
    .transform(babelify)
    .transform(brfs)
    .bundle()
    .pipe(plumber())
    .pipe(source("app.js"))
    .pipe(iff(IS_PRODUCTION, streamProxy(uglify())))
    .pipe(gulp.dest("./js"))
    .pipe(reload({ stream: true }));
});

gulp.task("main-sass", ["cleanCSS"], function() {
  return gulp.src("./_sass/slides.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat("slides.css"))
    .pipe(iff(IS_PRODUCTION, minifyCSS()))
    .pipe(gulp.dest("./css"))
    .pipe(reload({ stream: true }));
});

gulp.task("slides-sass", ["cleanCSS"], function() {
  return gulp.src("./_sass/app.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(add("./_vendor/github-octicons/octicons.css"))
    .pipe(concat("app.css"))
    .pipe(iff(IS_PRODUCTION, minifyCSS()))
    .pipe(gulp.dest("./css"))
    .pipe(reload({ stream: true }));
});

gulp.task("octicons", ["sass"], function() {
  return gulp.src("./_vendor/github-octicons/octicons.+(ttf|eot|svg|woff|woff2|otf)")
    .pipe(gulp.dest("./css"));
});

gulp.task("font-awesome", ["sass"], function() {
  // the destination needs to be reflected in $fa-font-path of app.scss
  return gulp.src("./_vendor/font-awesome/fonts/*+(ttf|eot|svg|woff|woff2|otf)")
    .pipe(gulp.dest("./css/fa"));
});

gulp.task("eslint", function() {
  return gulp.src(["_js/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.formatEach("stylish", process.stderr))
        .pipe(iff(IS_PRODUCTION, eslint.failOnError()));
});

// build will exit on complete
gulp.task("build", ["build-all"], function() {
  process.exit(0);
});

// run a standalone server (useful for a final verification of a build)
gulp.task("server", function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

// watch starts a browser sync and retriggers builds
gulp.task("watch", function() {
  watch("_js/**/*", function() {
    gulp.start("js");
  });

  watch("_sass/**/*", function() {
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
