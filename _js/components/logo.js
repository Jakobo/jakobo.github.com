"use strict";

var React = require("react");
var fs = require("fs");

var tileStore = require("../stores/tile-layout");

var palette = require("../styles/colors/palette");

var svgText = fs.readFileSync(__dirname + "/../../img/logo.svg").toString();

function getState() {
  var layout = tileStore.get();
  return {
    layout: layout
  };
}

function depx(val) {
  val = val || 0;
  val = val + "";
  return parseInt(val.replace(/px$/, ""));
}

function setSvgSize(svg, height) {
  height = depx(height);
  var oWidth = parseInt(svg.getAttribute("data-original-width"));
  var oHeight = parseInt(svg.getAttribute("data-original-height"));
  var ratio = oHeight / oWidth;
  var width = Math.ceil(height * ratio);
  console.log(height, width);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    tileStore.addChangeListener(this._onChange);

    // adjust styles of the SVG object
    if (!this.svg) {
      this.svg = this.refs.container.getDOMNode().getElementsByTagName("svg")[0];
      this.svg.setAttribute("data-original-width", this.svg.getAttribute("width"));
      this.svg.setAttribute("data-original-height", this.svg.getAttribute("height"));
      this.svg.setAttribute("width", 0);
      this.svg.setAttribute("height", 0);
    }

    setSvgSize(this.svg, this.props.height);
  },
  componentWillUnmount: function() {
    tileStore.removeChangeListener(this._onChange);

    if (this.svg) {
      this.svg = null;
    }
  },
  componentDidUpdate: function() {
    if (this.svg) {
      setSvgSize(this.svg, this.props.height);
    }
  },
  _onChange: function() {
    this.setState(getState());
  },
  render: function() {
    var styles = {
      logo: {
        float: "left",
        paddingRight: "1em"
      }
    };

    // from ../../img/logo/svg
    var logo = (
      <div ref="container" style={styles.logo} dangerouslySetInnerHTML={{__html: svgText}}></div>
    );

    return logo;
  }
});
