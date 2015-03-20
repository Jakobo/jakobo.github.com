var React = require("react");
var PXStore = require("../stores/gdrive-500px");
var tiles = require("../common/tiles");

function getState(key) {
  var data = PXStore.get(key);
  return {
    feed: data
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    PXStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PXStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState(this.props.source));
  },
  render: function() {
    var tile = null;
    var entries;
    var row;

    if (this.state.feed && this.state.feed.length > 0) {
      entries = this.state.feed;
      row = entries[parseInt(this.props.item, 10) - 1] || null;

      if (row) {
        tile = (
          <article key={"gdrive-500px-" + row.id} className={[
              "tile",
              "n500px",
              tiles.getTileClasses(this.props["tile-width"], this.props["tile-height"])
            ].join(" ")}>
            <a href={row.link} className="n500px__link"><img src={row.image} className="n500px__image" /></a>
            <aside className="n500px__about">
              <a href={row.link}>{row.title}</a>
              <p>{row.caption}</p>
            </aside>
          </article>
        );
      }
    }

    return tile;
  }
});
