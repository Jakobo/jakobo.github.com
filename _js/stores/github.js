var AppDispatcher = require("../dispatchers/main");
var GithubConstants = require("../constants/github");
var scaffold = require("../common/scaffold-store");

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var $ = require("jquery");

var sharedStore = scaffold({
  CHANGE: GithubConstants.CHANGE_GITHUB
});

var source = "https://api.github.com/users/:username/events";
var _activity = {};

function loadGithubActivity(username) {
  $.ajax({
    url: source.replace(":username", username),
    dataType: "JSONP"
  })
  .done(function(result) {
    result.data.forEach(function(evt) {
      _activity[evt.id] = evt;
    });
    GitHubStore.emitChange();
  })
  .fail(function(error) {
    // TODO handle this
  });
}

var GitHubStore = assign({}, EventEmitter.prototype, sharedStore, {
    getAll: function() {
      return _activity;
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
      debugger;
      // do what you need to do with payload and payload.action
      // update your data
      // call the emitChange() function when done
      switch(payload.action.actionType) {
        case GithubConstants.LOAD_GITHUB:
          loadGithubActivity(payload.action.data);
        break;
      }
      return true; // No errors. Needed by promise in Dispatcher.
    })
  }
);

module.exports = GitHubStore;
