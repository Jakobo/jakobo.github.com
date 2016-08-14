import rgb from "./now_color"
import Chromath from "chromath"
import overlay from "./overlays"

const analogous = Chromath.analogous(rgb);
const complement = Chromath.complement(rgb);

const makeDefault = (color) => {
  return {
    color: color.toHexString,
    overlay: overlay(color)
  };
};
const makeLight = (color) => {
  const base = Chromath.lighten(color, 0.8).toHexString();
  return {
    color: base,
    overlay: overlay(base)
  };
};
const makeDark = (color) => {
  const base = Chromath.darken(color, 0.6).toHexString();
  return {
    color: base,
    overlay: overlay(base)
  };
};

const baseSwatches = {
  base: {
    plain: makeDefault(rgb),
    light: makeLight(rgb),
    dark: makeDark(rgb)
  },
  minus: {
    plain: makeDefault(analogous[1]),
    light: makeLight(analogous[1]),
    dark: makeDark(analogous[1])
  },
  plus: {
    plain: makeDefault(analogous[2]),
    light: makeLight(analogous[2]),
    dark: makeDark(analogous[2])
  },
  complement: {
    plain: makeDefault(complement),
    light: makeLight(complement),
    dark: makeDark(complement)
  }
};

export default baseSwatches;
