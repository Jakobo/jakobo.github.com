import React, { PropTypes } from "react";

const GithubEvent = ({source, description, loadData, ready}) => {
  // component wants to be fetched from an external data source
  if (loadData && !ready) {
    loadData();
    return null;
  }

  return <article>
    <a href={source}>{description}</a>
  </article>
};

GithubEvent.propTypes = {
  source: PropTypes.string,
  description: PropTypes.string,
  loadData: PropTypes.func,
  ready: PropTypes.bool
};

export default GithubEvent;
