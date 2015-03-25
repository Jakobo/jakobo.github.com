var rgb = require("./now").rgb;
var chromath = require("chromath");

module.exports = {
  backgroundColor: chromath.darken(rgb, 0.7).toRGBString()
};
