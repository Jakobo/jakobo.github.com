---
layout: post
permalink: /article/introducing_inject
title: Introducing Inject
---

Getting a CommonJS Compliant loader in the browser has been a dream of node enthusiasts everywhere. Tools such as RequireJS and SeaJS have embraced a script tag based variant. But, can't we just use the staple require() function everyone is familiar with? It was from this question that Inject was created; we should have dependency management in browsers with a near complete CommonJS interface. If you're looking to just get the source and get started, the [inject project is on github](https://github.com/linkedin/inject), and comes with a [getting started guide](https://github.com/linkedin/inject/wiki). The rest of this post focuses on the design philosophy, the challenges in adding a cross domain layer, and LinkedIn's plans for maintenance and support.

## Philosophy and Design
One of the challenges that faces all browser loaders is the "requires / provides" dynamic. On one side of the coin, a given script file needs to express its dependencies- files that must load before it executes in order to ensure objects exist. The most primitive of these is a simplification of many specifications including dojo. (In all fairness, dojo has been doing solving this problem for years thanks to their java-style packaging.)

{% highlight js %}
// require two modules
require(["requiredModuleOne", "requiredModuleTwo"],
  // run this callback when modules are loaded
  function(moduleOne, moduletwo) {
    // explicitly declare a dependency is available
    provide(newModuleName, resultWhenRequired);
  }
);
{% endhighlight %}

The problem though, is everyone has developed their own loading system. YUI has [YUI.use()](http://yuilibrary.com/yui/docs/yui/), dojo has [dojo.require()](http://dojotoolkit.org/reference-guide/dojo/require.html#dojo-require), and ender wraps your files together for [CommonJS or provide() syntax](http://ender.no.de/#client). All of these are built to work around the limitations of the browser. What if we could get back to CommonJS basics?

{% highlight js %}
var foo = require("foo"),
    bar = foo.bar;

exports.bar = bar;
{% endhighlight %}

* What about the number of downloads? We'll need a packager option for people who need it, but it shouldn't be a requirement to run this.
* What about cross domain? We've solved this problem hundreds of times in web development. There should be a lightweight solution that exists when we control both domains.
* What about the compatibility for libraries like jQuery? There needs to be support for AMD. This also solves the first point, allowing for packaging common files into a rollup.

Inject's approach was to support CommonJS to the greatest ability. This meant going for the simplest of solutions as a starting point- XHR + eval. Those familiar with dojo's original require() call and its synchronous nature will remember this proved to be a very effective method for code inclusion. Inject takes this idea and goes one further, recursively downloading the dependency tree, so that all modules are available and can be called in a synchronous nature.

## Adding AMD to the Mix
Libraries such as jQuery as of 1.7 have added support for the [Asynchronous Module Definition](https://github.com/amdjs/amdjs-api/wiki/AMD) syntax. This means that if the module is loaded via a script tag, it can make itself available to standard require() calls. Once the foundations for CommonJS were in place, the AMD methods for define() and require() map nicely into the asynchronous loading pattern. The primitive AMD wrapper can then be used around your CommonJS module code.

{% highlight js %}
define(function(require, exports, module) {
  // your file contents here
});
{% endhighlight %}

To facilitate this process, the inject team is giving deep consideration to adding a utility for wrapping your code in case you want / need bundling support. Ultimately though, adding support for script tags is a way to step around loading items on cross-domain, something that has been solved several different ways. Concatenation still presents a compelling use case, however, especially in cases where one may want to bootstrap a page with a bunch of modules pre-loaded.

## Cross Domain
Unlike 3rd party javascript, loaders have the advantage of controlling both endpoints- the page and the domain that hosts the included scripts. For a zero-hassle solution, [Porthole](http://ternarylabs.github.com/porthole/) offers a way to talk between domains when you can host an HTML page on both sides. This "relay file" makes it possible to do an XHR request and pass the file contents back to the origin page. Since Inject is built on XHR + eval, adding this library makes it easy to maintain the same syntax for require calls without having to support multiple code pathways. The only difference between the implementations is the addition of a function to locate the relay files.

{% highlight js %}
require.setCrossDomain("http://example.com/relay.html",
                       "http://cdn.example.com/relay.html");
{% endhighlight %}

## Maintenance and Support
We're rolling out inject at the core of LinkedIn's new UI framework- a collection of low level building blocks for rich interactivity. Support will be ongoing, but we're already ramping up for our production release. From the beginning, we wanted to keep development out in the open- the group found little value in working solely internally on this effort. As a result, our bugs, tests, and implementation are all openly on the web. [Join the inject project on github](https://github.com/linkedin/inject) and start loading your scripts in a new and refreshing way.
