import React, { PropTypes } from "react";
import Radium, { Style } from "radium"
import { text, bold as tBold, underline as tUnderline, noUnderline as tNoUnderline,
  sansSerif, antialiased } from "./primitives/typography"
import { swatches } from "./primitives/colors"

const Text = (props) => {
  const { color, variant, bold, underline, overlay, children, size, style} = props;

  const styles = Object.assign({},
    {
      color: swatches[color][variant].overlay
    },
    (underline === true) ? tUnderline : {},
    (underline === false) ? tNoUnderline : {},
    (bold) ? tBold : {},
    antialiased,
    sansSerif,
    text[size],
    style
  );

  return <span style={styles}>{children}</span>;
}

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired,
  style: PropTypes.object
};

Text.defaultProps = {
  bold: false,
  color: "base",
  variant: "plain",
  style: {}
};

export default Radium(Text);
