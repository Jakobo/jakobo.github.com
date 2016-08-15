import React, { PropTypes } from "react"
import Radium from "radium"

import Tile from "styleguide/tile"
import { propTypes, defaultProps } from "./tiles_common.js"

const PinterestPin = (props) => {
  const { source, description, image, color, variant, loadData, ready } = props
  const canRender = (source && description && image)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"s"} loading={true}></Tile>
  }

  return <Tile size={"s"}>
    <article>
      <img src={image} />
      <a href={source}>{description}</a>
    </article>
  </Tile>
};

PinterestPin.propTypes = Object.assign({}, propTypes, {
  source: PropTypes.string,
  description: PropTypes.string
})

PinterestPin.defaultProps = Object.assign({}, defaultProps, {
  source: "",
  description: ""
})

export default Radium(PinterestPin);
