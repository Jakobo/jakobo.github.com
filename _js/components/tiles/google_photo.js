import React, { PropTypes } from "react";

const GooglePhoto = ({link, src, description, loadData, ready}) => {
  // component wants to be fetched from an external data source
  if (loadData && !ready) {
    loadData();
    return null;
  }

  return <article>
    <a href={link}><img src={src} alt={description}/></a>
  </article>
};


GooglePhoto.propTypes = {
  link: PropTypes.string,
  src: PropTypes.string,
  description: PropTypes.string,
  loadData: PropTypes.func,
  ready: PropTypes.bool
};

export default GooglePhoto;
