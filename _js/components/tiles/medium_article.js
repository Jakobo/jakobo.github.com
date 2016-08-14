import React, { PropTypes } from "react";
import Tile from "styleguide/tile"
import { propTypes, defaultProps } from "./tiles_common.js"

const MediumArticle = (props) => {
  const { source, title, image, color, variant, loadData, ready } = props
  const canRender = (source && title && image)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"s"} loading={true}></Tile>
  }

  return <Tile size={"s"}>
    <article>
      <img src={image} />
      <a href={source}>{title}</a>
    </article>
  </Tile>
};

MediumArticle.propTypes = Object.assign({}, propTypes, {
  source: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string
})

MediumArticle.defaultProps = Object.assign({}, defaultProps, {
  source: "",
  title: "",
  image: ""
})

export default MediumArticle;
