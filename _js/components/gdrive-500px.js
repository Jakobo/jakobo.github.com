var React = require("react");
var m = require("merge");

var PXStore = require("../stores/gdrive-500px");
var tileStore = require("../stores/tile-layout");

var IsotopeActions = require("../actions/isotope");
var tileStyles = require("../styles/tiles");

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

    var tileCSS = m(tileStyles, {
      width: (this.state.layout.px * this.props["tile-width"]) + "px",
      height: (this.state.layout.px * this.props["tile-height"]) + "px"
    });

    tile = (
      <article key={"gdrive-500px-" + row.id} style={tileCSS} className={this.props.className}>
        <a href={row.link} className="n500px__link"><img src={row.image} className="n500px__image" /></a>
        <aside className="n500px__about">
          <a href={row.link}>{row.title}</a>
          <p>{row.caption}</p>
        </aside>
      </article>
    );

    return tile;
  }
});
