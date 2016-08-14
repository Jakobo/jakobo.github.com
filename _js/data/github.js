import { genFetch, unpack } from "./gdrive";

const id = "10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo";

export const get = genFetch(id);

export function toItems(json) {
  let seen = {}
  let results = [];

  // strip repeated items (like commenting on the same thread over and over)
  results.forEach((row) => {
    if (!seen[row.text]) {
      results.push(row);
      seen[row.text] = 1;
    }
  });

  return unpack(json);
};
