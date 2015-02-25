---
layout: post
permalink: /article/keeping_nodejs_running
title: Keeping node.js Running
---

If you've been developing on node.js, you have likely watched an uncaught exception bring your entire app crashing down. In development, there's certainly been a time where you've made a change, restarted your node server, only to make a change 5 seconds later and repeat the process. Luckily a ton of smart people have already been down these roads for everyone's benefit, and there's tools for both development and production.

This article is part of a [series on the construction of felocity.com](/article/felocity_on_nodejs). It's full of juicy bits on node.js development and deployment. The full source for felocity.com is [available on github](https://github.com/Jakobo/felocity-exp).

## runjs in Development
The first of these "run forever" utilities is written in node itself. [runjs](https://github.com/DTrejo/run.js) uses a very simple system for ensuring your website is always going in development. You install runjs with the following command

{% highlight bash %}
sudo npm install -g run
{% endhighlight %}

Unlike many other node modules, runjs requires the `-g` flag to install globally since it will install some binaries. Once installed, runjs is ran just like you would execute node.

{% highlight bash %}
runjs server.js
{% endhighlight %}

Upon running, runjs scans the current working directory for all of the files inside of it. Once running, the server aill automatically restart if a file being watched changes. If you'd like to watch additional files, Control-C and rerun runjs.

## Launchd, Upstart, and Foreman
When it comes to a more production like environment, you're likely going to want something tailored to your OS. Many operating systems have built in "keep-alive" solutions. A list of solutions, descriptions, and links are provided below. Sometimes though, you'll want a solution that works like your npm modules- just about anywhere and that's covered after the list.

* Launchd (OSX): [Read about how to configure a service in OSX here](http://www.macgeekery.com/tips/all_about_launchd_items_and_how_to_make_one_yourself). Launchd is the easiest way to keep a job running. It's command line app launchctl allows you to specify a plist file you'd like loaded, and the system does the rest for you.
* Upstart (Ubuntu): [Read about how to configure a long-running job here](http://howtonode.org/deploying-node-upstart-monit). Upstart's start/stop mechanism is probably one of the neatest things I've played with (though to be fair, my sysadmin-fu is weak). You create a script with start and stop commands, and you then tell ubuntu to respawn it as needed.

If all of these seem a bit too sysadmin oriented, You can also turn to the rails savior called [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html). Foreman works off of an item called a `Procfile` placed in your application's root directory. It will then properly daemonize your nodejs script and keep it running. A simple procfile for a node server is below, but you can find all kinds of awesome docs on the [Heroku dev center](http://devcenter.heroku.com/articles/node-js)

{% highlight text %}
web: node server.js
{% endhighlight %}

## What Felocity is Using
Felocity's on Ubuntu, so I went with Upstart to keep things running. One thing all these utilities are not very good at is noticing if your server is down or not, such as being hung in a long-running thread. For that, I'll probably add a tool like Monit, but I don't have any guidance yet as far as what works the simplest. The above items though will certainly tame the exceptions and keep your server going.

**Update:** I finally bit the bullet and installed monit. The howtonode article on [upstart and monit](http://howtonode.org/deploying-node-upstart-monit) was an invaluable ally to get things going. I've modified the scripts to be compatible with Capfiles for deployment ease. You can see the final results in the [felocity.com source code](https://github.com/jakobo/felocity-exp).
