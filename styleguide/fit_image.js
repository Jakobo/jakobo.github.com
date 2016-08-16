import React, { PropTypes } from "react"
import Radium from "radium"
import Dimensions from "react-dimensions"

import { relative, forceMaxWidth, forceMaxHeight, overflowHidden, inlineBlock } from "./primitives/layout"

class FitImg extends React.Component {
  render() {
    let newProps = Object.assign({}, this.props,
      {
        src : (this.props.getSrc) ? this.props.getSrc(this.props.src,
                                                      this.props.containerWidth,
                                                      this.props.containerHeight)
                                  : this.props.src
      }
    )

    const exactStyles = Object.assign({},
      this.props.styles || {}, {
        width: this.props.containerWidth,
        height: this.props.containerHeight
      }
    )

    const nonExactStyles = Object.assign({},
      this.props.styles || {},
      relative,
      {
        minWidth: this.props.containerWidth,
        minHeight: this.props.containerHeight,
        left: "-50%",
        marginTop: `${-1 * this.props.containerHeight / 2}px`,
      }
    )

    const outerStyle = Object.assign({},
      forceMaxWidth,
      forceMaxHeight,
      overflowHidden
    )

    const innerStyle = Object.assign({},
      inlineBlock,
      relative,
      {
        right: "-50%",
        bottom: "-25%"
      }
    )

    // get rid of all props introduced by the Dimensions() component
    // this way ...props is successful when applied to an image
    const strip = ["getSrc", "containerWidth", "containerHeight", "updateDimensions", "options", "exact"]
    strip.forEach((o) => {
      delete newProps[o]
    })

    // if it is exact, then just apply the styles to the image. Otherwise,
    // take the best-fit image (from getSrc()) and place it centered using
    // inline-block positioning hacks
    if (this.props.exact) {
      return <img style={exactStyles} {...newProps} />
    }
    else {
      return <div style={outerStyle}>
        <div style={innerStyle}>
          <img style={nonExactStyles} {...newProps} />
        </div>
      </div>
    }
  }
}

FitImg.propTypes = {
  getSrc: PropTypes.func,
  exact: PropTypes.bool
}

FitImg.defaultProps = {
  exact: true
}

export default Dimensions()(FitImg)
