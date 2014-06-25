module.exports = {
  ui: [
    {
      selector: ".index .blog p:first",
      use: "reduce"
    },
    {
      selector: ".index .blog p:first",
      use: "elipsis",
      config: {
        words: -4
      }
    },
    {
      selector: ".index .github a",
      use: "github",
      config: {
        limit: 2,
        user: "Jakobo",
        date_as: "MMM Do YYYY HH:mm",
        tmpl: [
          "<li>",
            "<span class=\"date\">__DATE__</span>",
            "<span class=\"event\">__EVENT__</span>",
          "</li>"
        ]
      }
    },
    {
      selector: ".post .blog a[href*='gist.github.com']",
      use: "gist"
    },
    {
      selector: ".post .blog img[src*='googleusercontent.com']",
      use: "googleimagesize"
    }
  ]
};
