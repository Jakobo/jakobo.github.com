---
published: false
permalink: /article/static_blogging_with_jekyll
title: Static Blogging With Jekyll
---
Longtime readers of the site know that felocity.com serves as a constant playground for new ideas and technologies. It was where I cracked open PHP6 early, first played with Git, tried a 100% client driven UI, and an assortment of other ideas. Most recently, it was the migration to node.js to learn not only node/npm, but also Capistrano, AWS, and how to put it all together as a cohesive solution. The node implementation of the site left a few things to be desired however.

While it was cute and required zero local code to be maintained on the machine, the dependency on Evernote had a couple of problems with stability. Depending on unpublished APIs for Public notebooks, minor tweaks to the API would throw everything into a tailspin and all the entries would disappear. Since this didn't cause the node app to fail, there would be no notifications sent to my email and I'd be pretty clueless that something was wrong.