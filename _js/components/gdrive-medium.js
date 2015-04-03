var React = require("react");
var $ = require("jquery");
var m = require("merge");

var MedStore = require("../stores/gdrive-medium");
var tileStore = require("../stores/tile-layout");

var IsotopeActions = require("../actions/isotope");

var tileCSS = require("../common/tiles");

var WIDTH_TOKEN = "__WIDTH__";
var HEIGHT_TOKEN = "__HEIGHT__";
var NO_IMAGE_SRC = "https://d262ilb51hltx0.cloudfront.net/fit/c/600/200/1*5kLUGuMkF6oR_5bI2qS-aQ.jpeg";

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
  /*
  <div class="medium-feed-item">
    <p class="medium-feed-image">
      <a href="https://medium.com/@jakob/i-m-sorry-i-won-t-do-your-take-home-coding-exercise-3b74ba34928a">
        <img src="https://d262ilb51hltx0.cloudfront.net/fit/c/600/200/1*crPfo4yZHGJO7UGbMhT68g.jpeg" width="600" height="200">
      </a>
    </p>
    <p class="medium-feed-snippet">There are some great techniques to improve the quality of candidates in your interview pipeline. Giving them a take home project isn&#8217;t one&#8230;</p>
    <p class="medium-feed-link">
      <a href="https://medium.com/@jakob/i-m-sorry-i-won-t-do-your-take-home-coding-exercise-3b74ba34928a">Continue reading on Medium »</a>
    </p>
  </div>
  */
  var $node = $("<div>").append(html);
  var $img = $(".medium-feed-image img", $node).eq(0);
  var snippet = $(".medium-feed-snippet", $node).eq(0).html();

  if (!$img.length) {
    $img = $('<img src="' + NO_IMAGE_SRC + '" />');
  }

  return {
    snip: snippet,
    originalImage: $img.attr("src"),
    flexImage: $img.attr("src").replace(/\/fit\/c\/[\d]+\/[\d]+\//, "/fit/c/" + WIDTH_TOKEN + "/" + HEIGHT_TOKEN + "/")
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

    styles.aside = {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      position: "absolute",
      width: "100%",
      display: "block",
      bottom: 0,
      left: 0,
      padding: "0.3em 0.3em 1em 0.3em",
      boxSize: "border-box"
    };

    styles.asideOnly = Object.assign({}, styles.aside, {
      top: 0,
      bottom: "auto",
      height: "100%"
    });

    styles.link = {
      display: "block",
      paddingBottom: "0.5em",
      fontSize: "2em",
      color: "#FAFAFA",
      textDecoration: "none"
    };

    styles.text = {
      color: "#FAFAFA",
      padding: "0 0.3em 0 0.3em",
      margin: 0,
      textDecoration: "none"
    };

    styles.source = Object.assign({}, styles.text, {
      color: "#C4C4C4",
      paddingTop: "0.3em"
    });

    if (meta.flexImage) {
      image = (<a href={row.link} className="medium__link"><img src={meta.flexImage.replace("__WIDTH__", depx(styles.inner.width)).replace("__HEIGHT__", depx(styles.inner.height))} className="medium__image" /></a>);
    } else {

      image = "";
      // TODO: add styles to the aside to make the box more... medium-ish?
    }

    tile = (
      <article key={"gdrive-medium-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          {image}
          <aside className="medium__about" style={styles.aside}>
            <p style={styles.text}><a href={row.link} style={styles.text}>&quot;{meta.snip}&quot;</a></p>
            <p style={styles.source}><a href={row.link} style={styles.source}>&mdash; {row.title}</a></p>
          </aside>
        </div>
      </article>
    );

    return tile;
  }
});
