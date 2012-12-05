---
layout: post
permalink: /article/data_liberation_for_your_linkedin_profile
title: Data Liberation for your LinkedIn Profile
---

Hackdays at LinkedIn are special. People get to try new ideas and technologies. I personally enjoy seeing if I can push people's buttons and make them think, so I am a sucker for the "most controversial" category we always do. A few months ago, [UnLinked](http://jakobo.github.com/UnLinked/)([Github](http://github.com/Jakobo/UnLinked)) was lucky enough win in the controversy category. It may end up on LinkedIn Labs eventually, but that's not really the point of this post. This post is all about how easy it is to export your LinkedIn data using the JavaScript APIs as part of the LinkedIn Platform. If you want to run your own local copy of UnLinked, just fork the github project above. Special thanks to my collaborator on this Hackday project [Efrat Orkin](http://www.coroflot.com/efratorkin) who kept the entire thing from looking like a programmer got a hold of Photoshop. This is the Hackday project, broken down from idea to its final forms.

[![UnLinked Screenshot](https://lh4.googleusercontent.com/-8EmqeIGG4u4/T1pBLatXgPI/AAAAAAAABRs/JYQUIHsSKGc/s200/unlinked_stage3.jpeg)](http://jakobo.github.com/UnLinked)

## Free Data as the Idea
I'm a huge fan of the [Data Liberation Front](http://www.dataliberation.org/), a group within Google that obsesses over free data. If you ever want to know how to export/access your data from Google's data centers, this single site details everything. The goals are simple; you want to create

1. a way to export your data in an open, interoperable format...
2. that shouldn't cost the user anything...
3. and take as little time as possible

This is a pretty strong edict. Any company with APIs should be able to do this; LinkedIn is no exception. The [LinkedIn Developer Site](https://developer.linkedin.com/) documents the APIs we have available. During brainstorming, I wanted an application that makes it one-click-simple to get your profile information and download it. Docs in hand, it was time to create a "Sign in With LinkedIn" button and start accessing data.

## Building UnLinked
UnLinked itself consists of a single HTML page. Everything we did was built on the LinkedIn JavaScript APIs. That is: request access, make N calls to the API to get all the required data, and bundle the whole thing up into a JSON format. To help the application feel fast, we broke all the calls up into smaller chunks using LinkedIn's API.Raw() call. The results are then mashed together in the final payload. When we've got all the parts, we can do the download. For the Github version, a client side result is displayed. It's also possible to use the simple PHP script to trigger a download of the JSON data. The total engineering took about 3 hours from no API key to completion and completed debugging.

One of the more interesting things done in the application is the [liberal use of the Raw() API call](https://github.com/Jakobo/UnLinked/blob/master/rsc/unlink.js#L26). While there are shortcut methods to get various data components, Raw() affords us several advantages. First, you don't have to accept the defaults. Since this application is designed to grab as much data as possible, it needed to ask for more than just the default commonly used fields. Second, as the number of URLs grows, it becomes very easy to change the data structure to allow an unlimited number of attributes to be retrieved, without adding much additional code. Finally, some endpoints just don't have convenience methods build in yet. For those items, we needed some way to get at the data- the original purpose Raw() was built. Since our URLs don't change in the v1 API, this is a pretty stable solution that also affords us the power we're looking for.

## The Result
Counting the styling and graphics creation, Efrat and I spent about 10-12 hours total, which was less than a day's work for either of us. The JavaScript APIs for LinkedIn are very powerful, and the more we move as a Web to client side solutions, the more likely JavaScript APIs will move from away from their Hackday status and become part of client side models in MVC architectures.
