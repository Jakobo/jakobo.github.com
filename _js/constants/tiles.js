var keyMirror = require("react/lib/keyMirror");

module.exports = Object.assign({}, {
  // when the number of tiles change based on width
  maxTileWidth: 300 // we don't have image support larger 3x this
},
keyMirror({
  // modes
  TILE_PORTRAIT: null,
  TILE_LANDSCAPE: null,

  // events
  CHANGE_TILE_LAYOUT: null,
  RECALCULATE_TILES: null
}));
