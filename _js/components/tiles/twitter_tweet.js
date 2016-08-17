import React, { PropTypes } from "react"
import Radium from "radium"
import reactStringReplace from "react-string-replace"

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

  let replacedText;
  replacedText = reactStringReplace(content, /(https?:\/\/\S+)/g, (match, i) => {
    return <a key={`url-${i}`} href={match}>{match}</a>
  });
  replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => {
    return <a key={`mention-${i}`} href={`https://twitter.com/${match}`}>@{match}</a>
  });
  replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => {
    return <a key={`hashtag-${i}`} href={`https://twitter.com/hashtag/${match}`}>#{match}</a>
  });


  return <Tile size={"s"} color={"plus"} variant={"light"}>
    <FATwitter style={watermark} />
    <Text size="l" color={"plus"} variant={"light"} overlay={true}>{replacedText}</Text>
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
