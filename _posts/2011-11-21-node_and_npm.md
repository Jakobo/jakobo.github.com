---
layout: post
permalink: /article/developing_a_website_using_npm
title: Developing a Website Using npm
---

npm is a fantastic system for importing node modules into your project. What many people don't realize though is your project itself can be managed with npm, making the dependencies a breeze, and developing on multiple machines simple. It all comes down to the right package.json file and the same npm commands you already know and love.

This article is part of a [series on the construction of felocity.com](/article/felocity_on_nodejs). It's full of juicy bits on node.js development and deployment. The full source for felocity.com is [available on github](https://github.com/Jakobo/felocity-exp).

How npm Manages Packages
---
Probably the best analogy out there to npm is package managers themselves. The simplest explanation is they manage the installation of your dependencies and allow you to install software. npm allows for two types of installs; local installs for libraries your application or module needs to function and global modules installed with `-g` which are more often used for binaries. For 99% of the cases, you'll end up working with local packages, and then using `-g` for compilers or utilities. If you've already played around a bit with npm, you can see what has been installed into the local `./node_modules` directory by typing `npm ls`. For example, here's what's running on felocity.com

[Sample npm listing for felocity.com](https://gist.github.com/1341205#file_npm_list.txt)

You'll actually notice a few packages such as "request" listed multiple times. npm only resolves dependencies locally and downward through the three. If 3 modules all need "request", then it's placed in three locations to ensure the right version is available to the right module. felocity.com has quite a few dependencies, which get expressed in the `package.json` file.

There's so much about `package.json` that's cool it probably deserves a posting all its own. I'd recommend viewing [the package.json for felocity.com](https://github.com/Jakobo/felocity-exp/blob/master/package.json) or [read about package.json](http://blog.nodejitsu.com/package-dependencies-done-right) from people far more skilled at it than I. The one thing that's often overlooked is the `private` attribute which will prevent you from sharing your unfinished (or never-publish) module with the world. Just add this top level directive to your JSON; the same level as author, version, engine, etc.

[A basic package.json file](https://gist.github.com/1341205#file_basic_package.json)

Equipped with a non-publishing npm package, you're well equipped to do your development and your deployment with the help of npm. There's no reason your entire website can't be described as a node module. Once you've created a working package.json, all you'll ever need to do is type "sudo npm install" and all your dependencies will be put in place for you. This is a key step for deployment, as it keeps your installation very repeatable (and more on that later).

Caution: Ignoring node_modules
---
The one thing a lot of the tutorials on npm don't really tell you is that you should ignore your `node_modules` directory and not commit that to version control. Some packages will configure/make/compile binaries, and that won't necessarily be portable from machine to machine. By not committing your module directory, you'll be forced to install your dependencies every time which means everything will resolve correctly. Thanks to the awesomeness of npm, once a revision is published, it's available forever, so once you have it working you can trust it will continue to work.

Your Portable Website
---
Portability is what really makes npm shine for module development. As mentioned above, running `sudo npm install` inside of your application will install all of the dependencies. You can test this out once you have a package.json by running the following commands.

[Commands to remove and reinstall node modules](https://gist.github.com/1341205#file_remove_node_modules.sh)

Just like that, all your modules are reinstalled. When linked together with an automated deployment tool such as Capistrano, you can copy your code from git/svn, do your npm install, and have a highly portable website. npm does more than just manage packages. It can also organize your website, and with a package.json file handle your dependencies for you. The result is highly portable code that simply works all the time- a developer's dream.
