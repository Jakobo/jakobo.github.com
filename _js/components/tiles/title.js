import React, { PropTypes } from "react"

import Logo from "../../../_img/logo.svg"

// TODO webpack 2 will clean up dead code for this easier
import FALinkedIn from "react-icons/fa/linkedin"
import FAGithub from "react-icons/fa/github"
import FAMedium from "react-icons/fa/medium"
import FATwitter from "react-icons/fa/twitter"
import FACamera from "react-icons/fa/camera"
import FAPinterest from "react-icons/fa/pinterest"

// const Logo = require('babel!svg-react!../../../img/logo.svg?name=Logo');

const Title = () => {
  return <article>
    <h1 title="Manager &mdash; Developer &mdash; Loves a Good Pen">
      <Logo />
      Rudolph Jakob Heuser
    </h1>
    <p>
      A playground of ideas, experiences, and technologies.
    </p>
    <ul>
      <li>
        <a href="http://www.linkedin.com/in/jakobheuser" title="Resume on LinkedIn"><FALinkedIn /></a>
      </li>
      <li>
        <a href="https://www.github.com/Jakobo" title="Code on GitHub"><FAGithub /></a>
      </li>
      <li>
        <a href="https://www.medium.com/@jakob" title="Writing on Medium"><FAMedium /></a>
      </li>
      <li>
        <a href="https://www.twitter.com/@jakobo" title="Quips on Twitter"><FATwitter /></a>
      </li>
      <li>
        <a href="https://goo.gl/photos/AmCAMswjdGxR1eVm7" title="Photos on Google"><FACamera /></a>
      </li>
      <li>
        <a href="https://www.pinterest.com/jakobo/" title="Neat Things on Pinterest"><FAPinterest /></a>
      </li>
    </ul>
  </article>
};

export default Title;
