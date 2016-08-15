import fetch from "fetch-jsonp";

// https://plus.google.com/photos/115806050983038854461/albums/6240893300051837921
// https://picasaweb.google.com/data/feed/api/user/115806050983038854461/albumid/6240893300051837921?alt=json
const serviceId = "gphoto"
const userId = "115806050983038854461"
const albumId = "6240893300051837921"
const widthToken = /__G_WIDTH_TOKEN__/g
const widthTokenString = "__G_WIDTH_TOKEN__"
const heightToken = /__G_HEIGHT_TOKEN__/g
const heightTokenString = "__G_HEIGHT_TOKEN__"
const imgSplit = /^(.*)\/([^\/]+)$/

// https://lh3.googleusercontent.com/-RT4qlneQQNg/VpwcA81v4aI/AAAAAAAAW08/7dD-5E_HeI4xMvCDn4QtdNLgVBkzkz2awCHM/20081109-IMG_1369.jpg
// https://lh3.googleusercontent.com/-RT4qlneQQNg/VpwcA81v4aI/AAAAAAAAW08/7dD-5E_HeI4xMvCDn4QtdNLgVBkzkz2awCHM/w800-h800-p/20081109-IMG_1369.jpg
// source: https://sites.google.com/site/picasaresources/Home/Picasa-FAQ/picasa-webalbums/how-to-articles/how-to-get-an-image-of-a-specific-size
const getVariations = (url) => {
  const pieces = url.match(imgSplit)
  if (!pieces) {
    return null
  }

  return {
    square: {
      url: `${pieces[1]}/s${widthTokenString}/${pieces[2]}`,
      token: widthToken
    },
    maxWidth: {
      url: `${pieces[1]}/w${widthTokenString}/${pieces[2]}`,
      width: widthToken
    },
    maxHeight: {
      url: `${pieces[1]}/h${heightTokenString}/${pieces[2]}`,
      height: heightToken
    },
    fitWithin: {
      url: `${pieces[1]}/w${widthTokenString}-h${heightTokenString}/${pieces[2]}`,
      width: widthToken,
      height: heightToken
    },
    centerCrop: {
      url: `${pieces[1]}/w${widthTokenString}-h${heightTokenString}-c/${pieces[2]}`,
      width: widthToken,
      height: heightToken
    },
    bestCrop: {
      url: `${pieces[1]}/w${widthTokenString}-h${heightTokenString}-p/${pieces[2]}`,
      width: widthToken,
      height: heightToken
    },
    original: {
      url: `${pieces[1]}/s0/${pieces[2]}`,
      width: widthToken,
      height: heightToken
    }
  }
}

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

    const variations = getVariations(entry.content.src)

    if (!variations) return;

    let item = {
      img: entry.content.src,
      variations: variations,
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
