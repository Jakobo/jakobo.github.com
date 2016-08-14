const webpack = require("webpack");
const path = require("path");

// directories
const APP_DIR = path.resolve(__dirname, "_js");
const BUILD_DIR = path.resolve(__dirname, "assets");
const STYLEGUIDE_DIR = path.resolve(__dirname, "styleguide");

// only apply BABEL to these directories... otherwise the build becomes SUPER
// slow! We should only be running babel on the app dir and any node modules
// that were improperly designed and didn't publish built code
const BABEL_DIRS = [
  APP_DIR,
  STYLEGUIDE_DIR,
  path.dirname(path.dirname(require.resolve("react-icons/fa/camera")))
];

// places we know we are explicitly managing CSS. Avoid scanning node_modules
const CSS_DIRS = [
  APP_DIR,
  STYLEGUIDE_DIR,
  path.dirname(require.resolve("normalize.css"))
];

// webpack config proper
const config = {
  entry: {
    app: [APP_DIR + "/app.js"]
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      styleguide: path.resolve("./styleguide")
    }
  },
  module : {
    loaders : [
      { test: /\.jsx?/, include: BABEL_DIRS, loader: 'babel' },
      { test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react' },
      {
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }
    ]
  },
};

module.exports = config;
