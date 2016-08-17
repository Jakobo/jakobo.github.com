# felocity.com
## (or... Dear Future Self)

Documentation for something like this is more notes to myself than anything else, although I'm certain that for anyone who wants to read my code they will also appreciate this handy guide to navigation. It's an attempt to document what's where, why, and how it got that way. Selfishly, it should save me some time when I come back to this in some unknown number of months.

Philosophically, the personal web page is changing. Felocity.com started out as a weblog, but as a technically oriented one, things got very stale very fast. So I took my Movable Type to Wordpress to a home grown PHP system to node.js on Amazon Web Services to a jekyll site on GitHub pages. With the reinvention of blogging platforms, I felt I could finally toss aside many of my legacy technical articles and drop the "blog" part of the site all together. This gave me an idea: I'd like to take this back to the "portal" days, where I can encapsulate, link to, and boost the google-bility of my online identity.

```bash
npm install # All the things
npm run dev # Start a webpack dev server for the project
            # or do "npm run build" to minify and create /assets items
```

## Deploying
This runs on github's static page system. This means that anything not starting with `_` will be publicly available via the felocity.com site. To publish, run the build command `npm run build` and then remember to commit the changes before pushing. We don't have a `nojekyll` file because we want to avoid copying all our underscore directories for cleanliness. `git push` and let github do the rest.

## React
The site is built on React. It's the closest thing we have to web components that works in a large number of browsers. I know, Polymer is going to change the world. It probably will. But that is a future solution, not something that makes the web immediately better. There are a lot of companines currently using React, and it appears poised to be one of the dominant solutions for building interactive pages.

It's overkill for this project, but a good testbed for learning.

For the data flows and controls, the site was upgraded from a Flux based solution to Redux. Keeping a centralized store of information simplifies things greatly and makes the debugging a lot easier. There's also a lot fewer files floating around.

* **_js/?**: This is the React infrastructure, built on Redux. You have your standard `actions`, `components`, `reducers` directories, along with a `data` for data fetch commands separated out, and a `vendor` directory for Google Analytics.

## Data Sources in Google Drive
> https://spreadsheets.google.com/feeds/list/10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo/1/public/values?alt=json-in-script&callback=test

The above URL is how the magic happens. Every service (save for Google Photos) is going through [IFTTT](https://www.ifttt.com). The recipes I'm using either connect directly to a service or use the RSS channel to read an RSS file on a 15 minute interval. The resulting data found is written to a Google Spreadsheet in a new row.

Google sheets when published have a JSON/JSONP endpoint. Those JSONP data endpoints is how the gdrive utility in `data/gdrive.js` gets its information. We fetch using a polyfill of the Fetch API, which supports JSONP.

The following data sources are using this magic:
* Github Events
* Medium Articles
* Twitter Tweets
* Pinterest Pins

Google Photos have a direct JSONP endpoint. There used to also be LinkedIn changes, but LinkedIn removed their RSS feeds and developer platform, making it impossible to retrieve using either IFTTT or another solution.

* **_js/components/tiles/*_from_feed.js**: These are the wrapper containers. I wanted to keep them near the components they wrapped to provide both a data and non-data version in an easy to read structure. They are your standard Redux based bindings using `connect()`

## Other Important Directories / files

* `.babelrc`: We're es2015 around here
* `.eslintrc`: Not using this at the moment, because I need to explore es2015 options like Airbnb's configs
* `404.html`: Speaking of 404s...
* `CNAME`: Makes the .com world go round
* `index.html`: Base page. Will look for the JavaScript in `assets/bundle.js` (webpack config)
* `/t`: This is for short links to presentations and talks. By creating github pages here, it's possible to have a link such as "www.felocity.com/t/foo" and control the redirect experience to wherever the best spot is (Presentate, Speaker Deck, etc). I can also host a talk locally if I'm feeling somewhat crazy. However, really nice looking HTML talks are hard.
* `/vcard`: My old business cards still point to a vcard URL. 404s are best avoided if we can help it, so this redirects to `/`
* `/manifesto`: A link to the manifesto I keep up to date as a manager (on Medium)
* `webpack.config.js`: The webpack config
