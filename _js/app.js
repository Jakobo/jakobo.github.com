// POLYFILL ALL THE ES6 THINGS
require("babel/polyfill");

// global env requires
require("../_vendor/google/analytics");

// this is an experiment to learn react, flux, and everything in between
// the modern web is neat
var React = require("react");
var Felocity = require("./components/felocity");
React.render((<Felocity/>), document.getElementById("app"));
