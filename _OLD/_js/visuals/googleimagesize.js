var $ = require('jquery');

module.exports = function($el, opts) {
  // in: https://lh5.googleusercontent.com/-.../TuFVzz8ryNI/AAAAAAAAAjg/.../s200/screenshot_01.jpg
  // convert that /s200/ to size of best fit
  var src = $el.attr("src"),
      $parent = $el.parents("p").eq(0),
      parentWidth = $parent.width(),
      pieces,
      golden = 1.61803,
      width = 0,
      factor = opts.factor || 0;

  if (factor) {
    width = Math.round(factor*parentWidth);
  }
  else {
    width = Math.round((parentWidth * golden) - parentWidth);
  }

  pieces = src.split("/");
  pieces[pieces.length - 2] = "s"+width;
  $el.attr("src", pieces.join("/"));
};
