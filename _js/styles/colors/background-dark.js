var rgb = require("../util/now").rgb;
var chromath = require("chromath");

module.exports = {
  backgroundColor: chromath.darken(rgb, 0.5).toRGBString()
};
