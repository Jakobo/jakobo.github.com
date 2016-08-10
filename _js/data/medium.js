import { genFetch, unpack } from "./gdrive";

const id = "1RXKjQ57k07-GEhctT4MHWflxK840ENcsM_MXzuKiKLw";

export const get = genFetch(id);

export function toItems(json) {
  const IMG_REGEX = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/;

  return unpack(json, (row) => {
    const imgMatch = row.snippet.match(IMG_REGEX);
    row.img = null;
    if (imgMatch && imgMatch[1]) {
      row.img = imgMatch[1];
    }
    return row;
  });
};
