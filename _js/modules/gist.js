var $ = require('jquery');
var stylesheetPlaced = false;

module.exports = function($el, options) {
  var href = $el.attr("href"),
      $parent = $el.parents("p").eq(0),
      baseUrl = "https://gist.github.com/__GIST__.json?file=__FILE__",
      pieces,
      gist,
      file,
      url;

  pieces = href.match(/.*?\/([\d]+).*?#file_(.+)/);
  gist = pieces[1];
  file = pieces[2];

  url = baseUrl.replace("__GIST__", gist).replace("__FILE__", file);
  $.ajax({
    dataType: "jsonp",
    url: url,
    success: function(data) {
      if (!stylesheetPlaced) {
        // <link rel="stylesheet" type="text/css" media="screen" href="http://localhost:8081/all.css">
        var sheet = document.createElement("link");
        sheet.rel = "stylesheet";
        sheet.type = "text/css";
        sheet.media = "screen";
        sheet.href = data.stylesheet;
        $("head").append(sheet);
        stylesheetPlaced = true;
      }

      $parent.before(data.div)
      $parent.remove()
    }
  });
};
