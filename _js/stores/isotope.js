"use strict";

// Isotope Store is a pass-through store with no data

var EventEmitter = require("events").EventEmitter;
var Browser = require("../dispatchers/browser");
var IsotopeConstants = require("../constants/isotope");

var IsotopeStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(IsotopeConstants.ISOTOPE_REDRAW);
  },
  addChangeListener: function(callback) {
    this.on(IsotopeConstants.ISOTOPE_REDRAW, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(IsotopeConstants.ISOTOPE_REDRAW, callback);
  },

  dispatcherIndex: Browser.register(function(payload) {
    // do what you need to do with payload and payload.action
    // update your data
    // call the emitChange() function when done
    switch (payload.action.actionType) {
      case IsotopeConstants.ISOTOPE_REDRAW:
        IsotopeStore.emitChange();
        break;
      default:
        return true;
    }
    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = IsotopeStore;
