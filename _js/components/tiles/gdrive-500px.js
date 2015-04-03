var React = require("react");

var PXStore = require("../../stores/gdrive-500px");
var tileStore = require("../../stores/tile-layout");
var IsotopeActions = require("../../actions/isotope");

var tileCSS = require("../../common/tiles");

function getState(key) {
  var data = PXStore.get(key);
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
    PXStore.addChangeListener(this._onChange);
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PXStore.removeChangeListener(this._onChange);
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

    styles.title = {
      display: "block",
      paddingBottom: "0.5em",
      fontSize: "2em"
    };

    styles.link = {
      color: "#FAFAFA",
      textDecoration: "none"
    };

    tile = (
      <article key={"gdrive-500px-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <a href={row.link} className="n500px__link"><img src={row.image} className="n500px__image" /></a>
          <aside className="n500px__about" style={styles.aside}>
            <a href={row.link} style={styles.link}><span style={styles.title}>{row.title}</span>{row.caption}</a>
          </aside>
        </div>
      </article>
    );

    return tile;
  }
});
