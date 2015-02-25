---
layout: post
permalink: /article/extensions_in_the_linkedin_javascript_platform
title: Extensions in the LinkedIn JavaScript Platform
---

Recently, LinkedIn released their JavaScript API+SDK. It's a powerful tool for client side development, complete with the Open Program's REST APIs built in. A quick look at [LinkedIn Labs](http://www.linkedinlabs.com) shows off some of the functionality that's available. For all of the documentation that's available, there's also quite a bit of functionality we haven't exposed officially. One such item is the Extensions Framework built in to the JavaScript APIs. One of the original design points in the API was the ability to test updates, fixes, and new functionality without having to change versioning or risk backwards compatibility. The Extensions Framework layers new code on top of the default "in.js" files, mixing in behavior at framework run-time. Here at LinkedIn, we've used Extensions to create new tags, prototype new features, and test out bugfixes without altering the production code.

Since the stuff in this article isn't on the official developer page, it's *"experimental"*, so the functionality can't be guaranteed.

Adding extensions to the framework is done by adding additional directives to the in.js script block. This is the same place where the API Key is placed. Extensions are added in a comma separated list of name@url formatted pairs. For example, an extension named "MyExtension" and loaded off of the felocity.com domain will look like the below code. To keep the example simple, any extra options have been removed.

{% highlight html %}
<script type="text/javascript" src="http://platform.linkedin.com/in.js">
api_key: api_key_123456
extensions: MyExtension@http://www.felocity.com/myextension.js
</script>
{% endhighlight %}

Extensions are loaded asynchronously, but the framework will pause before entering final initialization if it detects an extension has not loaded. If files don't load, the framework will initialize anyway, without the extension loaded.

The key to an extension is in the `IN.$extensions()` method, which takes an extension name as the first parameter, and the function body as the second parameter. This anonymous function will be executed after the LinkedIn framework has loaded, but before any `onLoad` events are fired from the script tag.

{% highlight js %}
IN.$extensions("MyExtension", function() {

  // body of extension goes here

});
{% endhighlight %}

From here, just about anything is possible. The Sslac library (which probably needs its own blog post) makes it possible to swap or rewrite entire methods. To get started, Sslac offers a root method `definitionOf()` which will give you the object definition of something that has already been defined in the system. You can then add, remove, and swap both the methods and constructors on the object. The below example adds JSON support to the base API object. Adding this enables the developer to call .json() just like .result() and .error(), with a JSON representation of the results being passed in.

{% highlight js %}
IN.$extensions("MyExtension", function() {

  // modifies IN.API.base to add a method that converts results to JSON
  var IN_APIS_BASE = Sslac.definitionOf("IN.APIs.Base"),
      construct = IN_APIS_BASE.getConstructor(),
      handleSuccess = IN_APIS_BASE.getMethod("handleSuccessResults");

  // change the constructor to also add a "json" handler
  IN_APIS_BASE
  .Constructor(function() {
    construct.apply(this, arguments);
    this.handlers.json = [];
  })

  /**
   * Perform an API get, and the invoke the supplied function with the result
   * @method json
   * @param fn {Function} a function to invoke
   * @param scope {Object} a scope to run "fn" in
   * @return this
   */
  .Method("json", function() {
    this.addHandler(this.handlers.json, [].slice.apply(arguments));
    this.get();
    return this;
  })

  // override handleSuccessResults to also run the json() handlers
  .Method("handleSuccessResults", function(results) {
    // run and clear the json handlers
    this.runHandler(this.handlers.json, JSON.stringify(results));
    this.markHandlerAsRan(this.handlers.json);

    // run original method
    return handleSuccess.apply(this, arguments);
  });

});
{% endhighlight %}

To try it out, just use the [LinkedIn JavaScript Developer Console](http://goo.gl/v8jQv) which will run the above example. If you'd like to host this extension on your own domain and start using .json() in your LinkedIn JavaScript development, the door is open. All I ask is to not hotlink github in production code, because that's really not cool.
