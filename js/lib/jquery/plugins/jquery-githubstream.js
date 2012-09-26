(function( $ ) {

function format(evt) {
  var str = "did something cool on github",
      repo = "";

  if (evt.repository) {
    repo = ([evt.repository.owner, evt.repository.name]).join("/");
  }

  switch (evt.type) {
    case "GollumEvent":
      str = "edited the "+repo+" wiki";
      break;
    case "GistEvent":
      str = "tweaked gist #"+evt.payload.id;
      break;
    case "PushEvent":
      str = "pushed to "+repo;
      break;
    case "PullRequestEvent":
      str = "sent a pull request to "+repo;
      break;
    case "IssueCommentEvent":
      // commented on an issue
    case "PullRequestReviewCommentEvent":
      // commented on a pull request
    case "CreateEvent":
      // created a repo or branch
    case "DeleteEvent":
      // deleted a repo or branch
    default:
      str = false;
  }
  return str;
}

$.fn.githubActivity = function(opts) {
  // https://github.com/Jakobo.json?callback=foo
  var username = opts.name,
      tmpl = opts.tmpl,
      url = "https://github.com/__USERNAME__.json",
      into = this,
      date_as = opts.date_as || "LLL",
      remaining = opts.limit;

  url = url.replace(/__USERNAME__/g, opts.user);

  $.ajax({
    dataType: "jsonp",
    url: url,
    success: function(data) {
      var output = [];
      $.each(data, function(idx, item) {
        if (!remaining) {
          return;
        }

        var result = format(item);
        var created_at;
        var out;
        if (!result) {
          return;
        }

        // one less remaining
        remaining--;

        created_at = moment(new Date(item.created_at));
        out = tmpl.replace(/__DATE__/g, created_at.format(date_as))
                  .replace(/__EVENT__/g, result);

        output.push(out);
      });

      // append successfully
      into.append(output.join(""));
    }
  });

  return this;
};

})(jQuery);
