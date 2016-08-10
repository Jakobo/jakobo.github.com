var keyMirror = require("react/lib/keyMirror");

module.exports = Object.assign({},
{
  OVERLAY_COLOR: "rgba(0, 0, 0, 0.8)",
  TEXT_COLOR: "#FAFAFA",
  SOURCE_COLOR: "#C4C4C4"
},
keyMirror({
  LOAD_PINTEREST: null,
  CHANGE_PINTEREST: null
}));
