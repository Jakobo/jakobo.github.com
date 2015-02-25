---
layout: post
permalink: /article/getting_started_with_nodejs
title: Getting Started With node.js
---

Having learned lessons from the many solutions that came before it, getting started with node.js is a pretty painless process. If you're on Unix or OSX, it's a handful of commands and if you're on Windows it's even easier. There are two types of people getting started with nodejs. There's the people who know JavaScript, and the people who don't. If you're in the later category, you're in luck as a dizzying number of books have been written on the topic. JavaScript on the server is a lot like JavaScript on the client.

This article is part of a [series on the construction of felocity.com](/article/felocity_on_nodejs). It's full of juicy bits on node.js development and deployment. The full source for felocity.com is [available on github](https://github.com/Jakobo/felocity-exp).

If you're feeling comfortable, it's time to download nodejs. The best instructions I have found are [Joyent's own docs on installing nodejs](https://github.com/joyent/node/wiki/Installation), which are simplified down to

{% highlight bash %}
# in this example, we are using 0.4.10
# feel free to take any node version from http://nodejs.org/dist/
wget http://nodejs.org/dist/node-v0.4.10.tar.gz
tar -zxvf node-v0.4.10.tar.gz
cd node-v0.4.10
./configure
make
sudo make install
{% endhighlight %}

If you're on windows, there's a binary to make things even easier. Anecdotally, installing nodejs in cygwin is a path to misery that's easily avoided by just using the supported solution from the node.js people.

Once you've got node installed, you can create a simple node script, often called `server.js`

{% highlight js %}
console.log("Hello World")
{% endhighlight %}

Running it is as simple as `node server.js`, and you'll see Hello World in your console. A simple echo isn't all that interesting, so a better script would be the classic web server.

{% highlight js %}
require("http").createServer(function(request, response) {
  response.end("Hello World");
}).listen(3000);
console.log("Server running on localhost:3000");
{% endhighlight %}

Again, this is ran in the same fashion, using `node server.js` and you'll see there's a web server now running. Point a browser to http://localhost:3000 and you'll be greeted with a Hello World there. If you're a configuration nut like me, you're probably not happy with all the hard coded items such as the port it's running on. The above hello world script has been hashed through dozens of times, but in this case, we're looking for the bare minimum that confirms we've got everything running. The `node` command executes our script, and the rest is history. There's a ton of information on how to build a node.js server, but the easiest way is through an npm module called Express. Therefore, we're going to need npm.

## The Shortest Guide Ever to npm
If you are a sysadmin and you are paranoid, you should skip everything that has to do with npm. You're installing userland packages that are allowed to run scripts, and it can bring doom, misery, and probably the plague onto your servers. For rest of us who like getting our work done, the npm creator is a pretty trustable fellow, so you can just install npm where it's supposed to be and use it like any other package manager in the world.

{% highlight bash %}
curl http://npmjs.org/install.sh | sudo sh
{% endhighlight %}

(Note: Latest versions of node come with npm already installed. So, I stand corrected on the "shortest guide" bit now.)

Yes, you did just download a shell script and run it with sudo. Yes, install.sh could have just read "rm -rf /" and you'd be hosed. This is why we have backups, trust people, etc. If you get all queazy with that, then I recommend downloading the source and building yourself. (Here's a hint though, unless you're the paranoid sysadmin from above, you probably didn't read the makefile. Plan your risk accordingly.

npm is a bit different from your typical package manager. There are two major package types: global and local. As a general rule, "global" installs should be reserved for binaries you intend to run outside of the context of nodejs. Examples of great global installs would be Coffeescript, Less, and Run which all create global binaries. Everything else should be "local", and installs into a "node_modules" directory under your current project. Coming back to our previous section on using Express, acquiring it with npm is a one line command.

{% highlight bash %}
npm install express
{% endhighlight %}

You can then include it in your node.js server app using the `require()` statement. All the heavy lifting of Express is better left to the [Express Getting Started Guide](http://howtonode.org/getting-started-with-express) from the How to Node folks, which can detail all the awesome changes you can make in your server.js file. If you're going to go off and install random packages, I do recommend at least looking at their github pages and seeing how many people ware watching / forking the package as a rough barometer of a random package's trustworthyness.

## You're a Node Pro Now
Congratulations! Using Express and with some well-honed reading skills, you're well on your way to building the next generation of web applications. After toying with Express, I ultimately simplified down to a couple of npm modules: [escort for routing](https://github.com/ckknight/escort), [MiniMVC for code organization](https://github.com/Jakobo/MiniMVC), and [node-static for static file serving](https://github.com/cloudhead/node-static).
