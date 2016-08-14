import React, { PropTypes } from "react"
import Radium, { Style } from "radium"

import Spinner from "./spinner"

import { canvas, reset, tile, edges } from "./primitives/tiles"
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

  return <div key="tile" style={outerStyle} className={`tile-${size}`}>
    <div key="edges" style={edgesStyle}>
      <div key="inner" style={innerStyle}>
        {(() => {
          if (loading || true) {
            return <Spinner key="spin" size={size} color={color} variant={variant} absolute={true}></Spinner>
          }
          return {children}
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
