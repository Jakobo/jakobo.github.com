var Browser = require('../dispatchers/browser');
var GithubConstants = require('../constants/github');

var Actions = {
  load: function(data) {
    AppDispatcher.handleAction({
      actionType: GithubConstants.LOAD_GITHUB,
      data: data
    })
  }
};

module.exports = Actions;
