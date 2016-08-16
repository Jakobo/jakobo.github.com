import React, { PropTypes } from "react"
import Radium from "radium"
import reactStringReplace from "react-string-replace"

import Headline from "styleguide/headline"
import Tile, { watermark } from "styleguide/tile"

import { noUnderline } from "styleguide/primitives/typography"
import { block, forceMaxWidth, forceMaxHeight, absolute, twoThirdsWidth, twoThirdsHeight,
  pinTop, pinLeft, pinBottomish, pinRightish, borderBox, padAll } from "styleguide/primitives/layout"

import { propTypes, defaultProps } from "./tiles_common.js"

import GoCommentDiscussion from "react-icons/lib/go/comment-discussion"
import GoBug from "react-icons/lib/go/bug"
import GoPush from "react-icons/lib/go/repo-push"
import GoBranch from "react-icons/lib/go/git-branch"
import GoPullRequest from "react-icons/lib/go/git-pull-request"
import GoForked from "react-icons/lib/go/repo-forked"
import GoRepo from "react-icons/lib/go/repo"
import GoIssueClosed from "react-icons/lib/go/issue-closed"
import GoMarkGithub from "react-icons/lib/go/mark-github"

const githubNaturalBreaks = /([\-\/A-Z/])/g

const GithubEvent = (props) => {
  const { size, color, variant, source, description, loadData } = props
  const canRender = (description && source)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  const githubClassMatch = {
    comment: { r: / commented on /, c: <GoCommentDiscussion key="icon" style={watermark} /> },
    issue: { r: / opened issue /, c: <GoBug key="icon" style={watermark} /> },
    push: { r: / pushed to /, c: <GoPush key="icon" style={watermark} /> },
    branch: { r: / created branch /, c: <GoBranch key="icon" style={watermark} /> },
    pr: { r: / opened pull request /, c: <GoPullRequest key="icon" style={watermark} /> },
    fork: { r: / forked /, c: <GoForked key="icon" style={watermark} /> },
    create: { r: / created repository /, c: <GoRepo key="icon" style={watermark} /> },
    close: { r: / closed /, c: <GoIssueClosed key="icon" style={watermark} /> }
  };

  const getIcon = (description) => {
    let icon = null;
    Object.keys(githubClassMatch).forEach((key) => {
      if (githubClassMatch[key].r.test(description)) {
        icon = githubClassMatch[key].c;
      }
    });
    icon = icon || GoMarkGithub;
    return icon;
  }

  const linkStyles = Object.assign({},
    noUnderline,
    block,
    forceMaxWidth,
    forceMaxHeight,
    absolute,
    pinLeft,
    pinTop,
    borderBox,
    padAll
  );

  if (!canRender) {
    return <Tile size={"s"} color={color} variant={variant} loading={true}></Tile>
  }

  return <Tile size={"s"} color={color} variant={variant}>
    <article>
      { getIcon(description) }
      <a key="link" href={source} style={linkStyles}>
        <Headline size={"s"} color={color} variant={variant} overlay={true}>
          {reactStringReplace(description, githubNaturalBreaks, (match, i) => {
            return <span key={i}><wbr/>{match}</span>
          })}
        </Headline>
      </a>
    </article>
  </Tile>
};

GithubEvent.propTypes = Object.assign({}, propTypes, {
  source: PropTypes.string,
  description: PropTypes.string
});

GithubEvent.defaultProps = Object.assign({}, defaultProps, {
  source: "",
  description: ""
});

export default Radium(GithubEvent);
