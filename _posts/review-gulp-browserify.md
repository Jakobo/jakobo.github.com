---
published: false
layout: post
permalink: /article/gulp-and-browserify
title: A recipe for gulp and browserify
---

If you've tried [gulp](http://gulpjs.com/), you've probably also tried [browserify](http://browserify.org/). This also means you googled for "gulp browserify" and were led to the gulp-browserify plugin on npm. I haven't linked to it because the gulp team has ruled the blacklisted that plugin on the basis it is redundant. Instead, the current consensus is a [recipe leveraging vinyl](https://github.com/gulpjs/gulp/issues/369), the underlying virtual file system in gulp. While I think that's technically correct, it requires intimate knowledge of browserify, streams, and the vinyl system. I think we can do better.

## The Code
Let's start with the code and work backwards.

```js
var gulp = require('gulp');
var tap = require('gulp-tap');
var toBuffer = require('gulp-buffer');
gulp.task('js', function() {
  return gulp.src('**/*.js')
    .pipe(tap(function(file) {
      var bundler = browserify({
        entries: [file.path]
      });
      return bundler.bundle();
    }))
    .pipe(toBuffer())
    .pipe('...')
    .pipe(gulp.dest('output_dir/'));
})
```

We are going to need two modules for this recipe, both of which are general purpose gulp utilities you way want to use again and again after you learn how powerful they are.

## gulp-tap
[gulp-tap](https://www.npmjs.org/package/gulp-tap) (npm) is a swiss army knife in the gulp world. It's purpose is to expose the file in the middle of the pipeline, allowing you to call whatever custom transformations you may need. The signature for the gulp-tap configuration takes two parameters. The first is the file object (vinyl-fs) and contains `file.contents`, `file.path`, etc. The second is an instance of the `through2` module in case you need it.

Return a buffer, return a stream, or modify `file.contents` and you're done. Even operations that don't normally return streams or buffers are automatically moved into a buffer for compatibility with the next step on the gulp pipeline.

As a caveat, it should be noted that since you are leaving the stream/buffer world during your gulp-tap operation, it will be slower than if you had a pure solution. However, the DRY is so high and it opens up the entire world of npm modules for you leverage.

## gulp-buffer and gulp-stream
Not all gulp plugins are stream ready. Because of their design, they might be operating on buffer objects instead. This is most common with plugins that are calling out to external commands or require the evaluation of the entire file in order to perform a task. gulp allows these utilities to decline handling streams by throwing an exception. Enter [gulp-buffer](https://www.npmjs.org/package/gulp-buffer) and [gulp-stream](https://www.npmjs.org/package/gulp-stream) (npm), taking in either buffers or streams and returning a buffer or stream for the next step of the pipeline.

In our above code, browserify provides a stream, but uglify only operates on a buffer. Piping through gulp-buffer solves this problem.

## The "gulp way"
The most successful gulp pipelines are those built with small modular components. Per the gulp team's recommendation, plugins shouldn't be created when there is already a node module that accomplishes your goal. Thanks to utilities like gulp-tap, gulp-buffer, and gulp-stream, you can make the entire npm ecosystem gulp friendly.
