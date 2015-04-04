var React = require("react");

// constants
var TWConstants = require("../../constants/gdrive-twitter");

// Data
var TWStore = require("../../stores/gdrive-twitter");
var tileStore = require("../../stores/tile-layout");
var IsotopeActions = require("../../actions/isotope");

// TW CSS
var tileCSS = require("../../common/tiles");

function getState(key) {
  var data = TWStore.get(key);
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
    TWStore.addChangeListener(this._onChange);
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TWStore.removeChangeListener(this._onChange);
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

    styles.inner = Object.assign({}, styles.inner, {
      backgroundColor: TWConstants.GREY_COLOR,
      color: TWConstants.WHITE_COLOR
    });

    styles.icon = {
      position: "absolute",
      left: "2%",
      bottom: "2%",
      fontSize: (Math.floor((this.state.layout.px * this.props["tile-height"]) / 32 / 2) * 32) + "px",
      opacity: 0.1,
      color: TWConstants.BRAND_COLOR
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
      color: TWConstants.WHITE_COLOR,
      textDecoration: "none",
      fontSize: "1.5em"
    };

    tile = (
      <article key={"gdrive-twitter-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <div className="x-fa x-fa-twitter" style={styles.icon}></div>
          <p style={styles.textBlob}><a href={row.link} style={styles.link}>
            {row.status.replace(/([\W])/g, "$1" + "__SPLIT__").split("__SPLIT__").map(function(str, i) {
              return <span key={i}>{str}<wbr/></span>;
            })}
          </a></p>
        </div>
      </article>
    );

    return tile;
  }
});
