import React, { PropTypes } from "react"
import Radium from "radium"

import Text from "styleguide/text"
import Headline from "styleguide/text"
import Tile, { fullLink, watermark } from "styleguide/tile"
import { propTypes, defaultProps } from "./tiles_common.js"

import FATwitter from "react-icons/fa/twitter"

const TwitterTweet = (props) => {
  const { source, content, color, variant, loadData, ready } = props
  const canRender = (source && content)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"s"} color={"plus"} variant={"light"} loading={true}></Tile>
  }

  return <Tile size={"s"} color={"plus"} variant={"light"}>
    <FATwitter style={watermark} />
    <a href={source} style={fullLink}><Text size="l" color={"plus"} variant={"light"} overlay={true}>{content}</Text></a>
  </Tile>
}

TwitterTweet.propTypes = Object.assign({}, propTypes, {
  source: PropTypes.string,
  content: PropTypes.string
})

TwitterTweet.defaultProps = Object.assign({}, defaultProps, {
  source: "",
  content: ""
})

export default Radium(TwitterTweet);
