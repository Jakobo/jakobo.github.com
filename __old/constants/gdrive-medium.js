var keyMirror = require("react/lib/keyMirror");

var width = "__WIDTH__";
var height = "__HEIGHT__";

module.exports = Object.assign({},
{
  WIDTH_TOKEN: width,
  HEIGHT_TOKEN: height,
  GENERIC_IMAGE: "https://d262ilb51hltx0.cloudfront.net/fit/c/600/200/1*5kLUGuMkF6oR_5bI2qS-aQ.jpeg",
  DYNAMIC_IMAGE: {
    find: /\/fit\/c\/[\d]+\/[\d]+\//,
    replaceWith: "/fit/c/" + width + "/" + height + "/"
  },
  OVERLAY_COLOR: "rgba(0, 0, 0, 0.8)",
  TEXT_COLOR: "#FAFAFA",
  CITE_COLOR: "#C4C4C4"
},
keyMirror({
  LOAD_MEDIUM: null,
  CHANGE_MEDIUM: null
}));
