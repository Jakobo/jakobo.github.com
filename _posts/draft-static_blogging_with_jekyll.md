---
published: false
permalink: /article/static_blogging_with_jekyll
title: Static Blogging With Jekyll
notes: must go live AFTER evernote article
---
Longtime readers of the site know that felocity.com serves as a constant playground for new ideas and technologies. It was where I cracked open PHP6, first played with Git, tried a 100% client driven UI, and an assortment of other ideas. Most recently, it was the migration to node.js to learn not only node/npm, but also Capistrano, AWS, and how to put it all together as a cohesive solution. Kiro, coworker at LinkedIn introduced me to Jekyll on an inDay, and I decided to try something completely different.

A Short List of Problems
------------------------
Justifying the switch to Jekyll meant tackling some of the standing problems with the existing node.js solution.

1. Evernote's "API": The site depended on [Evernote as a blogging platform](/article/evernote_as_a_blogging_engine) which meant I was also relying on undocumented functionality such as the RSS feed and public note data URLs. This network based dependency was pretty dangerous, as a change on Evernote's side could cause the posts to "disappear" and the health check solution I had wasn't effective enough to catch it. While I could fix the health check side, the risk of undocumented APIs changing seemed pretty scary.
2. Easy Publish: Capistrano is awesome. Repeatable server deployments are awesome. Using this for a single server ended up being pretty overkill. Maybe if my blog ever required a second box, this could be worth considering.
3. Maintainability: While working with node.js is pretty awesome, there's a lot of moving parts code-wise. As node.js continues to evolve as a platform, I had to leave the package.json file at 0.6 of node to avoid compatibility issues. Having something significantly more static means a lower cost to keep it going, which meant more time blogging. It also meant I could upgrade node locally to play with newer features and not find myself needing to work on my website but not having the right version of nodejs handy.

Jekyll: Going Static
--------------------
Static sites get rid of most of these problems. Looking back to the days of [Movable Type](http://www.movabletype.com/) as the blogging platform of choice, static sites are nothing new. Blogs in particular have infrequent publish actions (relative to say, a forum) and commenting technology has made it possible to do pure client-side discussions. This means a simple blog can now sit behind a static web server and simply hand out precompiled pages.