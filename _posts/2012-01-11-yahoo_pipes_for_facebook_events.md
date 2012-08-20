---
layout: post
permalink: /article/using_yahoo_pipes_to_filter_facebook_events
title: Using Yahoo! Pipes to Filter Facebook Events
---

Facebook is no more for me (which is likely an entire post all its own), but this post is bound to be valuable to people out there. This is just a solution for people who share the same pet peeve as myself- I hate calendar management. There, I said it. I hate it a lot, and I hate that everyone has their own calendar system which is oddly incompatible with everyone else. For example, in the days I used Facebook, I always wanted to put my Facebook events into my Google Calendar. Facebook does helpfully give you an [export events](http://www.facebook.com/?sk=events) option at the very bottom of the page, but it unhelpfully includes all of the things you said no to as well- in case you change your mind or want to feel popular. Thankfully, it's an iCal format, and extra thankfully there's Yahoo! Pipes.

Yahoo! Pipes As a Solution
---
I can't say it as well as other people, so for an in depth how-to, the [Squidoo Tutorial on Pipes](http://www.squidoo.com/yahoo-pipes-guide) is probably one of the best introductions out there. At the 50,000 foot level, Pipes lets you:

1. Take in data from some URL source
2. Transform the data using some rules you create
3. Output the data in a variety of formats

And that's exactly what we're wanting to do. We'll load up the URL for our Facebook Events and filter it to include only the "Accept" and "Tentative" events. Without further delay, here's the pipe.

[Facebook Event Calendar to Google Calendar](http://pipes.yahoo.com/jakobo/fb_event_calendar) on Yahoo! Pipes

And now you'll have one less calendar to maintain.
