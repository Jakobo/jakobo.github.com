import fetch from "fetch-jsonp";

// https://plus.google.com/photos/115806050983038854461/albums/6240893300051837921
// https://picasaweb.google.com/data/feed/api/user/115806050983038854461/albumid/6240893300051837921?alt=json
const serviceId = "gphoto";
const userId = "115806050983038854461";
const albumId = "6240893300051837921";

export function get() {
  const url = `https://picasaweb.google.com/data/feed/api/user/${userId}/albumid/${albumId}?alt=json`;
  return fetch(url, {
    jsonpCallback: "callback"
  });
}

export function toItems(json) {
  let keyedResult = {};
  let results = [];
  json.feed.entry.forEach(function(entry) {
    // extract the rel
    let link = null;
    entry.link.forEach(function(l) {
      if (l.rel == "alternate" && l.type == "text/html") {
        link = l.href;
      }
    });

    let item = {
      img: entry.content.src,
      link: link,
      description: entry.summary.$t,
      publishedAt: entry.published.$t
    };
    let key = `${item.publishedAt} - ${item.description}`;
    keyedResult[key] = item;
  });

  Object.keys(keyedResult).sort().forEach(function(key) {
    results.push(keyedResult[key])
  });

  return results;
};
