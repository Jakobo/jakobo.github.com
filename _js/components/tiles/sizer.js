import React, { PropTypes } from "react"
import Radium from "radium"

import Tile from "styleguide/tile"

const styles = {
  visibility: "hidden",
  float: "left",
  zIndex: "-999"
}

const Sizer = () => {
  return <Tile size={"s"} style={styles} className="tile-sizer" />
};

export default Radium(Sizer);
