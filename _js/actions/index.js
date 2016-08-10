import  * as githubData from "../data/github"
import  * as googleData from "../data/google_photo";
import  * as mediumData from "../data/medium";
import  * as pinterestData from "../data/pinterest";
import  * as twitterData from "../data/twitter";

// data actions
export const TYPE_GITHUB = "githubEvents"
export const REQUEST_GITHUB = "REQUEST_GITHUB"
export const RECEIVE_GITHUB = "RECEIVE_GITHUB"

export const TYPE_GOOGLEPHOTO = "googlePhotos"
export const REQUEST_GOOGLEPHOTO = "REQUEST_GOOGLEPHOTO"
export const RECEIVE_GOOGLEPHOTO = "RECEIVE_GOOGLEPHOTO"

export const TYPE_MEDIUM = "mediumArticles"
export const REQUEST_MEDIUM = "REQUEST_MEDIUM"
export const RECEIVE_MEDIUM = "RECEIVE_MEDIUM"

export const TYPE_PINTEREST = "pinterestPins"
export const REQUEST_PINTEREST = "REQUEST_PINTEREST"
export const RECEIVE_PINTEREST = "RECEIVE_PINTEREST"

export const TYPE_TWITTER = "twitterTweets"
export const REQUEST_TWITTER = "REQUEST_TWITTER"
export const RECEIVE_TWITTER = "RECEIVE_TWITTER"

const mapping = {
  githubEvents:   [REQUEST_GITHUB, RECEIVE_GITHUB, githubData],
  googlePhotos:   [REQUEST_GOOGLEPHOTO, RECEIVE_GOOGLEPHOTO, googleData],
  mediumArticles: [REQUEST_MEDIUM, RECEIVE_MEDIUM, mediumData],
  pinterestPins:  [REQUEST_PINTEREST, RECEIVE_PINTEREST, pinterestData],
  twitterTweets:  [REQUEST_TWITTER, RECEIVE_TWITTER, twitterData]
};

function shouldFetchData(state, type) {
  // don't fetch data in progress or done
  return !(state[type].isFetching || state[type].isComplete);
}

function getConst(type) {
  return [mapping[type][0], mapping[type][1]];
}

function getEngine(type) {
  return mapping[type][2];
}

function requestData(classification) {
  return {
    type: getConst(classification)[0],
    classification
  };
}

function receiveData(classification, json) {
  return {
    type: getConst(classification)[1],
    classification,
    items: getEngine(classification).toItems(json),
    timestamp: Date.now()
  }
}

function fetchData(type) {
  return dispatch => {
    dispatch(requestData(type));
    return getEngine(type).get()
      .then(response => response.json())
      .then(json => dispatch(receiveData(type, json)))
  }
}

export function fetchDataIfNeeded(type) {
  if (!mapping[type]) {
    throw new Error("Unknown type: " + type);
  }
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), type)) {
      return dispatch(fetchData(type));
    }
  };
};
