// global env requires
require("../_vendor/google/analytics");

// Stores, dispatchers, and top level components
var GitHubStore = require("./stores/github");
var appDispatcher = require("./dispatchers/main");

console.log("test ok!", appDispatcher);

// Render the "site" component, kicking off react
require("./actions/github").loadGithub("jakobo");
