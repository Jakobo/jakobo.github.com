import breakpoints from "./breakpoints"
import { withVariants } from "styleguide/util"

/* weights */
const weightBold = "bold";

/* size */
const size1 = "10px";
const size2 = "11px";
const size3 = "12px";
const size4 = "14px";
const size5 = "16px";
const size6 = "18px";
const size7 = "21px";
const size8 = "24px";
const size9 = "36px";
const size10 = "48px";
const size11 = "64px";
const size12 = "96px";

/* leading */
const leading1 = "11px";
const leading2 = "12px";
const leading3 = "14px";
const leading4 = "16px";
const leading5 = "18px";
const leading6 = "20px";
const leading7 = "23px";
const leading8 = "28px";
const leading9 = "42px";
const leading10 = "56px";
const leading11 = "76px";
const leading12 = "114px";

/* tracking */
const tracking1 = "-0.025px";
const tracking2 = "-0.05px";
const tracking3 = "-0.1px";
const tracking4 = "-0.15px";
const tracking5 = "-0.2px";
const tracking6 = "-0.25px";
const tracking7 = "-0.3px";
const tracking8 = "-1px";
const tracking9 = "-1.25px";
const tracking10 = "-1.75px";
const tracking11 = "-2.25px";
const tracking12 = "-3.25px";

/* wordSpacing */
const wordSpacing1 = "0";
const wordSpacing2 = "0";
const wordSpacing3 = "0";
const wordSpacing4 = "0";
const wordSpacing5 = "0";
const wordSpacing6 = "0";
const wordSpacing7 = "-1.3px";
const wordSpacing8 = "-2px";
const wordSpacing9 = "-2.25px";
const wordSpacing10 = "-2.75px";
const wordSpacing11 = "-3.25px";
const wordSpacing12 = "-4.25px";

const sizeMap = { xs: 0, s: 1, m: 2, l: 3, xl: 4 };

const sizeIt = (size, by) => {
  // size => num +/- by
  const pos = sizeMap[size] + by;

  // get key at new location
  const keys = Object.keys(sizeMap);
  const newSize = keys[pos];
  if (newSize) return newSize;
  return (pos < 0) ? keys[0] : keys[keys.length - 1];
}

export const sizeUp = (size) => { return sizeIt(size, 1); }
export const sizeDown = (size) => { return sizeIt(size, -1); }

/* formatting */
export const left = { textAlign: "left" };
export const right = { textAlign: "right" };
export const center = { textAlign: "center" };
export const justify = { textAlign: "justify" };

export const bold = { fontWeight: weightBold };
export const regular = { fontStyle: "normal" };
export const italic = { fontStyle: "italic" };
export const underline = { textDecoration: "underline" };
export const noUnderline = { textDecoration: "none" };

/* lists */
export const listStyleNone = { listStyle: "none" };

/* text overflow */
export const noWrap = { whiteSpace: "nowrap" };
export const breakWord = { whiteSpace: "break-word" };
export const truncate = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}

/* styles */
export const sansSerif = {
  fontFamily: '"Helvetica Neue", Helvetica, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", arial, sans-serif'
};

export const antialiased = {
  "MozOsxFontSmoothing": "grayscale",
  "WebkitFontSmoothing": "antialiased"
};

/* scale */
export const text = {
  xs: withVariants({
    fontSize: size1,
    letterSpacing: tracking1,
    lineHeight: leading1,
    wordSpacing: wordSpacing1
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size2,
    letterSpacing: tracking2,
    lineHeight: leading2,
    wordSpacing: wordSpacing2
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size3,
    letterSpacing: tracking3,
    lineHeight: leading3,
    wordSpacing: wordSpacing3
  }]),
  s: withVariants({
    fontSize: size2,
    letterSpacing: tracking2,
    lineHeight: leading2,
    wordSpacing: wordSpacing2
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size3,
    letterSpacing: tracking3,
    lineHeight: leading3,
    wordSpacing: wordSpacing3
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size4,
    letterSpacing: tracking4,
    lineHeight: leading4,
    wordSpacing: wordSpacing4
  }]),
  m: withVariants({
    fontSize: size3,
    letterSpacing: tracking3,
    lineHeight: leading3,
    wordSpacing: wordSpacing3
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size4,
    letterSpacing: tracking4,
    lineHeight: leading4,
    wordSpacing: wordSpacing4
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size5,
    letterSpacing: tracking5,
    lineHeight: leading5,
    wordSpacing: wordSpacing5
  }]),
  l: withVariants({
    fontSize: size4,
    letterSpacing: tracking4,
    lineHeight: leading4,
    wordSpacing: wordSpacing4
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size5,
    letterSpacing: tracking5,
    lineHeight: leading5,
    wordSpacing: wordSpacing5
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size6,
    letterSpacing: tracking6,
    lineHeight: leading6,
    wordSpacing: wordSpacing6
  }]),
  xl: withVariants({
    fontSize: size5,
    letterSpacing: tracking5,
    lineHeight: leading5,
    wordSpacing: wordSpacing5
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size6,
    letterSpacing: tracking6,
    lineHeight: leading6,
    wordSpacing: wordSpacing6
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size7,
    letterSpacing: tracking7,
    lineHeight: leading7,
    wordSpacing: wordSpacing7
  }])
};

export const display = {
  xs: withVariants({
    fontSize: size6,
    letterSpacing: tracking6,
    lineHeight: leading6,
    wordSpacing: wordSpacing6
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size7,
    letterSpacing: tracking7,
    lineHeight: leading7,
    wordSpacing: wordSpacing7
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size8,
    letterSpacing: tracking8,
    lineHeight: leading8,
    wordSpacing: wordSpacing8
  }]),
  s: withVariants({
    fontSize: size7,
    letterSpacing: tracking7,
    lineHeight: leading7,
    wordSpacing: wordSpacing7
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size8,
    letterSpacing: tracking8,
    lineHeight: leading8,
    wordSpacing: wordSpacing8
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size9,
    letterSpacing: tracking9,
    lineHeight: leading9,
    wordSpacing: wordSpacing9
  }]),
  m: withVariants({
    fontSize: size8,
    letterSpacing: tracking8,
    lineHeight: leading8,
    wordSpacing: wordSpacing8
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size9,
    letterSpacing: tracking9,
    lineHeight: leading9,
    wordSpacing: wordSpacing9
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size10,
    letterSpacing: tracking10,
    lineHeight: leading10,
    wordSpacing: wordSpacing10
  }]),
  l: withVariants({
    fontSize: size9,
    letterSpacing: tracking9,
    lineHeight: leading9,
    wordSpacing: wordSpacing9
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size10,
    letterSpacing: tracking10,
    lineHeight: leading10,
    wordSpacing: wordSpacing10
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size11,
    letterSpacing: tracking11,
    lineHeight: leading11,
    wordSpacing: wordSpacing11
  }]),
  xl: withVariants({
    fontSize: size10,
    letterSpacing: tracking10,
    lineHeight: leading10,
    wordSpacing: wordSpacing10
  },
  [`@media ${breakpoints.sm}`, {
    fontSize: size11,
    letterSpacing: tracking11,
    lineHeight: leading11,
    wordSpacing: wordSpacing11
  }],
  [`@media ${breakpoints.lg}`, {
    fontSize: size12,
    letterSpacing: tracking12,
    lineHeight: leading12,
    wordSpacing: wordSpacing12
  }])
};
