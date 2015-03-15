var React = require("react");

var ghc = require("../constants/gdrive-github");
var Github = require("./gdrive-github");

module.exports = React.createClass({
  render: function() {
    return (
      <Github source={ghc.SOURCE_ID} />
    );
  }
});
