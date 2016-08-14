import React, { PropTypes } from "react"
import Masonry from "react-masonry-component"

const masonryOptions = {
  columnWidth: ".tile-s",
  gutter: 0
}

const Grid = (props) => {
  const { children } = props;
  return <Masonry>{children}</Masonry>
};

export default Grid;
