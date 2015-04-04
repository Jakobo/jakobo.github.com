# felocity.com
## (or... Dear Future Self)

Documentation for something like this is more notes to myself than anything else, although I'm certain that for anyone who wants to read my code they will also appreciate this handy guide to navigation. It's an attempt to document what's where, why, and how it got that way. Selfishly, it should save me some time when I come back to this in some unknown number of months.

Philosophically, the personal web page is changing. Felocity.com started out as a weblog, but as a technically oriented one, things got very stale very fast. So I took my Movable Type to Wordpress to a home grown PHP system to node.js on Amazon Web Services to a jekyll site on GitHub pages. With the reinvention of blogging platforms, I felt I could finally toss aside many of my legacy technical articles and drop the "blog" part of the site all together. This gave me an idea: I'd like to take this back to the "portal" days, where I can encapsulate, link to, and boost the google-bility of my online identity.

## React
The site is built on React. It's the closest thing we have to web components that works in a large number of browsers. I know, Polymer is going to change the world. It probably will. I wanted to learn React. There's a good number of companies looking at it, and being familiar with the virtual DOM, the glorified global EventEmitter, and the general workflow will help in the future.

* **_js/?**: This is the React infrastructure, built on Flux. The dispatcher is just your standard pub/sub pattern, but I didn't see a reason to write or maintain my own. While I'm not using all the actions in `_js/actions`, I wanted to create them all in case I get an itch to try something crazy.
* **_js/stores/isotope.js**: I'm calling out the isotope store specifically. Unlike the other stores, this doesn't actually have any stateful data. However, it can trigger a state change for which everyone can subscribe to. It's state is almost binary in a sense. When someone says "my layout changed" you go to the Isotope Store and it will cascade back to the root level.

## On Using Tiles
I like Windows. Don't tell anyone.

* **_sass/?**: There's some Sass for resets, normalizing the browser, and supporting the octicons / font-awesome icons. This is because 2 fonts is better than ever making a sprite. Ever. Again, because of the desire to minimize the amount of work I'm doing down the line. If a company decides to change their branding, I can just upgrade the font package and keep going.

## Data Sources in Google Drive
> https://spreadsheets.google.com/feeds/list/10AzPn7DVSM-C-dlvffqD6M2_laj0KCullSExDz6ssoo/1/public/values?alt=json-in-script&callback=test

The above URL is how the magic happens. Every service is going through [IFTTT](https://www.ifttt.com) with a process that is roughly: Take a new X, write it to Google Spreadsheet Y as a new row. The source may be a direct utility if IFTTT has an API access. In cases where there is no API (Medium...) the RSS feed is used instead. With everything in Google Spreadsheets, these are then Published. A published sheet has a JSON / JSONP URL, which is how the data is sucked in. This is the example you see above.

* **_js/common/gdrive.js**: This is a shared library used by all the gdrive data sources.

## Vendor Directory
There is a `_vendor` directory. These are things that are not loadable through `npm`. This includes `font-awesome`, `github-octicons`, and the google analytics script.

## Other Important Directories / files

* `/t`: This is for short links to presentations and talks. By creating github pages here, it's possible to have a link such as "www.felocity.com/t/foo" and control the redirect experience to wherever the best spot is (Presentate, Speaker Deck, etc).
* `/vcard`: My old business cards still point to a vcard URL. 404s are best avoided if we can help it.
* `404.html`: Speaking of 404s...
