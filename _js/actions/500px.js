var Browser = require('../dispatchers/browser');
var PXConstants = require('../constants/gdrive-500px');

var Actions = {
  load: function(data) {
    AppDispatcher.handleAction({
      actionType: PXConstants.LOAD_500PX,
      data: data
    })
  }
};

module.exports = Actions;
