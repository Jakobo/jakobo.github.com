var React = require("react");
var $ = require("jquery");
var m = require("merge");

var MedStore = require("../stores/gdrive-medium");
var tileStore = require("../stores/tile-layout");

var IsotopeActions = require("../actions/isotope");

var tileCSS = require("../common/tiles");

var WIDTH_TOKEN = "__WIDTH__";
var HEIGHT_TOKEN = "__HEIGHT__";

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
  var imgSrc = $img.attr("src").replace(/\/fit\/c\/600\/200\//, "/fit/c/" + WIDTH_TOKEN + "/" + HEIGHT_TOKEN + "/");

  return {
    snip: snippet,
    originalImage: $img.attr("src"),
    flexImage: imgSrc
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

    if (!row) {
      return null;
    }

    var meta = parseSnippet(row.snippet);

    var styles = tileCSS.css(this.state.layout.px, this.props["tile-width"], this.props["tile-height"]);

    tile = (
      <article key={"gdrive-medium-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <a href={row.link} className="medium__link"><img src={meta.flexImage.replace("__WIDTH__", depx(styles.inner.width)).replace("__HEIGHT__", depx(styles.inner.height))} className="medium__image" /></a>
          <aside className="medium__about">
            <a href={row.link}>{row.title}</a>
            <p>{meta.snip}</p>
          </aside>
        </div>
      </article>
    );

    return tile;
  }
});
