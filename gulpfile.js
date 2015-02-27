var gulp = require('gulp');
var fs = require('fs');
var rimraf = require('rimraf');
var _ = require('lodash');

// JS
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

// Source Streams, File Transforms, etc
var source = require('vinyl-source-stream');

// Server
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// configuration
var bundler;
var config = {
  js: {
    entryFile: './_js/app.js',
    outputDir: './js/',
    outputFile: 'app.js'
  }
};

// bundler is a watchify wrapped browserify instance
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.js.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.js.outputDir, cb);
});

// the meta-build task
gulp.task("build-all", ["js"]);

// js from a single entry point using browserify
gulp.task('js', ['clean'], function() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.js.outputFile))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(reload({ stream: true }));
});

// build will exit on complete
gulp.task('build', ['build-all'], function() {
  process.exit(0);
});

// watch starts a browser sync and retriggers builds
gulp.task('watch', ['build-all'], function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  getBundler().on('update', function() {
    gulp.start('build-all')
  });
});

// web server with no builds
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
