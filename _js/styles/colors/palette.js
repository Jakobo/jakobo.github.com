"use strict";

var rgb = require("../util/now").rgb;
var Chromath = require("chromath");
var overlay = require("./overlay");

var analogous = Chromath.analogous(rgb);
var complement = Chromath.complement(rgb);

var basePalette = {
  base: {
    plain: new Chromath(rgb).toHexString(),
    light: Chromath.lighten(rgb, 0.8).toHexString(),
    dark: Chromath.darken(rgb, 0.6).toHexString()
  },
  minus: {
    plain: analogous[1].toHexString(),
    light: Chromath.lighten(analogous[1], 0.8).toHexString(),
    dark: Chromath.darken(analogous[1], 0.6).toHexString()
  },
  plus: {
    plain: analogous[2].toHexString(),
    light: Chromath.lighten(analogous[2], 0.8).toHexString(),
    dark: Chromath.darken(analogous[2], 0.6).toHexString()
  },
  complement: {
    plain: complement.toHexString(),
    light: Chromath.lighten(complement, 0.8).toHexString(),
    dark: Chromath.darken(complement, 0.6).toHexString()
  }
};

var palette = {};

Object.keys(basePalette).forEach(function(colorName) {
  palette[colorName] = {};
  Object.keys(basePalette[colorName]).forEach(function(style) {
    var c = overlay(basePalette[colorName][style]);

    palette[colorName][style] = c.color;
    palette[colorName]["x" + style] = c.alt;
  });
});

module.exports = palette;
