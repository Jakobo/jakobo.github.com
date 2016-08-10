// container component that performs a fetch
import { connect } from "react-redux"
import React, { PropTypes } from "react"
import TwitterTweet from "./twitter_tweet"
import { TYPE_TWITTER, fetchDataIfNeeded } from "../../actions"


const mapStateToProps = (state, ownProps) => {
  if (!state.twitterTweets.isComplete) return {};
  const atIndex = state.twitterTweets.items[ownProps.index] || {};

  return {
    ready: true,
    source: atIndex.link || null,
    content: atIndex.status || null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchDataIfNeeded(TYPE_TWITTER))
    }
  }
}

const TwitterTweetFromFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(TwitterTweet);

export default TwitterTweetFromFeed;
