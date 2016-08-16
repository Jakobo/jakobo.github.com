import { genFetch, unpack } from "./gdrive"

const id = "1vMpUCSizVMfbX1nCQVb8EKXUypF-J_pA45wNdrfW96M"
const IMG_REGEX = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/
const originalToken = /\/236x\//g

// https://s-media-cache-ak0.pinimg.com/236x/75/47/88/754788317d7bf90966114ad554d62daf.jpg
// 236x = 236px wide
// images are on CDN, so tested by curling through responses until I cleared 1500,
// at which point I gave up
const knownSizes = [
  70,
  192,
  200, 222, 236, 237, 290,
  345, 400, 474,
  550, 564,
  600,
  736,
  1200
];

const getVariations = (url) => {
  let variations = {}
  let last = 0
  knownSizes.forEach((size) => {
    const name = `${size}x`
    variations[size] = {
      start: last,
      end: size,
      url: url.replace(originalToken, `/${name}/`)
    }
    last = size + 1
  })
  variations["originals"] = {
    start: last,
    end: 999999,
    url: url.replace(originalToken, `/originals/`)
  }
  return variations
}

export const get = genFetch(id);

export function toItems(json) {
  return unpack(json, (row) => {
    const imgMatch = row.content.match(IMG_REGEX)
    row.img = null
    if (imgMatch && imgMatch[1]) {
      row.img = imgMatch[1]
      row.variations = getVariations(row.img)
    }
    return row;
  });
};
