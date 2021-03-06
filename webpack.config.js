var webpack = require("webpack");
var path = require("path");

// directories
var APP_DIR = path.resolve(__dirname, "_js");
var BUILD_DIR = path.resolve(__dirname, "assets");
var STYLEGUIDE_DIR = path.resolve(__dirname, "styleguide");

// only apply BABEL to these directories... otherwise the build becomes SUPER
// slow! We should only be running babel on the app dir and any node modules
// that were improperly designed and didn't publish built code
var BABEL_DIRS = [
  APP_DIR,
  STYLEGUIDE_DIR,
  path.dirname(path.dirname(require.resolve("react-icons/fa/camera")))
];

// webpack config proper
var config = {
  entry: {
    bundle: [APP_DIR + "/app.js"]
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: "[name].js"
  },
  resolve: {
    alias: {
      // this shortcut makes it possible to ask for "styleguide/*" anywhere in the app
      styleguide: path.resolve("./styleguide")
    }
  },
  module : {
    loaders : [
      { test: /\.jsx?/, include: BABEL_DIRS, loader: 'babel' },
      { test: /\.svg$/, loader: 'babel!svg-react' },
      {
        // the react-masonry plugin explicitly says we need the import loader in webpack here
        // otherwise, the AMD-isms will not get stripped off
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }
    ]
  },
};

module.exports = config;
