var React = require("react");
var GHStore = require("../stores/gdrive-github");

function getState(key) {
  var data = GHStore.get(key);
  return {
    feed: data
  };
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
    var feed = "";

    if (this.state.feed && this.state.feed.length > 0) {
      feed = (
        <ul>
          {this.state.feed.map(function(row) {
            return (
              <li key={row.id} className="github__list-item">
                <a href="{row.link}">{row.text}</a>
              </li>
            );
          })}
        </ul>
      );
    }

    return <section className="github">{feed}</section>;
  }
});
