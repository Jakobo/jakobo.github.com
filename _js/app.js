// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"

import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"

import { fetchDataIfNeeded } from "./actions"
import rootReducer from "./reducers"

import Felocity from "./components/felocity"
import GoogleAnalytics from "./vendor/ga"

// import Normalize from "normalize/normalize.css"

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

// test all of the data pipelines quickly here...
// console.log(store.getState());
// store.dispatch(fetchDataIfNeeded("githubEvents"));
// store.dispatch(fetchDataIfNeeded("googlePhotos"));
// store.dispatch(fetchDataIfNeeded("mediumArticles"));
// store.dispatch(fetchDataIfNeeded("pinterestPins"));
// store.dispatch(fetchDataIfNeeded("twitterTweets"));

// here we go...
GoogleAnalytics();
render(<Provider store={store}><Felocity/></Provider>, document.getElementById('app'));
