// container component that performs a fetch
import { connect } from "react-redux"
import React, { PropTypes } from "react"
import MediumArticle from "./medium_article"
import { TYPE_MEDIUM, fetchDataIfNeeded } from "../../actions"


const mapStateToProps = (state, ownProps) => {
  if (!state.mediumArticles.isComplete) return {};
  const atIndex = state.mediumArticles.items[ownProps.index] || {};

  return {
    ready: true,
    source: atIndex.link || null,
    title: atIndex.title || null,
    image: atIndex.img || null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchDataIfNeeded(TYPE_MEDIUM))
    }
  }
}

const MediumArticleFromFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediumArticle);

export default MediumArticleFromFeed;
