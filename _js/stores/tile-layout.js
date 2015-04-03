var EventEmitter = require("events").EventEmitter;
var Browser = require("../dispatchers/browser");
var tileConstants = require("../constants/tiles");
var $ = require("jquery");
var debounce = require("lodash.debounce");

var _data = {
  viewportWidth: 0,
  viewportHeight: 0,
  orientation: tileConstants.TILE_PORTRAIT,
  percent: 0,
  px: 0
};

function recalculate() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var percentage = 100;

  // no change
  if (_data.viewportHeight == height && _data.viewportWidth == width) {
    return;
  }

  // change in dimensions
  _data.viewportWidth = width;
  _data.viewportHeight = height;
  _data.orientation = (width > height) ? tileConstants.TILE_LANDSCAPE : tileConstants.TILE_PORTRAIT;

  // now, starting at 100 (percent) of width, begin figuring out what percent
  // of the width will fit that is also an easily divisible percentage
  while ((width * (percentage / 100) > tileConstants.maxTileWidth) || (100 % percentage !== 0)) {
    percentage -= 0.25;
  }

  if (percentage === 0) {
    percentage = 1; // If nothing works, settle on 1%. That means you have an unfairly large screen
  }

  _data.px = Math.floor(width * (percentage / 100));
  _data.percent = percentage;

  tileLayoutStore.emitChange();
}

var debouncedRecalculate = debounce(function() {
  recalculate();
}, 100, {
  maxWait: 1000
});

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
    window.setTimeout(function() {
      recalculate();
    });
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

// recalculate on resize of the window or orientation change
// however, we don't want to gum up the event system by constantly
// measuring this.
$(window).on("resize", debouncedRecalculate);
$(window).on("orientationchange", debouncedRecalculate);

// tileStore is heavily subscribed to and requires an increase in the number of
// listeners it supports
tileLayoutStore.setMaxListeners(100);

module.exports = tileLayoutStore;
