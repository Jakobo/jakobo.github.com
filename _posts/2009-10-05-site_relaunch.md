---
layout: post
permalink: /article/a_few_new_tricks
title: A Few New Tricks
---

So here we are on a blank canvas. Honestly, between you and I, this is a bit weird. I mean, unless you came from felocity.org I'm pretty sure you came from that vast Internet thing. So you know nothing about me, and I nothing about you. That's okay. I hope with time, we can break those walls down. Dare I say it, perhaps we can energize a synergy that will transform the blogoscapeosphere into a new paradigm. Or something. Whatever. That's not really why you're here. Felocity.com is the evolution of Felocity.org. More of the good, less of the bad, and a fresh start for the site.

The site itself has been in development for quite some time. I think almost two SXSW festivals and counting. The biggest reasons were technical, although my inability to design speaks in volumes as well. A special thanks is due out to [Anlina Sheng][anlina] for her work with the logo, having refreshed her first logo from the original felocity.org website and reprised it for the content's new direction.

## Build it Yourself?
One of the most important things done with the site was building it out from scratch. For the longest time I've used Expression Engine, and I do love it still. However, as a developer, there's not as much as can be done portfolio wise. As I was mulling it over, I realized that the website itself could be a very good piece in my portfolio. If I was serious about this, I also needed to pick a language that's hard to stand out in. So, I went with PHP. If you go to the [source browser][source], it's all there sans DB passwords. At the root of this site is a project called [Grok][grok], an incredibly simple library that uses the quirky nature of PHP includes to create local scope. It's from this file that everything else is really built up onto. The site's [MVC Framework][chippino] is built on Grok, and from that stems the other pieces of Open Source Software that make up the framework.

Working out in the open like this has been a very eye opening experience. The #1 thing I had to make a point of doing is get nightly backups in place and get all my code change managed. With this level of transparency, I have to accept this isn't a flawless system, and somewhere along the line people will discover security problems. Hopefully they'll notify me, but I can't always be that optimistic. Still, I've put in place the basic security constraints and best practices from my experiences at Gaia to see if that will be sufficient. At the very least, all input is filtered by type, all output is filtered to escape HTML, and all SQL is escaped in php using `mysql_real_escape_string()`. The changes to felocity as I went from .org to .com was also more than just infrastructure changes. The surface got a realignment as well.

## Logo Refresh and IA Changes
Anlina's realignment of the logo carries the essence of the old felocity.org logo, but gives it a bit more modern feel. The new logo is is a bit more short and squat, using the lowercase Gotham typeface to even out the letters. The logo's goal was to be very even and balanced, and keep the `<?` shape as the key symbol. It's a homage back to PHP, the language the site's done in, and where so many lessons in architecture were learned during my Tenure at Gaia.

In recreating the site, I also aimed for something much simpler than felocity.org. I had all these menu items, and they all seemed irrelevant to the purpose of the site. After talking with friends, professionals, and random people on the street, there were really only 3 "goals" on the page. Read my writing, look for a portfolio of my work, and contact me. As I drift farther from the "design" side, I find my emphasis is more on the projects I contribute to and maintain more than the sites I've designed. To that extent, even the resum&eacute; is secondary. All of this resulted in the new 3 point navigation, and dropping a lot of the secondary and superfluous content.

I also found myself dropping widgets left and right. I didn't need my Gaia avatar, "related topics" while nice wasn't actually helping move traffic around (links IN the article did however), and rotating through widgets ended up confusing people who just expected to see the same content every time. The widgets I use now are much more targeted, especially in the context of a given blog entry. I took a page from [Jeremy Keith][adacitomachine] as a way to link flickr photos to a given entry, and I've been considering adopting [Faruk's twitter comment idea][faruktwitter] instead of the traditional blog comments. (To the later, I'm not sure yet if 140 char is enough to express a concrete idea, especially when discussing code.)

The total net result is a site leaner and more directed- more purposeful. Between you and I, it should also be less upkeep.

## Licensing
Those who follow my creative endeavors know I'm a copyleft fanatic. This site is no exception. All my content on the site is under the CC-BY-SA license. All that means is if you use this, attribute it. If you build upon it, share it under the same license. You'll often find my code under an even _less_ restrictive MIT or BSD license, which pretty much makes my code open season for doing awesome things with it.

## And Next?
Well, we've got a site, we have the start of some content, some code, and at least the infrastructure. In the upcoming weeks, I hope to get some programming articles up, tips and tricks, and assorted photo stuff I do as it happens. By the end of the old site's lifespan, I had drifted towards more technical articles and less about the stuff I do outside of code. Hopefully this site will be a symbolic shift back to the things that define me: code, photography, good eats, and an occasional smidge of the personal. It is, after all, a personal site.

[anlina]:http://www.anlinasheng.com
[source]:http://www.felocity.com/source?path=Pages/FrontPage
[grok]:http://www.github.com/72squared/grok-php
[chippino]:http://www.github.com/jakobo/chippino
[adacitomachine]:http://adactio.com/journal/1274/
[faruktwitter]:http://farukat.es/journal/2009/03/204-the-killing-of-the-comments
