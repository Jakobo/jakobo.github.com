var EMISH = 0.06;
var MIN_SIZE = 16; // look, anything smaller than 16px for copy is mean

module.exports = function(px, width) {
  var sizer = function(ems, pad) {
    var size = Math.floor(((px * width) * EMISH) * ems);
    if (!pad && size < MIN_SIZE) {
      size = MIN_SIZE;
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
