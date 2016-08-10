import { genFetch, unpack } from "./gdrive";

const id = "1QZRRIzZOKobCUqYfMF8c0o8xj13RC2TkyGlT1FX6lnw";

export const get = genFetch(id);

export function toItems(json) {
  return unpack(json);
};
