import React, { PropTypes } from "react";
import Radium from "radium"

import Tile from "styleguide/tile"
import FitImg from "styleguide/fit_image"
import Text from "styleguide/text"
import { propTypes, defaultProps } from "./tiles_common.js"

import { forceMaxWidth, forceMaxHeight, absolute, padAll,
         pinLeft, pinTop, pinBottom, hideTextLeft, borderBox } from "styleguide/primitives/layout"
import { white, bgBlack } from "styleguide/primitives/colors"

const MediumArticle = (props) => {
  const { source, title, image, altImages, summary, color, variant, loadData, ready } = props
  const canRender = (source && title && image)

  const getSrc = (oldSrc, width, height) => {
    const i = altImages.bestCrop
    return i.url.replace(i.width, width).replace(i.height, height)
  }

  const linkStyle = Object.assign({},
    forceMaxWidth,
    forceMaxHeight,
    absolute,
    pinLeft,
    pinTop,
    hideTextLeft
  )

  const snipStyle = Object.assign({},
    borderBox,
    forceMaxWidth,
    absolute,
    pinBottom,
    pinLeft,
    padAll,
    bgBlack,
    {
      opacity: "0.8"
    }
  )

  const textStyle = Object.assign({},
    white
  )

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"s"} loading={true}></Tile>
  }

  return <Tile size={"s"} color={color} variant={variant}>
    <FitImg src={image} getSrc={getSrc} />
    <a href={source} style={linkStyle}>{title}</a>
    <div style={snipStyle}>
      <Text size={"s"} style={textStyle}>{summary}</Text>
    </div>
    <a href={source} style={linkStyle} title={`Read: ${title} on Medium`}>{title}</a>
  </Tile>
};

MediumArticle.propTypes = Object.assign({}, propTypes, {
  source: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  altImages: PropTypes.object,
  summary: PropTypes.string
})

MediumArticle.defaultProps = Object.assign({}, defaultProps, {
  source: "",
  title: "",
  image: "",
  summary: "",
  altImages: {}
})

export default Radium(MediumArticle);
