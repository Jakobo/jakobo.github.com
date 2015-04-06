"use strict";

var React = require("react");
var $ = require("jquery");

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

function depx(val) {
  return val.replace("px", "");
}

function parseSnippet(html) {
  var $node = $("<div>").append(html);
  var $img = $(".medium-feed-image img", $node).eq(0);
  var snippet = $(".medium-feed-snippet", $node).eq(0).html();
  var find = mConstants.DYNAMIC_IMAGE.find;
  var replaceWith = mConstants.DYNAMIC_IMAGE.replaceWith;

  if (!$img.length) {
    $img = $('<img src="' + mConstants.GENERIC_IMAGE + '" />');
  }

  return {
    snip: snippet,
    originalImage: $img.attr("src"),
    flexImage: $img.attr("src").replace(find, replaceWith)
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
    var row = entries[parseInt(this.props.item, 10) - 1] || null;
    var image;

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
