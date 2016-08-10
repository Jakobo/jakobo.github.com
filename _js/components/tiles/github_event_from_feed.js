// container component that performs a fetch
import { connect } from "react-redux"
import React, { PropTypes } from "react"
import GithubEvent from "./github_event"
import { TYPE_GITHUB, fetchDataIfNeeded } from "../../actions"


const mapStateToProps = (state, ownProps) => {
  if (!state.githubEvents.isComplete) return {};
  const atIndex = state.githubEvents.items[ownProps.index] || {};

  return {
    ready: true,
    source: atIndex.link || null,
    description: atIndex.text || null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchDataIfNeeded(TYPE_GITHUB))
    }
  }
}

const GithubEventFromFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubEvent);

export default GithubEventFromFeed;
