import React, { PropTypes } from "react"
import Radium from "radium"
import reactStringReplace from "react-string-replace"

import Text from "styleguide/text"
import Link from "styleguide/link"
import Headline from "styleguide/text"
import Tile, { fullLinkNoText, watermark, fullText } from "styleguide/tile"
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
    return <Tile size={"s"} color={color} variant={variant} loading={true}></Tile>
  }

  let replacedText;
  replacedText = reactStringReplace(content, /(https?:\/\/\S+)/g, (match, i) => {
    return <Link key={`url-${i}`} size={"l"} href={match} color={color} variant={variant} overlay={true}>{match}</Link>
  });
  replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => {
    return <Link key={`mention-${i}`} size={"l"} color={color} variant={variant} overlay={true} href={`https://twitter.com/${match}`}>@{match}</Link>
  });
  replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => {
    return <Link key={`hashtag-${i}`} size={"l"} color={color} variant={variant} overlay={true} href={`https://twitter.com/hashtag/${match}`}>#{match}</Link>
  });


  return <Tile size={"s"} color={color} variant={variant}>
    <FATwitter style={watermark} />
    <article style={fullText}>
      <Text size="l" color={color} variant={variant} overlay={true}>{replacedText}</Text>
    </article>
    <a href={source} style={fullLinkNoText}>On Twitter: {content}</a>
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
