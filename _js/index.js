var fs = require('fs');
var path = require('path');

var $ = require('jquery');
var config = JSON.parse(fs.readFileSync(__dirname + '/config.json').toString());

var uiModules = {
  elipsis: require('./visuals/elipsis'),
  reduce: require('./visuals/reduce')
}

$(function() {
  for (var i = 0, len = config.ui.length; i < len; i++) {
    (function(entry) {
      var $node = $(entry.selector);
      var ui = entry.uiModule;
      var uiConfig = entry.config || {};
      var fn = uiModules[ui] || false;

      if (!fn) {
        return;
      }

      fn($node, uiConfig);
    }(config.ui[i]));
  }
});
