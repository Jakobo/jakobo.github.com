/*
The main felocity app is where the layout is driven from. The idea is to
generate data as a series of tiles, letting Isotope do all the heavy lifting
on the layout side. Each component at this level needs to be compatible with
the following attributes:
  tile-width: how many tiles wide is this item?
  tile-height: how many tiles tall is this item?
Tiles must render their top level element as an <article> with a class of "tile"
for Isotope to properly detect them.

The size of the individual items will be controlled by CSS with breakpoints
that scale up in size.

Normally, I'm opposed to the non semantic tags, but the section/article
relationship made sense here.
*/

var React = require("react");
var Isotope = require("isotope-layout");

var Github = require("./gdrive-github");
var FiveHundredPx = require("./gdrive-500px");
var Medium = require("./gdrive-medium");

module.exports = React.createClass({
  isotope: null,
  componentDidMount: function() {
    // if (!this.isotope) {
    //   this.isotope = new Isotope(this.refs.tiles.getDomNode(), {
    //    item_selector: ".tile"
    //  });
    // }
  },
  componentDidUpdate: function() {
    if (!this.isotope) return;
    this.isotope.reloadItems();
    this.isotope.layout();
    this.isotope.arrange();
  },
  componentWillUnmount: function() {
    if (!this.isotope) return;
    this.isotope.destroy();
    this.isotope = null;
  },

  /*
  <!--FiveHundredPx source="1aETLR_5FGF2yLqxx32Voqz1g5NxA1yMaLiVz98TZyRk"
    item="1" tile-width="2" tile-height="2" / -->
  <!-- FiveHundredPx source="1aETLR_5FGF2yLqxx32Voqz1g5NxA1yMaLiVz98TZyRk"
    item="2" tile-width="1" tile-height="2" / -->
  <!-- Medium source=""
    item="2" tile-width="2" tile-height="1" / -->
  */

  render: function() {
    return (
      <section ref="tiles">
        <Github source="10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo"
          item="1" tile-width="1" tile-height="1" />
        <Github source="10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo"
          item="2" tile-width="1" tile-height="1" />
        <FiveHundredPx source="1aETLR_5FGF2yLqxx32Voqz1g5NxA1yMaLiVz98TZyRk"
          item="1" tile-width="2" tile-height="2" />
        <Medium source="1RXKjQ57k07-GEhctT4MHWflxK840ENcsM_MXzuKiKLw"
          item="1" tile-width="2" tile-height="1" />
        <Github source="10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo"
          item="3" tile-width="1" tile-height="1" />
        <Github source="10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo"
          item="4" tile-width="1" tile-height="1" />
        <Github source="10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo"
          item="5" tile-width="1" tile-height="1" />
      </section>
    );
  }
});
