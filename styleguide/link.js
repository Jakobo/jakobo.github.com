import React, { PropTypes } from "react";
import Radium, { Style } from "radium"
import { text, underline as tUnderline, sansSerif, antialiased } from "./primitives/typography"
import { swatches } from "./primitives/colors"

const Link = (props) => {
  const { color, variant, bold, underline, overlay, children, size, style, ...rest } = props;

  const baseStyles = Object.assign({},
    {
      color: (overlay) ? swatches[color][variant].overlay : swatches[color][variant]
    },
    tUnderline,
    antialiased,
    sansSerif,
    text[size],
    style
  );

  const styles = Object.assign({}, baseStyles,
    {
      ":hover": baseStyles,
      ":visited": baseStyles,
      ":active": baseStyles
    }
  )

  return <a style={styles} {...rest}>{children}</a>;
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  overlay: PropTypes.bool,
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired,
  style: PropTypes.object
};

Link.defaultProps = {
  overlay: false,
  color: "base",
  variant: "plain",
  style: {}
};

export default Radium(Link);
