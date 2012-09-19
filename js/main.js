// main.js, where the real money in the movie is made
Inject.setModuleRoot("/js/");
Inject.reset();

// in this instance of inject, the window objects are needed
// ... maybe inject needs a dependencies addon

// jquery plugins
Inject.addRule(/.*?jquery\/plugins\/.*?/, {
  path: function(module) {
    return "/lib/"+module+".js";
  },
  last: true
});

// jquery
Inject.addRule(/jquery/, {
  path: "/lib/jquery/jquery-1.8.0/jquery-1.8.0.min.js"
});

// moment
Inject.addRule(/moment/, {
  path: "/lib/moment/moment-1.7.0/moment-1.7.0.min.js"
});

// go go go zerg rush
// two tier require forcing explicit (unknown) dependencies
require.ensure(["jquery", "moment"], function() {
  require.ensure([
    "jquery/plugins/jquery-sizer",
    "jquery/plugins/jquery-gist",
    "jquery/plugins/jquery-ellipsis",
    "jquery/plugins/jquery-reduceto",
    "jquery/plugins/jquery-githubstream",
    "jquery/plugins/jquery-jbinder"
  ], function(require) {
    $(function() { $("body").jBinder("felocity") });
  });
});