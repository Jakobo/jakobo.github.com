"use strict";

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
require("isotope-packery");

var Github = require("./tiles/gdrive-github");
var FiveHundredPx = require("./tiles/gdrive-500px");
var Medium = require("./tiles/gdrive-medium");
var LinkedIn = require("./tiles/gdrive-linkedin");
var Twitter = require("./tiles/gdrive-twitter");
var Title = require("./tiles/title");
var Vcard = require("./tiles/vcard");

var tileStore = require("../stores/tile-layout");
var TileActions = require("../actions/tile");

var isotopeStore = require("../stores/isotope");

var source = {
  github: "10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo",
  fpx: "1aETLR_5FGF2yLqxx32Voqz1g5NxA1yMaLiVz98TZyRk",
  medium: "1RXKjQ57k07-GEhctT4MHWflxK840ENcsM_MXzuKiKLw",
  linkedin: "1liN0-GVlAuRW1CFvkDSnti7gvZrqIquLh1woNvLL_cU",
  twitter: "1QZRRIzZOKobCUqYfMF8c0o8xj13RC2TkyGlT1FX6lnw",
  permanent: "PERMANENT"
};

module.exports = React.createClass({
  isotope: null,
  componentDidMount: function() {
    if (!this.isotope) {
      this.isotope = new Isotope(this.refs.tiles.getDOMNode(), {
       item_selector: ".tile", // eslint-disable-line camelcase
       layoutMode: "packery"
     });
    }

    // if the tiles change (or a new tile appears, redo)
    tileStore.addChangeListener(this._isotopeRedraw);
    isotopeStore.addChangeListener(this._isotopeRedraw);
  },
  componentWillUnmount: function() {
    tileStore.removeChangeListener(this._isotopeRedraw);
    isotopeStore.removeChangeListener(this._isotopeRedraw);
    if (this.isotope) {
      this.isotope.destroy();
      this.isotope = null;
    }
  },
  _isotopeRedraw: function() {
    if (this.isotope) {
      this.isotope.reloadItems();
      this.isotope.layout();
      this.isotope.arrange();
    }
  },

  render: function() {
    return (
      <section ref="tiles">
        <Title tile-width="2" tile-height="1" className="tile" />
        <Github source={source.github} item="1" tile-width="1" tile-height="1" className="tile" />
        <FiveHundredPx source={source.fpx} item="1" tile-width="2" tile-height="2" className="tile" />
        <Github source={source.github} item="2" tile-width="1" tile-height="1" className="tile" />
        <Medium source={source.medium} item="1" tile-width="2" tile-height="1" className="tile" />
        <LinkedIn source={source.linkedin} item="1" tile-width="1" tile-height="1" className="tile" />
        <Github source={source.github} item="3" tile-width="1" tile-height="1" className="tile" />
        <Medium source={source.medium} item="2" tile-width="1" tile-height="1" className="tile" />
        <Twitter source={source.twitter} item="1" tile-width="1" tile-height="1" className="tile" />
        <Github source={source.github} item="4" tile-width="1" tile-height="1" className="tile" />
        <LinkedIn source={source.linkedin} item="2" tile-width="1" tile-height="1" className="tile" />
        <Medium source={source.permanent} name="manifesto" tile-width="1" tile-height="1" className="tile" />
        <Github source={source.github} item="5" tile-width="1" tile-height="1" className="tile" />
        <Vcard tile-width="1" tile-height="1" className="tile" />
      </section>
    );
  }
});
