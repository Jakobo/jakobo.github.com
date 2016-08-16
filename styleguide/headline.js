import React, { PropTypes } from "react";
import Radium, { Style } from "radium"

import { display, bold as tBold, underline as tUnderline, noUnderline as tNoUnderline,
  sansSerif, antialiased } from "./primitives/typography"
import { absolute, relative, pinLeft, pinTop } from "./primitives/layout"
import { swatches } from "./primitives/colors"

const Headline = (props) => {
  const { color, variant, bold, underline, overlay, stroke, doubleStroke, children, size, style } = props;

  const container = Object.assign({},
    relative
  )

  const strokeColor = "#FFF"
  const doubleStrokeColor = "#808080"

  const styles = Object.assign({},
    {
      color: swatches[color][variant].overlay,
      zIndex: "3"
    },
    (underline === true) ? tUnderline : {},
    (underline === false) ? tNoUnderline : {},
    (bold || stroke || doubleStroke) ? tBold : {},
    antialiased,
    sansSerif,
    display[size],
    pinTop,
    pinLeft,
    style
  );

  const singleStyles = Object.assign({}, styles, absolute, {
    textShadow: `-1px -1px 0 ${strokeColor},
                 1px -1px 0 ${strokeColor},
                 -1px 1px 0 ${strokeColor},
                 1px 1px 0 ${strokeColor},
                 0px 0px 2px ${strokeColor}`,
    opacity: "0.8",
    zIndex: "2"
  })

  const doubleStyles = Object.assign({}, singleStyles, {
    textShadow: `-3px -3px 0 ${doubleStrokeColor},
                 3px -3px 0 ${doubleStrokeColor},
                 -3px 3px 0 ${doubleStrokeColor},
                 3px 3px 0 ${doubleStrokeColor},
                 0px 0px 6px ${doubleStrokeColor}`,
    opacity: "0.5",
    zIndex: "1"
  })

  if (doubleStroke) {
    return <div style={container}>
      <span style={singleStyles}>{children}</span>
      <span style={styles}>{children}</span>
      <span style={doubleStyles}>{children}</span>
    </div>
  }

  if (stroke) {
    return <div style={container}>
      <span style={singleStyles}>{children}</span>
      <span style={styles}>{children}</span>
    </div>
  }

  return <div style={container}>
    <span style={styles}>{children}</span>
  </div>
}

Headline.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired,
  style: PropTypes.object
};

Headline.defaultProps = {
  bold: false,
  color: "base",
  variant: "plain",
  style: {}
};

export default Radium(Headline);
