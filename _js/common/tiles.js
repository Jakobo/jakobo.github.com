var outerStyles = require("../styles/tiles/outer");
var innerStyles = require("../styles/tiles/inner");
var border = require("../constants/tiles").tileBorder;

function trbl(w, unit) {
  return [
    Math.floor(w / 2),
    0,
    0,
    Math.floor(w / 2)
  ].join(unit + " ") + unit;
}

function css(size, width, height) {
  var actualWidth = width * size;
  var actualHeight = height * size;

  var styles = {
    tile: Object.assign({}, outerStyles, {
      width: actualWidth + "px",
      height: actualHeight + "px"
    }),
    inner: Object.assign({}, innerStyles, {
      width: (actualWidth - border) + "px",
      height: (actualHeight - border) + "px",
      margin: trbl(border, "px")
    })
  }
  return styles;
}

module.exports.css = css;
