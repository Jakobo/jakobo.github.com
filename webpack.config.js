var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP_DIR = path.resolve(__dirname, "_js");
var CSS_DIRS = path.resolve(__dirname, "_css");
var BUILD_DIR = path.resolve(__dirname, "assets");

// only apply BABEL to these directories... otherwise the build becomes SUPER
// slow! We should only be running babel on the app dir and any node modules
// that were improperly designed and didn't publish built code
var BABEL_DIRS = [
  APP_DIR,
  path.dirname(path.dirname(require.resolve("react-icons/fa/camera")))
];

var config = {
  entry: {
    app: [APP_DIR + "/app.js"]
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module : {
    loaders : [
      { test: /\.jsx?/, include: BABEL_DIRS, loader: 'babel' },
      { test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react' }
      // enable CSS module support
      // https://github.com/gajus/react-css-modules
      { test: /\.css$/, include: CSS_DIRS, loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]') },

    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css", {
      publicPath: "/assets/",
      allChunks: true
    })
  ]
};

module.exports = config;
