var React = require("react");
var PXStore = require("../stores/gdrive-500px");

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
    var feed = "";

    if (this.state.feed && this.state.feed.length > 0) {
      feed = (
        <ul>
          {this.state.feed.map(function(row) {
            return (
              <li key={row.id} className="500px__list-item">
                <a href="{row.link}">{row.text}</a>
              </li>
            );
          })}
        </ul>
      );
    }

    return <section className="500px">{feed}</section>;
  }
});
