var React = require("react");
var tileStore = require("../../stores/tile-layout");
var tileCSS = require("../../common/tiles");
var palette = require("../../styles/colors/palette");
var sizer = require("../../styles/fonts/size");

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
    var size = sizer(this.state.layout.px, this.props["tile-width"]);
    var tile = null;

    styles.inner = Object.assign({}, styles.inner, {
      backgroundColor: palette.base.light,
      color: palette.base.xlight,
      paddingLeft: size(0.5),
      paddingRight: size(0.5)
    });

    styles.head = {
      fontSize: size(1)
    };

    styles.subhead = {
      fontSize: size(0.5)
    };

    styles.list = {
      listStyleType: "none",
      textIndent: 0,
      margin: 0,
      padding: 0,
      fontSize: size(1)
    };

    styles.listItem = {
      display: "inline",
      padding: size.many(0, 0, 0, 0.5)
    };

    styles.firstListItem = Object.assign({}, styles.listItem, {
      padding: 0
    });

    styles.iconLink = {
      color: styles.inner.color
    };

    tile = (
      <article style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <h1 style={styles.head} title="Manager &mdash; Developer &mdash; Loves a Good Pen">Rudolph Jakob Heuser</h1>
          <p style={styles.subhead}>
            A playground of ideas, experiences, and technologies.
          </p>
          <ul style={styles.list}>
            <li style={styles.firstListItem}><a href="http://www.linkedin.com/in/jakobheuser" title="Resume on LinkedIn" style={styles.iconLink}><span className="x-fa x-fa-linkedin"></span></a></li>
            <li style={styles.listItem}><a href="https://www.github.com/Jakobo" title="Code on GitHub" style={styles.iconLink}><span className="x-fa x-fa-github"></span></a></li>
            <li style={styles.listItem}><a href="https://www.medium.com/@jakob" title="Writing on Medium" style={styles.iconLink}><span className="x-fa x-fa-medium"></span></a></li>
            <li style={styles.listItem}><a href="https://www.twitter.com/@jakobo" title="Quips on Twitter" style={styles.iconLink}><span className="x-fa x-fa-twitter"></span></a></li>
            <li style={styles.listItem}><a href="https://www.500px.com/jakobo" title="Photos on 500px" style={styles.iconLink}><span className="x-fa x-fa-camera"></span></a></li>
            <li style={styles.listItem}><a href="https://www.presentate.com/~3zqP2X" title="Talks on Presentate" style={styles.iconLink}><span className="x-fa x-fa-desktop"></span></a></li>
          </ul>
        </div>
      </article>
    );

    return tile;
  }
});
