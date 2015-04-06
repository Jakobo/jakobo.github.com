var keyMirror = require("react/lib/keyMirror");

module.exports = Object.assign({}, {
  landscape: {
    maxTileWidth: 300,
    minTileWidth: 200
  },
  portrait: {
    maxTileWidth: 300,
    minTileWidth: 175
  },
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
