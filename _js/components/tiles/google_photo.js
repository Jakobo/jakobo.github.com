import React, { PropTypes } from "react";
import Radium from "radium"

import Headline from "styleguide/headline"
import Tile from "styleguide/tile"
import FitImg from "styleguide/fit_image"
import { propTypes, defaultProps } from "./tiles_common.js"
import { noUnderline } from "styleguide/primitives/typography"
import { forceMaxWidth, forceMaxHeight, absolute, borderBox,
         pinTop, pinLeft, pinBottomish, hideTextLeft } from "styleguide/primitives/layout"

const GooglePhoto = (props) => {
  const { link, src, variations, description, color, variant, loadData, ready } = props
  const canRender = (link && src && description)

  const getSrc = (oldSrc, width, height) => {
    const i = variations.bestCrop
    return i.url.replace(i.width, width).replace(i.height, height)
  }

  const clickableStyle = Object.assign({},
    forceMaxWidth,
    forceMaxHeight,
    absolute,
    pinTop,
    pinLeft,
    hideTextLeft
  )

  const headlineStyle = Object.assign({},
    noUnderline
  )

  const headlinePlacement = Object.assign({},
    borderBox,
    forceMaxWidth,
    absolute,
    pinBottomish,
    pinLeft,
    {
      paddingLeft: "2%",
      paddingRight: "2%"
    }
  )

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"m"} color={color} variant={variant} loading={true}></Tile>
  }

  return <Tile size={"m"} color={color} variant={variant}>
    <FitImg src={src} alt={description} title={description} getSrc={getSrc} />
    <div style={headlinePlacement}>
      <a href={link} title={description} style={headlineStyle}>
        <Headline size={"m"} overlay={true} stroke={true}>{description}</Headline>
      </a>
    </div>
    <a href={link} style={clickableStyle} title={description}>{description}</a>
  </Tile>
}


GooglePhoto.propTypes = Object.assign({}, propTypes, {
  link: PropTypes.string,
  src: PropTypes.string,
  description: PropTypes.string,
  variations: PropTypes.object
})

GooglePhoto.defaultProps = Object.assign({}, defaultProps, {
  link: "",
  src: "",
  description: "",
  variations: {}
})

export default Radium(GooglePhoto)
