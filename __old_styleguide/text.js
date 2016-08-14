import React, { PropTypes } from "react";
import classnames from "classnames/bind";

import styles from "./";
import Swatches from "./util/now_swatches";

export default function Text(props) {
  const { bold, color, children, size, stroke, variant } = props;
  const ds = {
    color: Swatches[color][variant]
  };
  const cs = cx("sans-serif", `text-${size}`, "antialiased", {
    bold,
    stroke
  });
  return <div className={cs} style={ds}>{children}</div>;
}

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired,
  stroke: PropTypes.bool,
};

Text.defaultProps = {
  bold: false,
  color: "base",
  variant: "plain",
  stroke: false
};
