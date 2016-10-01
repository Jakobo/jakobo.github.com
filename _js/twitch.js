// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"

import Twitch from "./components/twitch"

render(<Twitch/>, document.getElementById('app'));
