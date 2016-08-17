/* floats */
export const pullLeft = { float: "left" }
export const pullRight = { float: "right" }
export const clearfixBefore = {
  ":before": {
    content: " ",
    display: "table"
  }
}
export const clearfixAfter = {
  ":after": {
    content: " ",
    display: "table",
    clear: "both"
  }
}

/* display */
export const block = { display: "block" }
export const inline = { display: "inline" }
export const inlineBlock = { display: "inline-block" }
export const table = { display: "table" }
export const tableCell = { display: "table-cell" }

/* overflow */
export const overflowHidden = { overflow: "hidden" }
export const overflowScroll = { overflow: "scroll" }
export const overflowAuto = { overflow: "auto" }
export const fit = { maxWidth: "100%" }

export const hideTextLeft = { textIndent: "-99999px" }

export const forceMaxWidth = { width: "100%" }
export const forceMaxHeight = { height: "100%" }

export const oneQuarterWidth = { width: "25%" }
export const oneQuarterHeight = { height: "25%" }

export const oneThirdWidth = { width: "33%" }
export const oneThirdHeight = { height: "33%" }

export const halfWidth = { width: "50%" }
export const halfHeight = { height: "50%" }

export const twoThirdsWidth = { width: "66%" }
export const twoThirdsHeight = { height: "66%" }

export const threeQuartersWidth = { width: "75%" }
export const threeQuartersHeight = { height: "75%" }

/* position */
export const relative = { position: "relative" }
export const fixed = { position: "fixed" }
export const absolute = { position: "absolute" }

export const noMargin = { margin: "0" }
export const noPadding = { padding: "0" }

export const pinTop = { top: "0" }
export const pinTopish = { top: "2%" }
export const pinRight = { right: "0" }
export const pinRightish = { right: "2%" }
export const pinBottom = { bottom: "0" }
export const pinBottomish = { bottom: "2%" }
export const pinLeft = { left: "0" }
export const pinLeftish = { left: "2%" }

export const padText = { paddingLeft: "2%", paddingRight: "2%" }
export const padAll = { padding: "2%" }

/* box model */
export const borderBox = { boxSizing: "border-box" }

export const flex = { display: "flex" }
export const flexColumn = { flexDirection: "column" }
export const flexWrap = { flexWrap: "wrap" }

export const flexItemsStart = { alignItems: "flex-start" }
export const flexItemsEnd = { alignItems: "flex-end" }
export const flexItemsCenter = { alignItems: "center" }
export const flexItemsBaseline = { alignItems: "baseline" }
export const flexItemsStretch = { alignItems: "stretch" }

export const flexSelfStart = { alignSelf: "flex-start" }
export const flexSelfEnd = { alignSelf: "flex-end" }
export const flexSelfCenter = { alignSelf: "center" }
export const flexSelfBaseline = { alignSelf: "baseline" }
export const flexSelfStretch = { alignSelf: "stretch" }

export const flexJustifyStart = { justifyContent: "flex-start" }
export const flexJustifyEnd = { justifyContent: "flex-end" }
export const flexJustifyCenter = { justifyContent: "center" }
export const flexJustifyBetween = { justifyContent: "space-between" }
export const flexJustifyAround = { justifyContent: "space-around" }

export const flexContentStart = { alignContent: "flex-start" }
export const flexContentEnd = { alignContent: "flex-end" }
export const flexContentCenter = { alignContent: "center" }
export const flexContentBetween = { alignContent: "space-between" }
export const flexContentAround = { alignContent: "space-around" }
export const flexContentStretch = { alignContent: "stretch" }

/* 1. Fix for Chrome 44 bug. https://code.google.com/p/chromium/issues/detail?id=506893 */
export const flexAuto = {
  flex: "1 1 auto",
  minHeight: "0", /* 1 */
  minWidth: "0" /* 1 */
}
export const flexNone = { flex: "none" }

export const orderFirst = { order: "-1" }
export const orderLast = { order: "99999" }
