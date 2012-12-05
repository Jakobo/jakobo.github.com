---
published: false
layout: post
permalink: /article/inject_0.4.1_features
title: Features in Inject 0.4.1
---

It's been a while since I've talked about some of the software coming out of LinkedIn. The [open source projects](https://github.com/linkedin) we do continue to thrive. Of specific note is [Inject](https://github.com/linkedin/inject) which is in the process of maturing into 0.4.1. Now that the first RC is available, it's a good time to talk about the framework and what's changed. The last time I talked about Inject was on the [LinkedIn Engineering Blog](http://engineering.linkedin.com/open-source/introducing-inject-open-source-javascript-dependency-management-library-browser) when we were at 0.3.0, so it has been a while indeed.

## When We Became 0.4.0
Since the original launch, we made a few significant (backwards incompatible) changes that forced us to increment the second "dot" in our build system. Inject builds are best described as

{% highlight %}
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

The **afterFetch**
afterFetch
New Test Compliance
Introducing Link.JS