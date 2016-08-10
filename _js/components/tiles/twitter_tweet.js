import React, { PropTypes } from "react";

const TwitterTweet = ({source, content, loadData, ready}) => {
  // component wants to be fetched from an external data source
  if (loadData && !ready) {
    loadData();
    return null;
  }
  
  return <article>
    <a href={source}>{content}</a>
  </article>
};


TwitterTweet.propTypes = {
  source: PropTypes.string,
  content: PropTypes.string,
  loadData: PropTypes.func,
  ready: PropTypes.bool
};

export default TwitterTweet;
