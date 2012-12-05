---
layout: post
permalink: /article/documentcreateelement_and_checkboxes
title: document.createElement and checkboxes
---

*This is from the old archives. It's accuracy, links, code may all be funky or out of date.*

I ran into a problem in building the web interface for SnapTest today, where I couldn't seem to get a checkbox to show up as checked in IE. The original code looked something like

{% highlight js %}
var cb = document.createElement("input");
cb.type = "checkbox";
cb.checked = true;
{% endhighlight %}

And no matter how many times I tried, IE (6 specifically) refused to check the checkbox. It turns out IE want your checkboxes made in a Mozilla-incompatible way. Specifically, IE lets you call document.createElement using an entire HTML tag, which will result in a node you can perform operations on.

I almost fell back on the [conditional comment browser sniff](http://dean.edwards.name/weblog/2006/11/sandbox/) from Dean Edwards, but ended up with something I felt was much better. Everything beaten into your head about JavaScript says that feature detection is the better alternative to browser sniffing, so why not treat IE's rendering of an HTML tag as a "feature" instead of a bug.

A couple minutes later, I had a working solution.

{% highlight js %}
// IE requires a checkbox to be made differently
try {
  var cb = document.createElement("<input type=\"checkbox\" checked>");
}
catch (e) {
  var cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = true;
}
{% endhighlight %}

I guess I had never really thought of IE's bugs as features before; changing the way you can code for IE's differences from other browsers.
