import React, { PropTypes } from "react"
import Radium from "radium"

import { forceMaxWidth, forceMaxHeight } from "../primitives/layout"

const fadeInKeyframes = Radium.keyframes({
  from: {
    opacity: "0"
  },
  to: {
    opacity: "1"
  }
});

const FadeIn = (props) => {
  const { children } = props

  const styles = Object.assign({},
    forceMaxWidth,
    forceMaxHeight,
    {
      animation: "x 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335)",
      animationName: fadeInKeyframes,
      animationFillMode: "fowards"
    }
  )

  return <div style={styles}>{children}</div>
}

FadeIn.propTypes = {
  children: PropTypes.node
}

FadeIn.defaultProps = {}

export default Radium(FadeIn)
