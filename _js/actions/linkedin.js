"use strict";

var Browser = require("../dispatchers/browser");
var LIConstants = require("../constants/gdrive-linkedin");

var Actions = {
  load: function(data) {
    Browser.handleAction({
      actionType: LIConstants.LOAD_LINKEDIN,
      data: data
    });
  }
};

module.exports = Actions;
