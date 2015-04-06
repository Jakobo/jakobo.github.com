"use strict";

var React = require("react");

var LIConstants = require("../../constants/gdrive-linkedin");

var LIStore = require("../../stores/gdrive-linkedin");
var tileStore = require("../../stores/tile-layout");

var IsotopeActions = require("../../actions/isotope");

var sizer = require("../../styles/fonts/size");
var tileCSS = require("../../common/tiles");
var overlay = require("../../styles/colors/overlay")(LIConstants.BRAND_COLOR);
var colors = {
  bg: overlay.color,
  text: overlay.alt,
  icon: overlay.alt
};

function getState(key) {
  var data = LIStore.get(key);
  var layout = tileStore.get();
  return {
    feed: data,
    layout: layout
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    LIStore.addChangeListener(this._onChange);
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    LIStore.removeChangeListener(this._onChange);
    tileStore.removeChangeListener(this._onChange);
  },
  componentDidUpdate: function() {
    IsotopeActions.rearrange();
  },
  _onChange: function() {
    this.setState(getState(this.props.source));
  },
  render: function() {
    if (!this.state.feed || this.state.feed.length === 0) {
      return null;
    }

    var tile = null;
    var entries = this.state.feed;
    var row = entries[parseInt(this.props.item, 10) - 1] || null;

    if (!row) {
      return null;
    }

    var styles = tileCSS.css(this.state.layout.px, this.props["tile-width"], this.props["tile-height"]);
    var size = sizer(this.state.layout.px, this.props["tile-width"]);

    styles.inner = Object.assign({}, styles.inner, {
      backgroundColor: colors.bg,
      color: colors.text
    });

    styles.icon = {
      position: "absolute",
      left: "2%",
      bottom: "2%",
      fontSize: (Math.floor((this.state.layout.px * this.props["tile-height"]) / 32 / 2) * 32) + "px",
      opacity: 0.1,
      color: colors.icon
    };

    styles.textBlob = {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0
    };

    styles.link = {
      width: "100%",
      height: "100%",
      display: "block",
      boxSizing: "border-box",
      padding: "0.5em",
      color: colors.text,
      textDecoration: "none",
      fontSize: size(1.5)
    };

    tile = (
      <article key={"gdrive-linkedin-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <div className="x-fa x-fa-linkedin-square" style={styles.icon}></div>
          <p style={styles.textBlob}><a href={row.link} style={styles.link}>{['"', row.text, '"'].join("")}</a></p>
        </div>
      </article>
    );

    return tile;
  }
});
