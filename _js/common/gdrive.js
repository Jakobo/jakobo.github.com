// https://spreadsheets.google.com/feeds/list/{KEY}/1/public/values?alt=json-in-script&callback=XNXX
// helper module for retrieving data from a feed generated google spreadsheet
// (sometimes, this is the only way to get RSS to JSON...)
// ( ( I'm looking @ you, medium ) )

// examples
// https://spreadsheets.google.com/feeds/list/10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo/1/public/values?alt=json-in-script&callback=XNXX
// https://spreadsheets.google.com/feeds/list/1aETLR_5FGF2yLqxx32Voqz1g5NxA1yMaLiVz98TZyRk/1/public/values?alt=json-in-script&callback=XNXX

var jsonp = require("jsonp");

var KEY = "_____GDRIVE_KEY_____";
var GSX_REGEX = /^gsx\$/;

var tmpl = [
  "https://spreadsheets.google.com/feeds/list/",
  KEY,
  "/1/public/values?alt=json-in-script"
].join("");

function isGsx(name) {
  return GSX_REGEX.test(name);
}

function toHeading(name) {
  return name.replace(GSX_REGEX, "");
}

function toText(textObj) {
  return textObj.$t;
}

module.exports = function(key, cb) {
  var url = tmpl.replace(KEY, key);
  return jsonp(url, {
    param: "callback"
  }, function(err, data) {
    if (err) return cb(err);

    var results = [];

    data.feed.entry.forEach(function(row) {
      var resultRow = {};
      for (var column in row) {
        if (!isGsx(column)) continue;
        resultRow[toHeading(column)] = toText(row[column]);
      }
      results.push(resultRow);
    });

    // reverse to create a feed order
    results.reverse();

    return cb(null, results);
  });
}
