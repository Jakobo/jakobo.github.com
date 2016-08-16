import React, { PropTypes } from "react"
import Radium from "radium"

import Tile from "styleguide/tile"
import FitImg from "styleguide/fit_image"
import { propTypes, defaultProps } from "./tiles_common.js"
import { forceMaxWidth, forceMaxHeight, absolute, pinTop, pinLeft, hideTextLeft } from "styleguide/primitives/layout"

const PinterestPin = (props) => {
  const { source, description, image, link, variations, color, variant, loadData, ready } = props
  const canRender = (source && description && image)

  const getSrc = (oldSrc, width) => {
    // find a variation that works
    let url = oldSrc
    Object.keys(variations).forEach((name) => {
      const inst = variations[name]
      if (width >= inst.start && width <= inst.end) {
        url = inst.url
      }
    })
    return url
  }

  const clickableStyle = Object.assign({},
    forceMaxWidth,
    forceMaxHeight,
    absolute,
    pinTop,
    pinLeft,
    hideTextLeft
  )

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"s"} loading={true}></Tile>
  }

  return <Tile size={"s"}>
    <FitImg src={image} getSrc={getSrc} exact={false}
      alt={`${description} - on Pinterest`} title={`${description} - on Pinterest`} />
    <a href={link} style={clickableStyle} title={`${description} - on Pinterest`}>{`${description} - on Pinterest`}</a>
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
