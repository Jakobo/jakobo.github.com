---
layout: post
permalink: /article/evernote_as_a_blogging_engine
title: Evernote as a Blogging Engine
---

With [Felocity running on node.js](/article/felocity_on_nodejs), I went for a site design that didn't require persistence on my Amazon Web Services box. This required storing my blog entries in some other way, preferably with an API. I also wanted something that had versioning, worked on multiple platforms, and had a cool elephant for a logo. Evernote it was! I mean, you can make notebooks publicly accessible; there must be some way to get those posts into a blog. There's some dark magic that follows, but if you're looking to use Evernote's APIs there's some neat tricks to be found.

## Getting a List of Posts
For the most part, a list of posts in a shared notebook can be accessed as an RSS feed. Did you even know there was an RSS feed for your public notes? Extracting it takes a bit of digging in to your shared notebook settings.

{% highlight js %}
/*
[SHARD] - your evernote shard
Right click on a note and copy it's Public URL. You will have something like
https://www.evernote.com/shard/s7/sh/...
the bit after "shard/" is the shard for your public notes. In the above, it's "s7"

[USER_ID] - your user id
You can get this by visiting a shared notebook in your account. It's also another
way to get your shard information, as the "shard/NN" string will also be present
there

[USERNAME] - your username

[NOTEBOOK_ID] - your shared notebook ID
This is the id you shared the notebook with when selecting "share this notebook"

[SIZE] - the total @ of results to return

[SEARCH] - an arbitrary string to narrow results by
*/
url = "http://www.evernote.com/shard/[SHARD]/pub/[USER_ID]/[USERNAME]/
  [NOTEBOOK_ID]/rss.jsp?max=[SIZE]&sort=2&search=[SEARCH]"
{% endhighlight %}

If your posts are short, there won't be much else to do. The RSS feed contains almost all the data required. However, there is one critical piece of information absent- the full body of the entry. In an attempt to be helpful to all the RSS readers that won't discover the feed, the body content is truncated at a predetermined length. We can, however, access the note data another way.

## The Full Post "API"
The most important thing that comes out of this list is the GUID (Globally Unique IDentifier). GUIDs are the heart and soul of most of your Evernote queries. They can be found in the RSS link above, and with that you're able to retrieve the full text. Everything from this point forward gets horribly undocumented, as there's not much beyond [Evernote's Thumbnail API](http://dev.evernote.com/documentation/cloud/chapters/Thumbnails.php). As a starting point, we get the following URL structure.

{% highlight text %}
http://www.evernote.com/shard/s1/thm/note/e669c090-d8b2-4324-9eae-56bd31c64af7
{% endhighlight %}

A bunch of guess and test reveals you can also get the note body itself by no longer asking for the `thm` thumbnail resource, and instead going straight to the note's source.

{% highlight text %}
http://www.evernote.com/shard/[SHARD]/note/[GUID]
{% endhighlight %}

With a pile of asynchronous calls, we can merge these GUID based results in with the RSS list and generate a local cache of all the entries.

## Advanced "Features"
If you're really feeling ambitious, the search parameter from the post list can be combined with overloaded title information to create unique situations such as tagging or permalinks. For the felocity.com site, the note's title was overloaded into the format of "Title | permalink_title | publish/date/here" which could then hold additional metadata about the post. You can also get crafty with the tag and category data. One annoying quirk about the RSS data is the pubDate field references the date of update, not the date of creation. In fact, the creation date is completely absent from the data. While that can be worked around, it is still a bit quirky.

If you're thinking of rolling something similar yourself, have a look at the [PostModel](https://github.com/Jakobo/felocity-exp/blob/master/src/models/posts.coffee) which powers the posts on the node.js version of felocity.com.