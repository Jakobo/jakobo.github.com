var React = require("react");
var tileStore = require("../../stores/tile-layout");
var tileCSS = require("../../common/tiles");
var palette = require("../../styles/colors/palette");

function getState(key) {
  var layout = tileStore.get();
  return {
    layout: layout
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    tileStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState());
  },
  render: function() {
    var styles = tileCSS.css(this.state.layout.px, this.props["tile-width"], this.props["tile-height"]);
    var tile = null;

    styles.inner = Object.assign({}, styles.inner, {
      backgroundColor: palette.base.light,
      color: palette.base.xlight,
      paddingLeft: "0.5em",
      paddingRight: "0.5em"
    });

    styles.link = {
      color: palette.base.xlight,
      textDecoration: "none"
    };

    // anti-spam from http://superuser.com/questions/235937/does-e-mail-address-obfuscation-actually-work
    styles.antiSpam = {
      display: "none"
    };

    tile = (
      <article style={styles.tile} className={this.props.className}>
        <div style={styles.inner} className="h-card">
          <p>
            &copy; 2015 <a className="p-name u-url" href="http://www.felocity.com" style={styles.link}>Rudolph Jakob Heuser</a> (<span className="p-nickname p-additional-name">Jakob</span>)
          </p>
          <p>
            Want to get in touch? jakob<span style={styles.antiSpam}>fizzbuzz</span>@felocity.com
          </p>
        </div>
      </article>
    );

    return tile;
  }
});
