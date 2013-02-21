---
published: true
layout: post
permalink: /article/insertbefore_appendchild_and_reloading_iframes
title: DOM Iframe Operations Without Reload
---

If you're playing around with iframes, there's a nasty bug that occurs when you attempt to move the iframe using methods such as appendChild() or insertBefore(). How nasty the bug is depends on how tolerant your code is of reloading behaviors. Any attempts to move the iframe around will cause reloads in older Safari as well as Firefox. The problem lies in how the browsers interpret these events, removing the node and then adding it to its new destination which triggers a reload. Dragging and dropping iframes comes to mind as the first of many scenarios that may have this problem, and developers using LinkedIn's Platform or the Facebook Social Widgets are likely to notice this weirdness. Strangely enough, IE doesn't exhibit this behavior, which leaves the problem to just Webkit and Firefox.

## Workarounds in CSS
A quick scan in your search engine of choice reveals only one consistent technique for moving iframes about on the page- positioning absolutely. An absolutely positioned iframe can be readjusted easily, and can track directly on top of a placeholder such as a div. This works pretty fantastically in all but the most complex of layouts where absolute positioning requires a relative parent in just the right place.

{% highlight html %}
  <div id="#placeholder"></div>

  <!-- ...last node in the page... -->
  <iframe id="theFrame" src="http://www.example.com"
   style="left: -12345px; top: 0; position: absolute;"></iframe>
</body>
{% endhighlight %}

{% highlight js %}
(function() {
var div = document.getElementById("placeholder");
var iframe = document.getElementById("theFrame");

window.setInterval(function putFrameOntoPlaceholder() {
  // 1) measure the size of the iframe, change size of div
  div.width = iframe.offsetWidth + "px";
  div.height = iframe.offsetHeight + "px";

  // 2) get the div's position on the page, position iframe
  iframe.left = div.offsetLeft + "px";
  iframe.top = div.offsetHeight + "px";
}, 100);

})();
{% endhighlight %}

In layouts that make use of lots of relative positioning, it's easy to see where this might run into snags. Styles on either the div or iframe could mess up the alignment a bit, and while it's correctable it's not very feasible for a large scale site where there's going to be several developers building code.

## Webkit and Gmail: Adopting Nodes, not Importing
In July 2010, Google silently released an improvement to Gmail. It was most noticeable when using the gmail chat feature. You could open the chat window, "pop" it out of the main window, and then *close the parent window* and everything continued to work. The most fascinating part about this was the minimal load time in the popup. It was as if the entire Gmail environment were being ported over to the popup as part of the unload events. That's exactly what's happening. **The iframe contained the code both the main page and popup needed.** Move it to the new DOM, and presto, no reload! The reloading of an iframe in Google's case wasn't horrible, but at a company that obsesses over milliseconds, having to reload an entire JS stack was brutal. [The initial webkit bug on reparenting iframes](https://bugs.webkit.org/show_bug.cgi?id=32848) would ultimately result in the ideal fix.

Somewhat quietly, [DOM Level 3](http://www.w3.org/TR/DOM-Level-3-Core/core.html) core had added an operation called adoptNode(). Adopting an HTML node would simply move the node and in the case of the iframe, would not trigger a reload of the content. Coming back to Gmail, the JavaScript needed for the popup window is loaded into an iframe. When the parent window is closed, adoptNode() is called, moving all of the parent's necessary code into the popup window before it closes.

## And Firefox? Opera? Insert-other-browser?
Unfortunately, as of this writing, Firefox still has [an open ticket on the broken adoptNode behavior](https://bugzilla.mozilla.org/show_bug.cgi?id=254144), with no fixes in sight. As a last ditch effort, we can fall back to importNode(), we will just take the performance hit and trigger an undesirable reload which can possibly erase state within the iframe if there is any.

This stuff hasn't been validated against Opera. My hope is Opera's implementation of adoptNode is more in line with Webkit's, which leaves only Mozilla's long standing bug.

## Time For Defensive Coding Then
Using the above Firefox-proof code, it's possible to use adoptNode() when it's available, and then fall back to the importNode as a solution.

{% highlight js %}
try {
  document.adoptNode(window.opener.$("#my-iframe"));
}
catch(exc) {
  // performance hit. Either importNode, or load the
  // frame contents with appendChild()
  document.importNode(window.opener.$("#my-iframe"));
}
{% endhighlight %}

The most significant difference is knowing you cannot maintain stateful items in the frame itself. Solutions for using adoptNode with a fallback will need some way to save and restore the state, possibly in localStorage.
