var Browser = require('../dispatchers/browser');
var MedConstants = require('../constants/gdrive-medium');

var Actions = {
  load: function(data) {
    AppDispatcher.handleAction({
      actionType: MedConstants.LOAD_MEDIUM,
      data: data
    })
  }
};

module.exports = Actions;
