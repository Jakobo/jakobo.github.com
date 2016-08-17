import React, { PropTypes } from "react"
import Masonry from "react-masonry-component"

const masonryOptions = {
  columnWidth: ".tile-s",
  itemSelector: ".tile"
}

const masonryStyles = {
  width: "100%"
}

const Grid = (props) => {
  const { children } = props;
  return <Masonry options={masonryOptions} style={masonryStyles}>{children}</Masonry>
};

export default Grid;
