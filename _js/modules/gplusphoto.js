var $ = require('jquery');

function drillTo(obj, to) {
  to = to.split(".");
  var next = to.shift();
  var returns = obj;

  do {
    if (returns[next]) {
      returns = returns[next];
    }
    else {
      return null;
    }
  } while(next = to.shift());

  return returns;
}

module.exports = function($el, opts) {
  // https://picasaweb.google.com/data/feed/base/user/
  // 115806050983038854461/albumid/5792309377280225217
  // ?alt=rss&kind=photo&hl=en_US
  // ... goes to ...
  // https://plus.google.com/photos/115806050983038854461
  // /albums/5792309377280225217/5794734315293172418
  // https://plus.google.com/photos/__USERID__/albums/__ALBUMID__/__PHOTOID__
  var username = opts.name,
      url = "https://picasaweb.google.com/data/feed/base/user/__USERID__/albumid/__ALBUMID__?alt=json&kind=photo&hl=en_US",
      matchLinkUrl = /.*?\/([\d]+)\/([^\/]+)#(.*)/,
      matchLinkRepl = "https://plus.google.com/photos/$1/albums/__ALBUMID__/$3",
      convertImgSizeRegex = /(.+\/)([^\/]+)$/,
      convertImgTo = "$1"+opts.size+"/$2";

  url = url.replace(/__USERID__/g, opts.user)
           .replace(/__ALBUMID__/g, opts.album);

  $.ajax({
    dataType: "jsonp",
    url: url,
    success: function(data) {
      var entries = drillTo(data, "feed.entry") || [];
      var recent = entries[0];
      if (!recent) {
        return;
      }

      var targetUrl;
      var imgUrl;
      var imgTitle;
      var imgUrlPieces;

      // locate the right link
      $.each(recent.link, function(idx, item) {
        if (item.type == "text/html" && item.rel == "alternate") {
          targetUrl = item.href.replace(matchLinkUrl, matchLinkRepl.replace(/__ALBUMID__/g, opts.album));
        }
      });

      imgTitle = drillTo(recent, "title.$t");
      imgUrl = drillTo(recent, "content.src");

      // https://lh4.googleusercontent.com/-AnFdHIvmyVw/UGsIKG7Q4sI/AAAAAAAAHvM/PwnyvKWc2Rk/Eclipsing.jpg
      // https://lh5.googleusercontent.com/-.../TuFVzz8ryNI/AAAAAAAAAjg/.../s200/screenshot_01.jpg
      imgUrl = imgUrl.replace(convertImgSizeRegex, convertImgTo);

      $el.append('<a href="'+targetUrl+'" title="'+imgTitle+'"><img src="'+imgUrl+'" alt="'+imgTitle+'"/></a>');
    }
  });

  return this;
};
