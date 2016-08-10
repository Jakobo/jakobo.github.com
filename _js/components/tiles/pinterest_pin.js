import React, { PropTypes } from "react";

const PinterestPin = ({source, description, image, loadData, ready}) => {
  // component wants to be fetched from an external data source
  if (loadData && !ready) {
    loadData();
    return null;
  }
  
  return <article>
    <img src={image} />
    <a href={source}>{description}</a>
  </article>
};


PinterestPin.propTypes = {
  source: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  loadData: PropTypes.func,
  ready: PropTypes.bool
};

export default PinterestPin;
