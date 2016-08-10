"use strict";

var Dispatcher = require("flux").Dispatcher;

var BrowserDispatcher = new Dispatcher();
BrowserDispatcher.handleAction = function(action) {
  this.dispatch({
    source: "BROWSER_ACTION",
    action: action
  });
};

module.exports = BrowserDispatcher;
