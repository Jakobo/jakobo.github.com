import React, { PropTypes } from "react"
import Radium from "radium"

import Tile from "styleguide/tile"
import Logo from "../../../_img/logo.svg"

import { forceMaxWidth, oneThirdHeight, oneQuarterWidth,
  flex, flexItemsCenter, flexJustifyAround, flexJustifyBetween, flexWrap,
  block, noMargin, noPadding, padAll, padText, borderBox,
  absolute, pinBottomish } from "styleguide/primitives/layout"
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

const flexContainerStyles = Object.assign({},
  oneThirdHeight,
  forceMaxWidth,
  padAll,
  flex,
  flexItemsCenter,
  flexJustifyAround
)

const logoStyles = Object.assign({},
  oneQuarterWidth
)

const taglineStyles = Object.assign({},
  padAll
)

const aboutStyles = Object.assign({},
  borderBox,
  padAll,
  forceMaxWidth,
  block,
  center,
  absolute,
  pinBottomish,
  {
    opacity: "0.6"
  }
)

const listStyles = Object.assign({},
  listStyleNone,
  noIndent,
  noMargin,
  noPadding,
  forceMaxWidth,
  flex,
  flexWrap,
  flexJustifyBetween
)

const listItemStyles = Object.assign({},
  padText
)

const Title = () => {
  return <Tile size={"s"}>
    <div style={flexContainerStyles}>
      <Logo style={logoStyles} />
      <div style={taglineStyles}>
        <Headline size={"xs"}>Rudolph Jakob Heuser</Headline>
      </div>
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
    <Text size={"m"} style={aboutStyles}>A playground of ideas, experiences, and&nbsp;technologies.</Text>
  </Tile>
};

export default Radium(Title);
