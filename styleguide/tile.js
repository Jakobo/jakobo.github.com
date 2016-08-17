import React, { PropTypes } from "react"
import Radium from "radium"

import Spinner from "./spinner"
import FadeIn from "./animations/fade_in"

import { canvas, reset, tile, edges } from "./primitives/tiles"
import { forceMaxWidth, forceMaxHeight, absolute, pinTop, pinLeft,
  hideTextLeft, borderBox, padAll, pinRightish, pinBottomish,
  twoThirdsWidth, twoThirdsHeight, block } from "./primitives/layout"
import { noUnderline } from "./primitives/typography"
import { swatches } from "./primitives/colors"

const Tile = (props) => {
  const { color, children, size, variant, loading } = props

  const outerStyle = Object.assign({},
    tile[size],
    canvas
  )

  const edgesStyle = Object.assign({},
    edges
  )

  const innerStyle = Object.assign({}, reset, {
    backgroundColor: swatches[color][variant].color
  })

  return <div key={"outer"} style={outerStyle} className={`tile-${size}`}>
    <div key={"edges"} style={edgesStyle}>
      <div key={"inner"} style={innerStyle}>
        {(() => {
          if (loading) {
            return <Spinner size={size} color={color} variant={variant} absolute={true}></Spinner>
          }
          return <FadeIn>{children}</FadeIn>
        })()}
      </div>
    </div>
  </div>
}

Tile.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  size: PropTypes.oneOf(["s", "m", "l"]).isRequired
}

Tile.defaultProps = {
  color: "base",
  variant: "light"
}

export default Radium(Tile)

export const fullLink = Object.assign({},
  block,
  forceMaxWidth,
  forceMaxHeight,
  absolute,
  pinTop,
  pinLeft,
  noUnderline,
  borderBox,
  padAll
)

export const fullLinkNoText = Object.assign({}, fullLink, hideTextLeft)

export const watermark = Object.assign({},
  pinRightish,
  pinBottomish,
  twoThirdsWidth,
  twoThirdsHeight,
  absolute,
  {
    opacity: "0.05"
  }
)
