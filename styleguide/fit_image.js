import React, { PropTypes } from "react"
import Radium from "radium"
import Dimensions from "react-dimensions"

class FitImg extends React.Component {
  render() {
    // strip off the props added by Dimensions so a ...props works
    const strip = ["getSrc", "containerWidth", "containerHeight", "updateDimensions"]
    let newProps = Object.assign({}, this.props, {
      src : (this.props.getSrc) ? this.props.getSrc(this.props.src,
                                                    this.props.containerWidth,
                                                    this.props.containerHeight)
                                : this.props.src,
      width: this.props.containerWidth,
      height: this.props.containerHeight
    })
    strip.forEach((o) => {
      delete newProps[o]
    })

    return <img {...newProps} />
  }
}

FitImg.propTypes = {
  getSrc: PropTypes.func
}

FitImg.defaultProps = {

}

export default Dimensions()(FitImg)
