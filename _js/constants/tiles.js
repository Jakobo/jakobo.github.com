var keyMirror = require("react/lib/keyMirror");

module.exports = Object.assign({}, {
  maxTileWidth: 300, // we don't have image support larger 3x this
  tileBorder: 5
},
keyMirror({
  // modes
  TILE_PORTRAIT: null,
  TILE_LANDSCAPE: null,

  // events
  CHANGE_TILE_LAYOUT: null,
  RECALCULATE_TILES: null
}));
