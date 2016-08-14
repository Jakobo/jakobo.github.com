import React, { PropTypes } from "react"
// import Text from "styleguide/text"
import Headline from "styleguide/headline"
import Tile from "styleguide/tile"

import { noUnderline } from "styleguide/primitives/typography"
import { block, forceMaxWidth, forceMaxHeight, absolute, twoThirdsWidth, twoThirdsHeight,
  pinTop, pinLeft, pinBottomish, pinRightish } from "styleguide/primitives/layout"

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

const GithubEvent = (props) => {
  const { size, color, variant, source, description, loadData } = props
  const canRender = (description && source)

  // component wants to be fetched from an external data source
  if (loadData && !canRender) {
    loadData();
  }

  const iconStyles = Object.assign({},
    pinRightish,
    pinBottomish,
    twoThirdsWidth,
    twoThirdsHeight,
    absolute,
    {
      opacity: "0.05"
    }
  );

  const githubClassMatch = {
    comment: { r: / commented on /, c: <GoCommentDiscussion style={iconStyles} /> },
    issue: { r: / opened issue /, c: <GoBug style={iconStyles} /> },
    push: { r: / pushed to /, c: <GoPush style={iconStyles} /> },
    branch: { r: / created branch /, c: <GoBranch style={iconStyles} /> },
    pr: { r: / opened pull request /, c: <GoPullRequest style={iconStyles} /> },
    fork: { r: / forked /, c: <GoForked style={iconStyles} /> },
    create: { r: / created repository /, c: <GoRepo style={iconStyles} /> },
    close: { r: / closed /, c: <GoIssueClosed style={iconStyles} /> }
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
    pinTop
  );

  if (!canRender) {
    return <Tile size={"s"} color={color} variant={variant} loading={true}></Tile>
  }

  return <Tile size={"s"} color={color} variant={variant}>
    <article>
      { getIcon(description) }
      <a href={source} style={linkStyles}>
        <Headline size={"s"} color={color} variant={variant} overlay={true}>{description}</Headline>
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

export default GithubEvent;
