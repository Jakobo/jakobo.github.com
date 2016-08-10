"use strict";

var EventEmitter = require("events").EventEmitter;
var Browser = require("../dispatchers/browser");
var gdrive = require("../common/gdrive");
var MedConstants = require("../constants/gdrive-medium");

var _activity = {};
var MedStore;

// used to create a short numeric ID for a row based on its permalink
var _lookup = {};
var rowId = 0;

// permament data items for medium under the "PERMANENT" feed collection
_activity.PERMANENT = {
  pending: false,
  loaded: true,
  data: [
    {
      id: ++rowId,
      commonName: "manifesto",
      date: "April 13, 2015 at 09:43PM",
      title: "A Manifesto",
      link: "https://medium.com/@jakob/a-manifesto-feee4fd6b689",
      snippet: ["\u003cdiv class\u003d\"medium-feed-item\"\u003e\u003cp class\u003d\"",
                "medium-feed-snippet\"\u003eEveryone loves a good manifesto.\u003c/p",
                "\u003e\u003cp class\u003d\"medium-feed-link\"\u003e\u003ca href\u003d\"",
                "https://medium.com/@jakob/a-manifesto-feee4fd6b689\"\u003eContinue ",
                "reading on Medium »\u003c/a\u003e\u003c/p\u003e\u003c/div\u003e"].join(""),
      publication: "Jakob Heuser on Medium",
      user: "https://medium.com/@jakob"
    }
  ]
};

function loadData(key) {
  if (_activity[key] && _activity[key].loaded) {
    return;
  }

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

    MedStore.emitChange();
  });
}

MedStore = Object.assign({}, EventEmitter.prototype, {
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
  getAt: function(feedKey, dataKey) {
    var data = this.get(feedKey);
    for (var i = 0, len = data.length; i < len; i++) {
      if (data[i].commonName === dataKey) {
        return data[i];
      }
    }
    return {};
  },

  dispatcherIndex: Browser.register(function(payload) {
    // do what you need to do with payload and payload.action
    // update your data
    // call the emitChange() function when done
    switch (payload.action.actionType) {
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