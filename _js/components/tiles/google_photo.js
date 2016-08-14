import React, { PropTypes } from "react";
import Headline from "styleguide/headline"
import Tile from "styleguide/tile"

import { propTypes, defaultProps } from "./tiles_common.js"

const GooglePhoto = (props) => {
  const { link, src, description, color, variant, loadData, ready } = props
  const canRender = (link && src && description)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"m"} color={color} variant={variant} loading={true}></Tile>
  }

  return <Tile size={"m"}>
    <article>
      <a href={link}><img src={src} alt={description} title={description}/></a>
      <div><Headline size={"m"} overlay={true} stroke={"#fff"}>{description}</Headline></div>
    </article>
  </Tile>
};


GooglePhoto.propTypes = Object.assign({}, propTypes, {
  link: PropTypes.string,
  src: PropTypes.string,
  description: PropTypes.string
});

GooglePhoto.defaultProps = Object.assign({}, defaultProps, {
  link: "",
  src: "",
  description: ""
});

export default GooglePhoto;
