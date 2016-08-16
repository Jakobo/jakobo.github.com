import { genFetch, unpack } from "./gdrive";

const id = "1RXKjQ57k07-GEhctT4MHWflxK840ENcsM_MXzuKiKLw";
const widthToken = /__G_WIDTH_TOKEN__/g
const widthTokenString = "__G_WIDTH_TOKEN__"
const heightToken = /__G_HEIGHT_TOKEN__/g
const heightTokenString = "__G_HEIGHT_TOKEN__"
const imgSplit = /^(.*)\/fit\/c\/.+\/([^\/]+)$/
const snipExtract = /^.*?<p class="medium-feed-snippet">(.+?)<\/p>.*$/
const entitySearch = /&#[\d]+;/g
const entityToNumber = /[&#;]/g

const entityReplace = (m) => {
  const m1 = m.replace(entityToNumber, "")
  return String.fromCharCode(m1)
}

// https://cdn-images-1.medium.com/fit/t/3200/1344/0*MkbYxiuXlwbg8hGR.jpeg
// https://d262ilb51hltx0.cloudfront.net/fit/c/600/200/1*0pOeRUd3wlRR9rOZteyFDw.jpeg
// https://cdn-images-1.medium.com/max/1600/1*0p30EPyKuO_kGvsVnf8N-w.png
// https://cdn-images-1.medium.com/max/800/1*QMoQOcQbwZf62y2rOIuS8A.gif
// the medium images always come as fit + c
const getAltImages = (url) => {
  const pieces = url.match(imgSplit)
  if (!pieces) {
    return null
  }
  return {
    bestCrop: {
      url: `${pieces[1]}/fit/t/${widthTokenString}/${heightTokenString}/${pieces[2]}`,
      width: widthToken,
      height: heightToken
    },
    centerCrop: {
      url: `${pieces[1]}/fit/c/${widthTokenString}/${heightTokenString}/${pieces[2]}`,
      width: widthToken,
      height: heightToken
    },
    maxWidth: {
      url: `${pieces[1]}/max/${widthTokenString}/${pieces[2]}`,
      width: widthToken
    }
  }
}

export const get = genFetch(id);

export function toItems(json) {
  const IMG_REGEX = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/;

  return unpack(json, (row) => {
    const imgMatch = row.snippet.match(IMG_REGEX);
    row.img = "https://cdn-images-1.medium.com/fit/t/3200/1344/0*MkbYxiuXlwbg8hGR.jpeg";
    if (imgMatch && imgMatch[1]) {
      row.img = imgMatch[1];
    }
    row.altImages = getAltImages(row.img)
    row.summary = row.snippet.replace(snipExtract, "$1").replace(entitySearch, entityReplace)
    return row
  });
};
