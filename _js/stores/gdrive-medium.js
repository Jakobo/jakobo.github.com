/*
TODO someday
- use a setInterval to query for new information on a semi-regular basis
*/

var EventEmitter = require("events").EventEmitter;
var Browser = require("../dispatchers/browser");
var gdrive = require("../common/gdrive");
var MedConstants = require("../constants/gdrive-medium");

var _activity = {};

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
        }
        else {
          row.id = ++rowId;
          _lookup[row.link] = row.id;
        }
      }
      _activity[key].data.push(row);
    });
    _activity[key].pending = false;
    _activity[key].loaded = true;

    MedStore.emitChange();
  });
}

var MedStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(MedConstants.CHANGE_MEDIUM);
  },
  addChangeListener: function(callback) {
    this.on(MedConstants.CHANGE_MEDIUM, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(MedConstants.CHANGE_MEDIUM, callback);
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
    switch(payload.action.actionType) {
      case MedConstants.LOAD_MEDIUM:
        loadData(payload.action.data);
        break;
      default:
        return true;
    }
    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = MedStore;
