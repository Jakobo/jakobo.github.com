var fs = require('fs');
var path = require('path');

var $ = require('jquery');

var config = require('./config');

var visuals = {
  elipsis: require('./visuals/elipsis'),
  reduce: require('./visuals/reduce'),
  googleimagesize: require('./visuals/googleimagesize')
};

var uiModules = {
  gist: require('./modules/gist'),
  github: require('./modules/github'),
  gplusphoto: require('./modules/gplusphoto')
};

$(function() {
  for (var i = 0, len = config.ui.length; i < len; i++) {
    (function(entry) {
      var $node = $(entry.selector);
      var ui = entry.use;
      var uiConfig = entry.config || {};
      var fn = uiModules[ui] || visuals[ui] || false;

      if (!fn || !$node.length) {
        return;
      }

      fn($node, uiConfig);
    }(config.ui[i]));
  }
});
