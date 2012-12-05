---
layout: post
permalink: /article/isolation_testing_in_php
title: Isolation Testing in PHP
---

*This is from the old archives. It's accuracy, links, code may all be funky or out of date.*

Since [SnapTest 1.0][snaptest], I've been wanting to improve upon the level of isolation occurring on a per-test level. Working with one PHP process per file reduced the chance of collision, but it still had problems. In cases where a tested object had to work with static classes, for example, it was difficult to ensure the class was reset properly during setUp() and tearDown(). To get there, each test would need to be ran in its standalone PHP process.

When doing research on how to spawn sub processes cross-platform, the options end up being very limited. Since forking is not available on window boxes, the only two available options seemed to be [popen()][popen] with STDIN and [system()][system] with a socket connection. With inspiration from [Ming's spinlock concept for JavaScript][mingblog], it was possible to spawn the needed child processes, and check back on their output in a round robin fashion. Using /bin/nice (or the /low switch on windows) also keeps any one process from starving the parent.

The final piece was building out the classes needed. Specifically, a dispatcher for managing and collecting data off of STDIN and an aggregator for handling completed result sets. The bare bones structure ended up looking a lot like a simple JavaScript event model:

{% highlight php %}
<?php
class Dispatcher {
    public function dispatch($call, $key_stack, $options = array()) {
        // ... set up an array for child processes
        // ... dispatch, collect round robin
        // ... got a complete response from a child
        call_user_func_array($options['thread_complete_callback'], array($results));
        // ... continue until all dispatches are made for $key_stack
        // ... dispatch complete callback
        return call_user_func_array($options['dispatch_complete_callback'], array($results));
    }
}
?>
{% endhighlight %}

The final implementation ends up being a bit more verbose, but the concept is there. Unfortunately, one caveat of this approach is that call_user_func_array() is not known for its speed, as PHP isn't very good at mapping an array to function arguments.

The code implementation is visible in the [SnapTest repository][snaptestrepo] and will likely end up in the next release. The next step though is to get the web-testing interface (and then the web-services layer). AJAX makes a much better multi-process controller, and while it can only handle 4 children at once for the same domain, it does create a truly asynchronous test with all the benefits of isolation.

[snaptest]: http://snaptest.googlecode.com
[popen]: http://www.php.net/popen
[system]: http://www.php.net/system
[mingblog]: http://my2iu.blogspot.com/2006/10/javascript-in-ie-is-not-multithreaded.html
[snaptestrepo]: http://github.com/Jakobo/snaptest
