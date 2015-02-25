---
layout: post
permalink: /article/static_blogging_with_jekyll
title: Static Blogging With Jekyll
---

Longtime readers of the site know that felocity.com serves as a constant playground for new ideas and technologies. It was where I cracked open PHP6, first played with Git, tried a 100% client driven UI, and an assortment of other ideas. Most recently, it was the migration to node.js to learn not only node/npm, but also Capistrano, AWS, and how to put it all together as a cohesive solution. Kiro, coworker at LinkedIn introduced me to Jekyll on a [LinkedIn inDay](http://www.youtube.com/watch?v=9Ny_jFV4dTk), and I decided to try something completely different.

After having run both sites in paralell for a few weeks, I'm comfortable converting to Jekyll full-time for the site. I know, I just finished talking about some [undocumented Evernote APIs](/article/evernote_as_a_blogging_engine) and how to build a blog on top of it. However, the fact I'm blogging more is probably the best indicator of this change's success.

## A Short List of Problems
Justifying the switch to Jekyll meant tackling some of the standing problems with the existing node.js solution.

1. Evernote's "API": The site depended on [Evernote as a blogging platform](/article/evernote_as_a_blogging_engine) which meant I was also relying on undocumented functionality such as the RSS feed and public note data URLs. This network based dependency was pretty dangerous, as a change on Evernote's side could cause the posts to "disappear" and the health check solution I had wasn't effective enough to catch it. While I could fix the health check side, the risk of undocumented APIs changing seemed pretty scary.
2. Easy Publish: Capistrano is awesome. Repeatable server deployments are awesome. Using this for a single server ended up being pretty overkill. Maybe if my blog ever required a second box, this could be worth considering.
3. Maintainability: While working with node.js is pretty awesome, there's a lot of moving parts code-wise. As node.js continues to evolve as a platform, I had to leave the package.json file at 0.6 of node to avoid compatibility issues. Having something significantly more static means a lower cost to keep it going, which meant more time blogging. It also meant I could upgrade node locally to play with newer features and not find myself needing to work on my website but not having the right version of node handy.

## Jekyll: Going Static
Static sites get rid of most of these problems. Looking back to the days of [Movable Type](http://www.movabletype.com/) as the blogging platform of choice, static sites are nothing new. Blogs in particular have infrequent publish actions (relative to say, a forum) and commenting technology has made it possible to do pure client-side discussions. This means a simple blog can now sit behind a static web server and simply hand out precompiled pages. This drives down the cost significantly, which is huge for a site whose sole purpose is to establish a web presence. Enter Jekyll.

![Jekyll](https://lh5.googleusercontent.com/-k16JSQqUOTs/UH-KwzB8MgI/AAAAAAAAICI/2mF-6qzvex4/s200/jekyll.png)

There was already a pretty compelling argument in switching to Jekyll. Github makes it possible to maintain a _yourname.github.com_ account, and can even map it to a normal domain. All the details are on [github's Jekyll documentation](https://help.github.com/categories/20/articles) page. About the only catch is making sure you can update your A records appropriately. Using GitHub had a few additional benefits as a side effect of using git.

The benefit I never considered with Jekyll was an artifact of Github Pages' hosting. While I kept my site in its own repository, I hadn't considered migrating my projects and experiments there. The structure of Jekyll where everything starting with an underscore isn't published made it possible for me to rathole away prototypes until I've got the corresponding blog posts ready to go with it. Prior to this, I had been stuffing everything into Dropbox. It worked, but since the prototype often accompanies a post, it makes more sense to keep them together.

## Keeping the Old Site Around
Even though I've changed to a static blogging engine, I feel the [old site on GitHub](https://github.com/jakobo/felocity-exp) still has a lot of value. It shows off the power of some really powerful node modules, is a completely modular app in which the only self-built pieces are a straightforward code organization tool and [Tig, a TAL-style client template engine](https://github.com/jakobo/tig). Routing, RSS feeds, etc are all handled through node modules, leaving a very clean example of what node is capable of when paired with a good package management utility. Plus, I'll never know when I need to go look up [how to parse Evernote data files](https://github.com/Jakobo/felocity-exp/blob/master/src/models/posts.coffee).