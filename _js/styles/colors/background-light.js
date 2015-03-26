var rgb = require("../util/now").rgb;
var chromath = require("chromath");

module.exports = {
  backgroundColor: chromath.lighten(rgb, 0.80).toRGBString()
};
