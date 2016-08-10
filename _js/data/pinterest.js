import { genFetch, unpack } from "./gdrive";

const id = "1vMpUCSizVMfbX1nCQVb8EKXUypF-J_pA45wNdrfW96M";

export const get = genFetch(id);

export function toItems(json) {
  const IMG_REGEX = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/;

  return unpack(json, (row) => {
    const imgMatch = row.content.match(IMG_REGEX);
    row.img = null;
    if (imgMatch && imgMatch[1]) {
      row.img = imgMatch[1];
    }
    return row;
  });
};
