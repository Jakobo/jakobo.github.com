---
layout: post
permalink: /article/asynchronous_flow_control
title: Asynchronous Flow Control
---

Doing the really cool stuff in node.js is subject to a lot of callbacks. Just about everything from reading files to serving pages to hitting a database operates with a callback. Pretty soon, your code looks like an ocean painting, waving back and forth with function statements everywhere. Taming them is pretty easy with the help of Step or Seq. I hadn't had much experience with flow control libraries in JavaScript- when you think about it, the majority of stuff done in the browser revolves around the DOM. At worst, you have maybe one or two levels of callback, solved with a quick closure. In the world of node, however, the callbacks run deep; organizing your code can make maintainability a lot easier.

This article is part of a [series on the construction of felocity.com](/article/felocity_on_nodejs). It's full of juicy bits on node.js development and deployment. The full source for felocity.com is [available on github](https://github.com/Jakobo/felocity-exp).

Step
---
[Step](https://github.com/creationix/step) (MIT License) is the old guard of asynchronous flow control in node.js. Now, granted node.js hasn't been around for very long, that isn't saying much. It has a devout group of followers, and is probably the easiest library to get started with. Step works by creating an array of functions, which will be executed in order.

[An example of using Step to read a file](https://gist.github.com/1341215#file_step.js)

As the first item finishes, the next one will begin. If you'd like to do items in parallel, just use `this.par()` to set up parallel flows. The results of your parallel calls will be in the next sequential step and the order will be maintained. What was once extremely nested sets of code is now much cleaner and as a result, much more readable.

One major thing you have to work around is callbacks that return items beyond `err, value`. There's a [pull request](https://github.com/creationix/step/pull/10) for the issue, but it sounds like support for this is not on the horizon, creating a small bit of awkwardness when using libraries such as [request](https://github.com/mikeal/request).

Seq
---
[Seq](https://github.com/substack/node-seq) (MIT/X11 Licenses) is an alternative to Step which attempts to solve many of the same problems. Where Step looks at using an array of functions to execute, Seq relies on a chained API for stringing together functions.

[An example of using Seq to read a file](https://gist.github.com/1341215#file_seq.js)

Items in parallel are achieved using the .par() interface, and like Step, order is maintained. In addition, the chainable API for Seq makes it possible to perform filter, map, and reduce operations on your result set. If you're working with async functions that would return arrays such as directory reading, this can save you a ton of time.

Unlike Step, Seq is not a standalone item. As of this writing, it needs chainsaw and hashish as dependencies. If you're using npm, these will be taken care of for you.

Personal Preference
---
In the end, I went with Seq. Ultimately, this was more because of the use of Coffeescript than anything else. Seq supports a collection of underscored methods such as `.par_()` and `.seq_()`, for which the first argument becomes the context "this". When using coffeescript, this allows for some really clean code

[An example of Seq using Coffeescript](https://gist.github.com/1341215#file_seq.coffee)

The nested API in seq() breaks down quite a bit, but I haven't found myself in need of a nested context. The easy readable parallel API is indispensable, and removes a bulk of the serialization on pages like the [source code](https://github.com/Jakobo/felocity-exp/blob/1206c6d055f0d8e7eeb9d136c856208f2083209a/src/controllers/root.coffee#L31) for the felocity.com home page.
