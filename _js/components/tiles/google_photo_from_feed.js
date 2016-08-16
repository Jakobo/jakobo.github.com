// container component that performs a fetch
import { connect } from "react-redux"
import React, { PropTypes } from "react"
import GooglePhoto from "./google_photo"
import { TYPE_GOOGLEPHOTO, fetchDataIfNeeded } from "../../actions"


const mapStateToProps = (state, ownProps) => {
  if (!state.googlePhotos.isComplete) return {};
  const atIndex = state.googlePhotos.items[ownProps.index] || {};

  return {
    ready: true,
    link: atIndex.link || null,
    src: atIndex.img || null,
    altImages: atIndex.altImages || null,
    description: atIndex.description || null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchDataIfNeeded(TYPE_GOOGLEPHOTO))
    }
  }
}

const GooglePhotoFromFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GooglePhoto);

export default GooglePhotoFromFeed;
