"use strict";

var Browser = require("../dispatchers/browser");
var GithubConstants = require("../constants/gdrive-github");

var Actions = {
  load: function(data) {
    Browser.handleAction({
      actionType: GithubConstants.LOAD_GITHUB,
      data: data
    });
  }
};

module.exports = Actions;
