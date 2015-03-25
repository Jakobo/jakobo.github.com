var Browser = require('../dispatchers/browser');
var IsotopeConstants = require('../constants/isotope');

var Actions = {
  rearrange: function(data) {
    Browser.handleAction({
      actionType: IsotopeConstants.ISOTOPE_REDRAW,
      data: data
    });
  }
};

module.exports = Actions;
