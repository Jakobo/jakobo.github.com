var constants = require("../../constants/fonts");

module.exports = function(px, width) {
  var sizer = function(ems, pad) {
    var size = Math.floor(((px * width) * constants.EMISH) * ems);
    if (!pad && size < constants.MIN_SIZE) {
      size = constants.MIN_SIZE;
    }
    return size + "px";
  };
  sizer.many = function() {
    var args = [].slice.call(arguments, 0);
    var out = [];
    args.forEach(function(x) {
      out.push(sizer(x, true));
    });
    return out.join(" ");
  };
  return sizer;
};
