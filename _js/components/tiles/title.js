import React, { PropTypes } from "react"
import Radium from "radium"

import Tile from "styleguide/tile"
import Logo from "../../../_img/logo.svg"

import { oneThirdWidth, oneThirdHeight, noMargin,
  noPadding, padAll, padText, inlineBlock} from "styleguide/primitives/layout"
import { center, listStyleNone, noIndent } from "styleguide/primitives/typography"

import Headline from "styleguide/headline"
import Text from "styleguide/text"

// TODO webpack 2 will clean up dead code for this easier
import FALinkedIn from "react-icons/fa/linkedin"
import FAGithub from "react-icons/fa/github"
import FAMedium from "react-icons/fa/medium"
import FATwitter from "react-icons/fa/twitter"
import FACamera from "react-icons/fa/camera"
import FAPinterest from "react-icons/fa/pinterest"

// const Logo = require('babel!svg-react!../../../img/logo.svg?name=Logo');

const logoStyles = Object.assign({},
  oneThirdWidth,
  oneThirdHeight
)

const h1Styles = Object.assign({},
  center,
  padAll
)

const listStyles = Object.assign({},
  listStyleNone,
  noIndent,
  noMargin,
  center,
  padAll
)

const listItemStyles = Object.assign({},
  inlineBlock,
  padText
)

const Title = () => {
  return <Tile size={"s"}>
    <article>
      <div style={h1Styles}>
        <Logo style={logoStyles} />
        <Headline size={"xs"}>Rudolph Jakob Heuser</Headline>
      </div>
      <ul style={listStyles}>
        <li style={listItemStyles}>
          <a href="http://www.linkedin.com/in/jakobheuser" title="Resume on LinkedIn"><Headline size={"s"}><FALinkedIn /></Headline></a>
        </li>
        <li style={listItemStyles}>
          <a href="https://www.github.com/Jakobo" title="Code on GitHub"><Headline size={"s"}><FAGithub /></Headline></a>
        </li>
        <li style={listItemStyles}>
          <a href="https://www.medium.com/@jakob" title="Writing on Medium"><Headline size={"s"}><FAMedium /></Headline></a>
        </li>
        <li style={listItemStyles}>
          <a href="https://www.twitter.com/@jakobo" title="Quips on Twitter"><Headline size={"s"}><FATwitter /></Headline></a>
        </li>
        <li style={listItemStyles}>
          <a href="https://goo.gl/photos/AmCAMswjdGxR1eVm7" title="Photos on Google"><Headline size={"s"}><FACamera /></Headline></a>
        </li>
        <li style={listItemStyles}>
          <a href="https://www.pinterest.com/jakobo/" title="Neat Things on Pinterest"><Headline size={"s"}><FAPinterest /></Headline></a>
        </li>
      </ul>
    </article>
  </Tile>
};

export default Radium(Title);
