var keyMirror = require("react/lib/keyMirror");

module.exports = Object.assign({},{
  types: {
    new: [/created repository/, /created branch/],
    comment: [/commented on/],
    pull: [/opened pull request/],
    push: [/pushed to/],
    issue: [/opened issue/],
    close: [/closed pull request/, /closed issue/]
  }
},
keyMirror({
  LOAD_GITHUB: null,
  CHANGE_GITHUB: null
}));
