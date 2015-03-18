var prefixes = {
  width: "tile__width--",
  height: "tile__height--"
};

function getTileClasses(width, height) {
  return [
    prefixes.width + width,
    prefixes.height + height
  ].join(" ");
}

module.exports.getTileClasses = getTileClasses;
