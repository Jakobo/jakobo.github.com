"use strict";

var Browser = require("../dispatchers/browser");
var TileConstants = require("../constants/tiles");

var Actions = {
  recalculate: function(data) {
    Browser.handleAction({
      actionType: TileConstants.RECALCULATE_TILES,
      data: data
    });
  }
};

module.exports = Actions;
