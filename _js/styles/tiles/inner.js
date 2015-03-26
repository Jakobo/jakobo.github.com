var widths = require("./widths");

function trbl(w, unit) {
  return [
    Math.floor(w / 2),
    0,
    0,
    Math.floor(w / 2)
  ].join(unit + " ") + unit;
}

module.exports = {
  width: "100%",
  height: "100%",
  margin: trbl(widths.border, "px"),
  display: "block",
  position: "relative",
  overflow: "hidden"
};
