import React, { PropTypes } from "react";
import classnames from "classnames/bind";

import styles from "./tile.css";
import Swatches from "./util/now_swatches";

const cx = classnames.bind(styles);

export default function Tile(props) {
  const { color, children, size, variant } = props;
  const ds = {
    backgroundColor: Swatches[color][variant]
  };
  const cs = cx("tile-container", `tile-${size}`);
  const csi = cx("tile-reset");

  console.log(cs);
  return <div className={cs}>
    <div className={csi}>
      {children}
    </div>
  </div>
}

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  size: PropTypes.oneOf(["s", "m", "l"]).isRequired
};

Tile.defaultProps = {
  color: "base",
  variant: "light",
  stroke: false
};
