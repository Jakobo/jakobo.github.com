import React, { PropTypes } from "react";
import Radium, { Style } from "radium"
import { swatches } from "./primitives/colors"
import { display, sizeUp } from "./primitives/typography"
import { relative as useRelative, absolute as useAbsolute, hideTextLeft, overflowHidden } from "./primitives/layout"

/*
Based on ideas from
http://projects.lukehaas.me/css-loaders/
*/

const loaderKeyframes = Radium.keyframes({
  "0%": {
    transform: "rotate(0deg)",
    boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
  },
  "5%": {
    boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
  },
  "10%": {
    boxShadow: "0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em"
  },
  "20%": {
    boxShadow: "0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em"
  },
  "38%": {
    boxShadow: "0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em"
  },
  "59%": {
    boxShadow: "0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em"
  },
  "95%": {
    boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
  },
  "100%": {
    transform: "rotate(360deg)",
    boxShadow: "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em"
  }
}, "loaderKeyframes")

const Spinner = (props) => {
  const { color, variant, size, absolute } = props;

  const relativeStyles = Object.assign({}, useRelative, {
    margin: "0 auto"
  })

  const absoluteStyles = Object.assign({}, useAbsolute, {
    left: "50%",
    top: "50%",
    marginLeft: "-0.5em",
    marginTop: "-0.5em"
  })

  const styles = Object.assign({},
    (absolute) ? absoluteStyles : relativeStyles,
    hideTextLeft, overflowHidden,
    {
      color: swatches[color][variant].overlay,
      fontSize: display[sizeUp(sizeUp(size))].fontSize,
      width: "1em",
      height: "1em",
      borderRadius: "50%",
      transform: "translateZ(0)",
      animation: "x 1.7s infinite ease",
      animationName: loaderKeyframes,
      opacity: "0.4"
    }
  )

  return <div style={styles}>Loading...</div>
}

Spinner.propTypes = {
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired,
  absolute: PropTypes.bool
};

Spinner.defaultProps = {
  color: "base",
  variant: "plain",
  absolute: false
};

export default Radium(Spinner);
