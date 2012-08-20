---
layout: post
permalink: /article/documentcreateelement_and_checkboxes
title: document.createElement and checkboxes
---

*This is from the old archives. It's accuracy, links, code may all be funky or out of date.*

I ran into a problem in building the web interface for SnapTest today, where I couldn't seem to get a checkbox to show up as checked in IE. The original code looked something like

[The Original Code](https://gist.github.com/3383252#file_original.js)

And no matter how many times I tried, IE (6 specifically) refused to check the checkbox. It turns out IE want your checkboxes made in a Mozilla-incompatible way. Specifically, IE lets you call document.createElement using an entire HTML tag, which will result in a node you can perform operations on.

I almost fell back on the [conditional comment browser sniff](http://dean.edwards.name/weblog/2006/11/sandbox/) from Dean Edwards, but ended up with something I felt was much better. Everything beaten into your head about JavaScript says that feature detection is the better alternative to browser sniffing, so why not treat IE's rendering of an HTML tag as a "feature" instead of a bug.

A couple minutes later, I had a working solution.

[A Solution Using IE's createElement as a "Feature"](https://gist.github.com/3383252#file_solution.js)

I guess I had never really thought of IE's bugs as features before; changing the way you can code for IE's differences from other browsers.
