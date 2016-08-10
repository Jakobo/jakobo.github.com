import React, { PropTypes } from "react";

const MediumArticle = ({source, title, image, loadData, ready}) => {
  // component wants to be fetched from an external data source
  if (loadData && !ready) {
    loadData();
    return null;
  }

  return <article>
    <img src={image} />
    <a href={source}>{title}</a>
  </article>
};


MediumArticle.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  loadData: PropTypes.func,
  ready: PropTypes.bool
};

export default MediumArticle;
