var AppDispatcher = require('../dispatchers/main');
var GithubConstants = require('../constants/github');

var Actions = {
  loadGithub: function(data) {
    AppDispatcher.handleAction({
      actionType: GithubConstants.LOAD_GITHUB,
      data: data
    })
  }
};

module.exports = Actions;
