"use strict";

var React = require("react");

var mConstants = require("../../constants/gdrive-medium");

var MedStore = require("../../stores/gdrive-medium");
var tileStore = require("../../stores/tile-layout");

var IsotopeActions = require("../../actions/isotope");

var sizer = require("../../styles/fonts/size");
var tileCSS = require("../../common/tiles");

function getState(key) {
  var data = MedStore.get(key);
  var layout = tileStore.get();
  return {
    feed: data,
    layout: layout
  };
}

// removes the "px" from values
function depx(val) {
  return val.replace("px", "");
}

function qsa(sel, inside) {
  inside = inside || document;
  var result = inside.querySelectorAll(sel);
  if (!result || !result[0]) {
    return {};
  }
  return result[0];
}

function parseSnippet(html) {
  var node = document.createElement("div");
  node.innerHTML = html;

  var img = qsa(".medium-feed-image img", node);
  var snippet = qsa(".medium-feed-snippet", node).innerHTML;
  var imgSrc = img.src || mConstants.GENERIC_IMAGE;
  var find = mConstants.DYNAMIC_IMAGE.find;
  var replaceWith = mConstants.DYNAMIC_IMAGE.replaceWith;

  return {
    snip: snippet,
    originalImage: img.src,
    flexImage: imgSrc.replace(find, replaceWith)
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    MedStore.addChangeListener(this._onChange);
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    MedStore.removeChangeListener(this._onChange);
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

    var meta = parseSnippet(row.snippet);

    var styles = tileCSS.css(this.state.layout.px, this.props["tile-width"], this.props["tile-height"]);
    var size = sizer(this.state.layout.px, this.props["tile-width"]);

    styles.aside = {
      backgroundColor: mConstants.OVERLAY_COLOR,
      position: "absolute",
      width: "100%",
      display: "block",
      bottom: 0,
      left: 0,
      padding: size.many(0.3, 0.3, 0.3, 0.3),
      boxSize: "border-box"
    };

    styles.asideOnly = Object.assign({}, styles.aside, {
      top: 0,
      bottom: "auto",
      height: "100%"
    });

    styles.link = {
      display: "block",
      fontSize: size(1),
      color: mConstants.TEXT_COLOR,
      textDecoration: "none"
    };

    styles.text = {
      color: mConstants.TEXT_COLOR,
      padding: size.many(0, 0.3, 0, 0.3),
      margin: 0,
      textDecoration: "none"
    };

    styles.link = Object.assign({}, styles.text, {
      padding: 0
    });

    styles.source = Object.assign({}, styles.text, {
      color: mConstants.CITE_COLOR,
      paddingTop: size(0.3)
    });

    if (meta.flexImage) {
      image = (<a href={row.link} className="medium__link"><img src={
        meta.flexImage
          .replace(mConstants.WIDTH_TOKEN, depx(styles.inner.width))
          .replace(mConstants.HEIGHT_TOKEN, depx(styles.inner.height))
        } className="medium__image" /></a>);
    } else {
      image = "";
    }

    tile = (
      <article key={"gdrive-medium-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          {image}
          <aside className="medium__about" style={styles.aside}>
            <p style={styles.text}><a href={row.link} style={styles.link}>&quot;{meta.snip}&quot;</a></p>
            <p style={styles.source}><a href={row.link} style={styles.source}>&mdash; {row.title}</a></p>
          </aside>
        </div>
      </article>
    );

    return tile;
  }
});
