var React = require("react");
var GHStore = require("../stores/gdrive-github");
var ghc = require("../constants/gdrive-github");
var tiles = require("../common/tiles");


function getState(key) {
  var data = GHStore.get(key);
  return {
    feed: data
  };
}

function dedupe(list, key) {
  var seen = {};
  var out = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (!seen[list[i][key]]) {
      seen[list[i][key]] = true;
      out.push(list[i]);
    }
  }
  return out;
}

function getType(text) {
  var type;
  var i;
  var len;

  for (type in ghc.types) {
    for (i = 0, len = ghc.types[type].length; i < len; i++) {
      if (ghc.types[type][i].test(text)) {
        return type;
      }
    }
  }

  return "default";
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    GHStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GHStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState(this.props.source));
  },
  render: function() {
    var tile = null;
    var entries;
    var row;

    if (this.state.feed && this.state.feed.length > 0) {
      entries = dedupe(this.state.feed, 'text');
      row = entries[parseInt(this.props.item, 10) - 1] || null;

      if (row) {
        tile = (
          <article key={"gdrive-github-" + row.id} className={[
              "tile",
              "github",
              "github--" + getType(row.text),
              tiles.getTileClasses(this.props["tile-width"], this.props["tile-height"])
            ].join(" ")}>
            <p className="github__text">
              <a className="github__link" href={row.link}>{row.text}</a>
            </p>
          </article>
        );
      }
    }

    return tile;
  }
});
