import fetch from "fetch-jsonp";
/*
https://spreadsheets.google.com/feeds/list/{KEY}/1/public/values
  ?alt=json-in-script&callback=XNXX
*/

// return a function that will fetch data off of gdrive, return promise like fetch API
export function genFetch(id) {
  return function() {
    const url = `https://spreadsheets.google.com/feeds/list/${id}/1/public/values?alt=json-in-script`;
    return fetch(url, {
      jsonpCallback: "callback"
    });
  };
}

// unpacks the google spreadsheet json crap into something more... normal
// maps items against the header row as keys
export function unpack(data, rowFn) {
  const GSX_REGEX = /^gsx\$/;
  function isGsx(name) {
    return GSX_REGEX.test(name);
  }
  function toHeading(name) {
    return name.replace(GSX_REGEX, "");
  }
  function toText(textObj) {
    return textObj.$t;
  }

  let results = [];
  data.feed.entry.forEach(function(row) {
    let resultRow = {};
    for (let column in row) {
      if (!isGsx(column)) {
        continue;
      }
      resultRow[toHeading(column)] = toText(row[column]);
    }

    if (rowFn && typeof rowFn === "function") {
      resultRow = rowFn(resultRow);
    }
    results.push(resultRow);
  });

  // reverse to create a feed in reverse chronological order
  results.reverse();

  return results;

}
