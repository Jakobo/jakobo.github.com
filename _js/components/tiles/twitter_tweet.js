import React, { PropTypes } from "react"
import Radium from "radium"

import Tile from "styleguide/tile"
import { propTypes, defaultProps } from "./tiles_common.js"

const TwitterTweet = (props) => {
  const { source, content, color, variant, loadData, ready } = props
  const canRender = (source && content)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  if (!canRender) {
    return <Tile size={"s"} loading={true}></Tile>
  }

  return <Tile size={"s"}>
    <article>
      <a href={source}>{content}</a>
    </article>
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
