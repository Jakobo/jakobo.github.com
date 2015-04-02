// given a color, find the overlay

var Chromath = require("chromath");
var BLACK = 0.87;
var CONTRAST_RATIO = 4.5;
var MIDPOINT_GREY = 127;

module.exports = function(x) {
  var color = new Chromath(x);

  var grey = Chromath.desaturate(color).toRGBObject().r;
  var adjust = (grey > MIDPOINT_GREY) ? Chromath.darken : Chromath.lighten;

  var altColor = adjust(color, BLACK);
  var altGrey = Chromath.desaturate(altColor).toRGBObject().r;
  var ratio = (altGrey > grey) ? altGrey / grey : grey / altGrey;

  var percent = 0.01;
  var shiftBy = 0.01;

  if (ratio < CONTRAST_RATIO) {
    // begin shifting the original color away from the grey midpoint
    adjust = (grey > MIDPOINT_GREY) ? Chromath.lighten : Chromath.darken;
    do {
      color = adjust(color, shiftBy);
      grey = Chromath.desaturate(color).toRGBObject().r;
      ratio = (altGrey > grey) ? altGrey / grey : grey / altGrey;
      shiftBy += percent;
    } while(shiftBy <= 1 && ratio <= CONTRAST_RATIO);
  }

  if (ratio < 4.5) {
    // never got a contrast ratio. Default to Black and white.
    color = "#000000";
    altColor = "#FFFFFF";
  }

  return {
    color: (new Chromath(color)).toHexString(),
    alt: (new Chromath(altColor)).toHexString()
  };
};
