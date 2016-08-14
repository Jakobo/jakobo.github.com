import { forceMaxWidth, forceMaxHeight, block, overflowHidden, pullLeft,
  relative } from "./layout"

import { bgWhite } from "./colors"
import { withVariants } from "styleguide/util"
import breakpoints from "./breakpoints"

const oneColumn = {
  spanOne: { width: "100vw", height: "100vw" }
}

const twoColumn = {
  spanOne: { width: "50vw",  height: "50vw" },
  spanTwo: { width: "100vw", height: "100vw" }
}

const fourColumn = {
  spanOne:   { width: "25vw",  height: "25vw" },
  spanTwo:   { width: "50vw",  height: "50vw" },
  spanThree: { width: "75vw",  height: "75vw" },
  spanFour:  { width: "100vw", height: "100vw" }
}

const eightColumn = {
  spanOne:   { width: "12.5vw", height: "12.5vw" },
  spanTwo:   { width: "25vw",   height: "25vw" },
  spanThree: { width: "37.5vw", height: "37.5vw" },
  spanFour:  { width: "50vw",   height: "50vw" },
  spanFive:  { width: "62.5vw", height: "62.5vw" },
  spanSix:   { width: "75vw",   height: "75vw" },
  spanSeven: { width: "87.5vw", height: "87.5vw" },
  spanEight: { width: "100vw",  height: "100vw" }
}

const firstTile = { marginLeft: "0" }

export const canvas = Object.assign({},
  block,
  overflowHidden,
  // pullLeft,
  bgWhite
)

/* how big is the gap between tiles? */
export const edges = withVariants({
  padding: "1%",
  height: "99%",
  width: "99%"
},
[`@media ${breakpoints.sm}`, {
  padding: "1%",
  height: "99%",
  width: "99%"
}],
[`@media ${breakpoints.md}`, {
  padding: "1%",
  height: "99%",
  width: "99%"
}],
[`@media ${breakpoints.lg}`, {
  padding: "1%",
  height: "99%",
  width: "99%"
}])

export const reset = Object.assign({},
  forceMaxWidth,
  forceMaxHeight,
  block,
  overflowHidden,
  relative
)

export const tile = {
  s: withVariants(Object.assign({},
    oneColumn.spanOne
  ),
  [`@media ${breakpoints.sm}`, Object.assign({},
    twoColumn.spanOne
  )],
  [`@media ${breakpoints.md}`, Object.assign({},
    fourColumn.spanOne
  )],
  [`@media ${breakpoints.lg}`, Object.assign({},
    eightColumn.spanTwo
  )]),
  m: withVariants(Object.assign({},
    oneColumn.spanOne
  ),
  [`@media ${breakpoints.sm}`, Object.assign({},
    twoColumn.spanTwo
  )],
  [`@media ${breakpoints.md}`, Object.assign({},
    fourColumn.spanTwo
  )],
  [`@media ${breakpoints.lg}`, Object.assign({},
    eightColumn.spanFour
  )]),
  l: withVariants(Object.assign({},
    oneColumn.spanOne
  ),
  [`@media ${breakpoints.sm}`, Object.assign({},
    twoColumn.spanTwo
  )],
  [`@media ${breakpoints.md}`, Object.assign({},
    fourColumn.spanFour
  )],
  [`@media ${breakpoints.lg}`, Object.assign({},
    eightColumn.spanSix
  )])
};
