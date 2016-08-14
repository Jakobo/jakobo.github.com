// given a color, find the overlay
import Chromath from "chromath"
const black = 0.87;
const contrastRatio = 4.5;
const midpointGrey = 127;
const shiftBy = 0.01;

const getContrastRatio = (x, y) => {
  const greyX = Chromath.desaturate(x).toRGBObject().r;
  const greyY = Chromath.desaturate(y).toRGBObject().r;
  const ratio = (greyX > greyY) ? greyX / greyY : greyY / greyX;
  return ratio;
}

export default (x) => {
  let originalColor = new Chromath(x);
  let color = new Chromath(x);

  // get the grey, and then if we are above midpoint (too bright) then go darker
  let grey = Chromath.desaturate(color).toRGBObject().r;
  const adjustFn = (grey > midpointGrey) ? Chromath.darken : Chromath.lighten;

  let percent = 0.01;
  let tries = 0;
  do {
    color = adjustFn(color, percent);
    percent += shiftBy;
    tries++;
  } while (percent <= 1 && getContrastRatio(color, originalColor) <= contrastRatio)

  if (getContrastRatio(color, originalColor) <= contrastRatio) {
    color = (adjustFn === Chromath.darken) ? "#000" : "#fff";
  }

  return (new Chromath(color)).toHexString();
};
