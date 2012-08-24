---
published: false
permalink: /article/evernote_as_a_blogging_engine
title: Evernote as a Blogging Engine
---
In the node.js days, I went for a 0-storage solution on my AWS box. This required storing my blog entries on some other service. I wanted something that had versioning, worked on multiple platforms, and had a cool elephant for a logo. Evernote it was! I mean, you can make notebooks publicly accessible; there must be some way to get those posts into a blog. There's some dark magic that follows, but if you're looking to use Evernote's APIs there's some neat tricks to be found.

Getting a List of Posts
-----------------------
For the most part, a list of posts in a shared notebook can be accessed as an RSS feed. Did you even know there was an RSS feed for your public notes? Extracting it takes a bit of digging in to your shared notebook settings.

[Here's a list of the configs you need, and the URL you are making](https://gist.github.com/3447044#file_evernote.js)

If your posts are short, there won't be much else to do. The RSS feed contains almost all the data required. However, there is one critical piece of information absent- the full body of the entry. In an attempt to be helpful to all the RSS readers that won't discover the feed, the body content is truncated at a predetermined length. We can, however, access the note data another way.

The Full Post "API"
-------------------
The most important thing that comes out of this list is the GUID (Globally Unique IDentifier). GUIDs are the heart and soul of most of your evernote queries. They can be found in the RSS link above, and with that you're able to retrieve the full text. Everything from this point forward gets horribly undocumented, as there's not much beyond [Evernote's Thumbnail API](http://dev.evernote.com/documentation/cloud/chapters/Thumbnails.php). As a starting point, we get the following URL structure.

[A simple URL to a thumbnail in Evernote](https://gist.github.com/3447044#file_thumbnail.txt)

A bunch of guess and test reveals you can also get the note body itself by no longer asking for the `thm` thumbnail resource, and instead going straight to the note's source.

[Getting the raw source of a shared note in Evernote](https://gist.github.com/3447044#file_thumbnail_2.txt)

With a pile of asynchronous calls, we can merge these GUID based results in with the RSS list and generate a local cache of all the entries.

Advanced "Features"
-------------------
If you're really feeling ambitious, the search paramter from the post list can be combined with overloaded title information to create unique situations such as tagging or permalinks. For the felocity.com site, the note's title was overloaded into the format of "Title | permalink_title | publish/date/here" which could then hold additional metadata about the post. You can also get crafty with the tag and category data.