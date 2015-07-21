"use strict";

var EventEmitter = require("events").EventEmitter;

var Browser = require("../dispatchers/browser");
var gdrive = require("../common/gdrive");
var PinterestConstants = require("../constants/gdrive-pinterest");

var _activity = {};
var pinterestStore;

// used to create a short numeric ID for a row based on its permalink
var _lookup = {};
var rowId = 0;

function loadData(key) {
  gdrive(key, function(err, results) {
    if (err) {
      console.warn(err);
      return;
    }

    // save data
    results.forEach(function(row) {
      if (!row.id) {
        if (_lookup[row.link]) {
          row.id = _lookup[row.link];
        } else {
          row.id = ++rowId;
          _lookup[row.link] = row.id;
        }
      }
      _activity[key].data.push(row);
    });
    _activity[key].pending = false;
    _activity[key].loaded = true;

    pinterestStore.emitChange();
  });
}

pinterestStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(PinterestConstants.CHANGE_PINTEREST);
  },
  addChangeListener: function(callback) {
    this.on(PinterestConstants.CHANGE_PINTEREST, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(PinterestConstants.CHANGE_PINTEREST, callback);
  },
  get: function(key) {
    if (!_activity[key]) {
      _activity[key] = {
        pending: false,
        loaded: false,
        data: []
      };
    }

    if (_activity[key].loaded || _activity[key].pending) {
      return _activity[key].data;
    }

    // go fetch the data, events will propogate it down to components
    _activity[key].pending = true;
    loadData(key);
    return _activity[key].data;
  },

  dispatcherIndex: Browser.register(function(payload) {
    // do what you need to do with payload and payload.action
    // update your data
    // call the emitChange() function when done
    switch (payload.action.actionType) {
      case PinterestConstants.LOAD_PINTEREST:
        loadData(payload.action.data);
        break;
      default:
        return true;
    }
    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = pinterestStore;
