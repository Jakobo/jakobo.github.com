import {
  REQUEST_GITHUB, RECEIVE_GITHUB,
  REQUEST_MEDIUM, RECEIVE_MEDIUM,
  REQUEST_GOOGLEPHOTO, RECEIVE_GOOGLEPHOTO,
  REQUEST_TWITTER, RECEIVE_TWITTER,
  REQUEST_PINTEREST, RECEIVE_PINTEREST
  } from "../actions";

const initialState = {
  githubEvents: {
    isFetching: false,
    isComplete: false,
    items: []
  },
  googlePhotos: {
    isFetching: false,
    isComplete: false,
    items: []
  },
  mediumArticles: {
    isFetching: false,
    isComplete: false,
    items: []
  },
  pinterestPins: {
    isFetching: false,
    isComplete: false,
    items: []
  },
  twitterTweets: {
    isFetching: false,
    isComplete: false,
    items: []
  }
};

function createJSONReducer(request, receive) {
  return function(state, action) {
    if (action.type === request) {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    else if (action.type === receive) {
      return Object.assign({}, state, {
        isFetching: false,
        isComplete: true,
        items: action.items,
        retrievedAt: action.timestamp
      });
    }
    else {
      return state;
    }
  }
}

export default function rootReducer(state = initialState, action) {
  return {
    githubEvents: createJSONReducer(REQUEST_GITHUB, RECEIVE_GITHUB)(state.githubEvents, action),
    googlePhotos: createJSONReducer(REQUEST_GOOGLEPHOTO, RECEIVE_GOOGLEPHOTO)(state.googlePhotos, action),
    mediumArticles: createJSONReducer(REQUEST_MEDIUM, RECEIVE_MEDIUM)(state.mediumArticles, action),
    pinterestPins: createJSONReducer(REQUEST_PINTEREST, RECEIVE_PINTEREST)(state.pinterestPins, action),
    twitterTweets: createJSONReducer(REQUEST_TWITTER, RECEIVE_TWITTER)(state.twitterTweets, action)
  };
}
