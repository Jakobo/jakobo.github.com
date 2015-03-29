var React = require("react");
var m = require("merge");

var ghc = require("../constants/gdrive-github");

var GHStore = require("../stores/gdrive-github");
var tileStore = require("../stores/tile-layout");
var IsotopeActions = require("../actions/isotope");

var tileCSS = require("../common/tiles");

var githubClassMatch = {
  comment: { r: / commented on /, c: "octicon-comment-discussion" },
  issue: { r: / opened issue /, c: "octicon-bug" },
  push: { r: / pushed to /, c: "octicon-repo-push" },
  branch: { r: / created branch /, c: "octicon-git-branch" },
  pr: { r: / opened pull request /, c: "octicon-git-pull-request" },
  fork: { r: / forked /, c: "octicon-repo-forked" },
  create: { r: / created repository /, c: "octicon-repo" },
  close: { r: / closed /, c: "octicon-x" }
}

function getClassFromText(text) {
  var noMatchClass = "mega-octicon octicon-mark-github";
  for (var type in githubClassMatch) {
    if (githubClassMatch[type].r.test(text)) {
      return ["mega-octicon", githubClassMatch[type].c].join(" ");
    }
  }
  return noMatchClass;
}

function getState(key) {
  var data = GHStore.get(key);
  var layout = tileStore.get();
  return {
    feed: data,
    layout: layout
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

module.exports = React.createClass({
  getInitialState: function() {
    return getState(this.props.source);
  },
  componentDidMount: function() {
    GHStore.addChangeListener(this._onChange);
    tileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GHStore.removeChangeListener(this._onChange);
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
    var entries = dedupe(this.state.feed, 'text');
    var row = entries[parseInt(this.props.item, 10) - 1] || null;

    if (!row) {
      return null;
    }

    var styles = tileCSS.css(this.state.layout.px, this.props["tile-width"], this.props["tile-height"]);

    tile = (
      <article key={"gdrive-github-" + row.id} style={styles.tile} className={this.props.className}>
        <div style={styles.inner}>
          <div className={getClassFromText(row.text)}></div>
          <p className="github__text">
            <a className="github__link" href={row.link}>{row.text}</a>
          </p>
        </div>
      </article>
    );

    return tile;
  }
});
