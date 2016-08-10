"use strict";

var React = require("react");

var pConstants = require("../../constants/gdrive-pinterest");

var PinterestStore = require("../../stores/gdrive-pinterest");
var tileStore = require("../../stores/tile-layout");

var IsotopeActions = require("../../actions/isotope");

var sizer = require("../../styles/fonts/size");
var tileCSS = require("../../common/tiles");

var sizes = [
    70,
    236,
    474,
    736
];

function getState(key) {
  var data = PinterestStore.get(key);
  var layout = tileStore.get();
  return {
    feed: data,
    layout: layout
  };
}

// returns a the smallest "big" version of a URL
// https://s-media-cache-ak0.pinimg.com/236x/fe/1e/7f/fe1e7f1238aac4d0f60e18ce00be5e65.jpg
// https://s-media-cache-ak0.pinimg.com/736x/fe/1e/7f/fe1e7f1238aac4d0f60e18ce00be5e65.jpg
// sizes are listed in the sizes[] collection
function embiggen(url, target) {
    var size = 0;
    var idx = 0;

    while (size < target && sizes[idx]) {
      size = sizes[idx];
      idx++;
    }
    console.log(url, target, size);
    return url.replace(/com\/[\d]+x\//, "com/" + size + "x/");
}

function qsa(sel, inside) {
  inside = inside || document;
  var result = inside.querySelectorAll(sel);
  if (!result || !result[0]) {
    return {};
  }
  return result[0];
}

function getImage(html) {
  var node = document.createElement("div");
  node.innerHTML = html;

  var img = qsa("img", node);
  var imgSrc = img.src || pConstants.GENERIC_IMAGE;

  return imgSrc;
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    PinterestStore.addChangeListener(this._onChange);
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PinterestStore.removeChangeListener(this._onChange);
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
    var row;
    var image;

    // figure out the row
    if (this.props.item) {
      row = entries[parseInt(this.props.item, 10) - 1] || null;
    }
    if (this.props.name) {
      entries.forEach(function(aRow) {
        if (this.props.name === aRow.commonName) {
          row = aRow;
        }
      }.bind(this));
    }

    if (!row) {
      return null;
    }

    var imgSrc = getImage(row.content);
    var largestDim = Math.max(this.props["tile-width"], this.props["tile-height"]);
    var largestImgSrc = embiggen(imgSrc, this.state.layout.px * largestDim);

    var styles = tileCSS.css(this.state.layout.px, this.props["tile-width"], this.props["tile-height"]);
    var size = sizer(this.state.layout.px, this.props["tile-width"]);

    styles.aside = {
      backgroundColor: pConstants.OVERLAY_COLOR,
      position: "absolute",
      width: "100%",
      display: "block",
      bottom: 0,
      left: 0,
      padding: size.many(0.3, 0.3, 0.3, 0.3),
      boxSize: "border-box"
    };

    styles.text = {
      color: pConstants.TEXT_COLOR,
      padding: size.many(0, 0.3, 0, 0.3),
      margin: 0,
      textDecoration: "none"
    };

    styles.origin = Object.assign({}, styles.text, {
      color: pConstants.SOURCE_COLOR
    });

    styles.link = Object.assign({}, styles.text, {
      padding: 0
    });

    tile = (
      <article key={"gdrive-pinterest-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <a href={row.link}><img src={largestImgSrc} /></a>
          <aside style={styles.aside}>
            <p style={styles.text}><a href={row.link} style={styles.link}>{row.title}
              <span style={styles.origin}>on Pinterest</span></a>
            </p>
          </aside>
        </div>
      </article>
    );

    return tile;
  }
});
