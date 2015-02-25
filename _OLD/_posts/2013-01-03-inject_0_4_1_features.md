---
layout: post
permalink: /article/inject_0.4.1_around_the_corner
title: Inject 0.4.1 Around the Corner
---

It's been a while since I've talked about some of the software coming out of LinkedIn. The [open source projects](https://github.com/linkedin) we do continue to thrive. Of specific note is [Inject](https://github.com/linkedin/inject) which is in the process of maturing into 0.4.1. Now that the first RC is available, it's a good time to talk about the framework and what's changed. The last time I talked about Inject was on the [LinkedIn Engineering Blog](http://engineering.linkedin.com/open-source/introducing-inject-open-source-javascript-dependency-management-library-browser) when we were at 0.3.0, so it has been a while indeed.

## When We Became 0.4.0
Since the original launch, we made a few significant (backwards incompatible) changes that forced us to increment the second "dot" in our build system. Inject builds are best described as

{% highlight text %}
milestone.not-backwards-ok.backwards-ok
{% endhighlight %}

That is, we believe it should be easy to glance at the version release and see if it's going to break your existing code. If we're changing that second value, we're pretty sure things will break. And so with that, came a [Migration Guide for Inject](https://github.com/linkedin/inject/wiki/Migration-Guide) to ensure people could upgrade to the latest version. We stopped overloading the `require()` method, and started focusing on getting the public APIs under control.

## Introducing 0.4.1
Since the 0.4.0 release, we've been adding a couple of key features. They should make developing with Inject even easier.

**Plugins** enable a developer to bring in non-JavaScript dependencies into Inject. We're releasing 0.4.1 with a CSS, Text, and JSON plugin to illustrate the power. Requiring a CSS file for example is as simple as

{% highlight js %}
var css = require('css!path/to/css_file.css');
css.attach();
{% endhighlight %}

The above is made possible because of the afterFetch pointcut. Unlike the original "before" and "after" pointcuts, the **afterFetch** pointcut allows for the asynchronous modification of the file after its download. This allows Inject to transform non-JavaScript code into safe strings for evaluation in the dependency system. As an added bonus, localStorage caches, cross domain functionality, and all the things that make Inject great continue to work.

The **New Test Compliance** means that we are no longer maintaining our own copy of the specification tests for AMD and CommonJS. The [AMD Test Suite](https://github.com/amdjs/amdjs-tests) and [CommonJS Suite](https://github.com/ashb/interoperablejs) are brought in as submodules, and some QUnit wiring holds it all together. This means we can validate our code against the specifications throughout development, and TravisCI can keep things running smoothly.

Finally, our older regexes are retired in favor of **Link.JS**. [Link.JS](https://github.com/sebmarkbage/link.js) is a module loader that takes advantage of the [Named Modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules) format in a future ECMAScript. they approached Inject offering their AST parser, which works fantastically well. It reduces complexity of our main code base, takes care of a few (annoying) regular expression bugs, and all around makes the dev team happy.

## Putting it all Somewhere
Last, with GitHub's decision to remove the downloads tab, we needed somewhere to put all our releases. Consider this the "soft launch" of the [InjectJS](http://www.injectjs.com/) website at [http://www.injectjs.com/](http://www.injectjs.com/). It's full of documentation, full of howto guides, and is in general does the framework more justice than a simple source page could have done.

We're up to RC2 on the [download page](http://www.injectjs.com/download/), with RC3 following at the end of this week. If all goes well, 0.4.1 should hit developers hands here in early January. And now we have somewhere to officially announce it.