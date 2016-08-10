import { genFetch, unpack } from "./gdrive";

const id = "10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo";

export const get = genFetch(id);

export function toItems(json) {
  return unpack(json);
};
