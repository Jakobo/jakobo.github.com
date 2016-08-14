import { PropTypes } from "react";

export const defaultProps = {
  size: "s",
  color: "base",
  variant: "light",
  loadData: null,
  ready: true
};

export const propTypes = {
  size: PropTypes.oneOf(["s", "m", "l"]),
  color: PropTypes.oneOf(["base", "minus", "plus", "complement"]),
  variant: PropTypes.oneOf(["plain", "light", "dark"]),
  loadData: PropTypes.func,
  ready: PropTypes.bool
};
