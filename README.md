# felocity.com
## (or... Dear Future Self)

Documentation for something like this is more notes to myself than anything else, although I'm certain that for anyone who wants to read my code they will also appreciate this handy guide to navigation. It's an attempt to document what's where, why, and how it got that way. Selfishly, it should save me some time when I come back to this in some unknown number of months.

Philosophically, the personal web page is changing. Felocity.com started out as a weblog, but as a technically oriented one, things got very stale very fast. So I took my Movable Type to Wordpress to a home grown PHP system to node.js on Amazon Web Services to a jekyll site on GitHub pages. With the reinvention of blogging platforms, I felt I could finally toss aside many of my legacy technical articles and drop the "blog" part of the site all together. This gave me an idea: I'd like to take this back to the "portal" days, where I can encapsulate, link to, and boost the google-bility of my online identity.

```bash
npm install # All the things
npm run dev # Start a webpack dev server
            # or do "npm run build" to minify and create /assets items
```

## TODOs
* https://xudafeng.github.io/autoresponsive-react/ for grid
* Determine system for defining tile sizes
* Apply localized styling

## React
The site is built on React. It's the closest thing we have to web components that works in a large number of browsers. I know, Polymer is going to change the world. It probably will. I wanted to learn React. There's a good number of companies looking at it, and being familiar with the virtual DOM, the glorified global EventEmitter, and the general workflow will help in the future.

The addition of Redux is to simply advance the site to the current state of standards. Separate stores for every data domain are no longer cool, and instead we're back to highly evented systems. The reducer layer is nice though.

* **_js/?**: This is the React infrastructure, built on Redux. You have your standard `actions`, `components`, `reducers` directories, along with a `common` for shared utilities, a `data` with specific fetches for google doc APIs, and a `vendor` directory for Google Analytics.

## On Using Tiles
I like Windows. Don't tell anyone.

## Data Sources in Google Drive
> https://spreadsheets.google.com/feeds/list/10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo/1/public/values?alt=json-in-script&callback=test

The above URL is how the magic happens. Every service (save for Google Photos) is going through [IFTTT](https://www.ifttt.com) with a process that is roughly: Take a new X, write it to Google Spreadsheet Y as a new row. The source may be a direct utility if IFTTT has an API access. In cases where there is no API (Medium...) the RSS feed is used instead. With everything in Google Spreadsheets, these are then Published. A published sheet has a JSON / JSONP URL, which is how the data is sucked in. This is the example you see above.

* **_js/components/tiles/*_from_feed.js**: These are the wrapper containers. I wanted to keep them near the components they wrapped to provide both a data and non-data version in an easy to read structure.

## Other Important Directories / files

* `CNAME`: Makes the .com world go round
* `/t`: This is for short links to presentations and talks. By creating github pages here, it's possible to have a link such as "www.felocity.com/t/foo" and control the redirect experience to wherever the best spot is (Presentate, Speaker Deck, etc).
* `/vcard`: My old business cards still point to a vcard URL. 404s are best avoided if we can help it.
* `/manifesto`: A link to the manifesto I keep up to date as a manager
* `404.html`: Speaking of 404s...
