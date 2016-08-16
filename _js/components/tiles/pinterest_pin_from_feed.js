// container component that performs a fetch
import { connect } from "react-redux"
import React, { PropTypes } from "react"
import PinterestPin from "./pinterest_pin"
import { TYPE_PINTEREST, fetchDataIfNeeded } from "../../actions"


const mapStateToProps = (state, ownProps) => {
  if (!state.pinterestPins.isComplete) return {};
  const atIndex = state.pinterestPins.items[ownProps.index] || {};

  return {
    ready: true,
    source: atIndex.link || null,
    description: atIndex.title || null,
    link: atIndex.link || null,
    variations: atIndex.variations || null,
    image: atIndex.img || null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchDataIfNeeded(TYPE_PINTEREST))
    }
  }
}

const PinterestPinFromFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinterestPin);

export default PinterestPinFromFeed;
