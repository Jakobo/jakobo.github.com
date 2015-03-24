var EventEmitter = require("events").EventEmitter;
var Browser = require("../dispatchers/browser");
var tileConstants = require("../constants/tiles");

var _data = {
  width: 0,
  height: 0,
  orientation: tileConstants.TILE_PORTRAIT,
  percent: 0
};

function recalculate() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var percentage = 100;

  // no change
  if (_data.height == height && _data.width == width) {
    return;
  }

  // change in dimensions
  _data.width = width;
  _data.height = height;
  _data.orientation = (width > height) ? tileConstants.TILE_LANDSCAPE : tileConstants.TILE_PORTRAIT;

  // now, starting at 100 (percent) of width, begin figuring out what percent
  // of the width will
}

var tileLayoutStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(tileConstants.CHANGE_TILE_LAYOUT);
  },
  addChangeListener: function(callback) {
    this.on(tileConstants.CHANGE_TILE_LAYOUT, callback);
  },
  removeChangeListener: function(callback) {
    this.tileConstants(x500pxConstants.CHANGE_TILE_LAYOUT, callback);
  },
  get: function() {
    return _data;
  },

  dispatcherIndex: Browser.register(function(payload) {
    // do what you need to do with payload and payload.action
    // update your data
    // call the emitChange() function when done
    switch(payload.action.actionType) {
      case tileConstants.RECALCULATE_TILES:
        recalculate();
        break;
      default:
        return true;
    }
    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = tileLayoutStore;
