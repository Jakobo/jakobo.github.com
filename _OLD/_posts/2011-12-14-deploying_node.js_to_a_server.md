---
layout: post
permalink: /article/deploying_nodejs_to_a_server
title: Deploying node.js to a Server
---

You've won! You have a node application, you've built it and have selected some tools to keep it running forever. Now you just need an easy way to deploy it and take advantage of all the portable code you've been writing. Alarmingly, if you're not going with one of the node hosts and using their command line tools, you're left pretty much out in the cold. Personally, I'm a bit scared of lock-in for the cloud, so I went the route of Capistrano on an Amazon Web Services Ubuntu box. I did take care to keep everything portable though so I could jump clouds at a moment's notice. If this sounds like you, or you're just curious about how to move your nodejs project beyond localhost:3000, keep reading.

This article is part of a [series on the construction of felocity.com](/article/felocity_on_nodejs). It's full of juicy bits on node.js development and deployment. The full source for felocity.com is [available on github](https://github.com/Jakobo/felocity-exp).

## Portable Code
For every nodejs deployment out there, you're going to want a package.json file. (package.json helps develop)[/articles/developing_a_website_using_npm], but it also helps with deployment. Setting up a good package.json is simply good hygiene. Good hygiene also means researching the dependencies and seeing which items are pure JS, and which ones will involve compilation. You'll want to keep that list handy since if there will be problems, they'll likely be in calls to configure or make for lower level libraries. If you are not sure how to identify them, install your npm modules one at a time. You'll know you found a low level C library if you get a stream of output beyond the usual npm OK lines.

If you haven't tried rebuilding your project from the package.json, now would be a good time to try that. Delete your node_modules directory and reinstall from npm.

{% highlight bash %}
rm -rf ./node_modules
sudo npm install
{% endhighlight %}

Try the above a few times, check out your code on another machine and reinstall node modules, and if you have the chance try to get things running on an architecture similar to where you'd like to deploy your code. Once you're comfortable with the manual deployment process, it's time to select a nodejs host.

## Established node.js Hosts
First of all, this is in no way a complete list. Every nodejs host has their own quirks, and I did my best to note them here. You can't really go wrong with a hosting provider, all the ones on this list are pretty powerful. Cost is also pretty consistent; plan on about $15-20 a month for your server if it's going to be running 24/7.

[Heroku](http://devcenter.heroku.com/articles/node-js) has a nodejs hosting solution running on their Cedar stack. As of this writing, you must be planning to run against node 0.4.7. To asset this, set the `engine` value to `node = 0.4.7` and rerun your code. You may need to get a new version of node (from npmjs.org) and use that instead of the cutting edge version. Running your app on Heroku makes use of a Procfile. Details on [building and testing your Procfile](http://devcenter.heroku.com/articles/node-js#declare_process_types_with_foremanprocfile) can be found on the Heroku wiki.

[no.de](https://no.de/) is built by Joyent, and is one of the cleanest implementations of a hosted nodejs solution. You provision, you get your package.json running. You can also optimize your deployment by installing your npm dependencies globally. no.de will always use the latest stable version of nodejs, so you may want to check that `engine` line in package.json to ensure it's behaving the way you wish. If you've followed the good hygiene items above, then [integrating no.de with npm](http://wiki.joyent.com/display/node/npm+Integration) is a pretty painless process.

[nodejitsu](http://nodejitsu.com/) is the new kid on the block, but built by some really smart people- their entire stack is open sourced for people to look at and learn from. Management of your application is done using the [jitsu](https://github.com/nodejitsu/handbook#jitsu) command line tool, which handles provisioning, deploying, and configuring. npm drives the dependencies through package.json, and like the other hosted solutions is pretty straightforward to set up. As of this writing, notejitsu is on a closed beta system, but should be opening up in the future.

## DIY on AWS
Choosing the more masochistic route, I opted for using Amazon Web Services (AWS) for nodejs. This meant doing everything by hand, which allowed me to learn how to do some system administration stuff. If this doesn't sound appealing at all, Heroku, no.de, and nodejitsu are fantastic alternatives. However, if you're wanting complete control, AWS or another cloud solution is the way to go. This next section is going to assume you've made an AWS account. There's three main pieces you'll want to tackle when doing your own cloud solution.

* OS Selection (with good nodejs compatibility)
* Server setup automation
* Deployment automation

When it comes to OS Selection, the one true server according to google is Ubuntu's Lucid Lynx (10.04). You can find this available for most cloud providers. For Amazon, I actually recommend using [Alestic's modified images](http://alestic.com/). Just select your region and get the AMI id. Lucid Lynx will be supported a while longer, and it's likely the next Long Term Support server will also be getting a lot of nodejs love. Setting up the AMI is easier if you install the Amazon EC2 tools. If you're looking for how to set those up [this tutorial on EC2 and OSX](http://www.robertsosinski.com/2008/01/26/starting-amazon-ec2-with-mac-os-x/) is a really good starting point. Tools installed, it's a single command to start a micro instance.

{% highlight bash %}
ec2-run-instances -t t1.micro -n 1 -g default -k default \
--region "us-west-1" --user-data-file \
configure_server.sh ami-eb227eae
{% endhighlight %}

One of the greatest things about Alestic's AMIs is the ability to pass a custom script in for execution. The `configure_server.sh` will run on first boot, and will run as the root user. Anything you'd like to do on your first start can go here; we're going to use this for installing node, npm, dependent libraries, nginx, and get the machine auto-updating when there are new security updates. The [server configuration script](https://github.com/Jakobo/felocity-exp/blob/master/_server/configure_server.sh) details all the different commands used to set up a server on felocity.com. Some interesting parts of the script are the apt auto-updates for security and the nginx proxy which by default pushes everything on port 80 to the localhost port 3000.

## Capistrano for AWS
With the ability to repeat the deployment of your nodejs server, the next step is to get repeated deployment of your nodejs application. Of all the pieces of this process, I am fuzziest here so I can only impart my learnings. There are two basic approaches for tackling this:

1. You can add a hook and "git push" just like you would to any other git repository. The hook can do awesome automation.
2. You can use a 3rd party deployment tool. This means your deploy commands can be bundled with the repository.

Since I was going for modularity and the ability to switch clouds on the fly, #2 was definitely the more appealing option. First of all, if you're using GitHub, there is a [guide for using Capistrano with GitHub(http://help.github.com/deploy-with-capistrano/) by the GitHub folks. That alone is going to save hours of headache. "capify" the project, and then refer to [felocity.com's capfile](https://github.com/Jakobo/felocity-exp/blob/master/Capfile) for the gory details. In here, you'll find the Upstart script I am using along with the npm install commands we've talked about in previous sessions.

{% highlight bash %}
# working...
git add .
git commit -m "commit message"

# publish changes...
git push origin

# deploy
cap deploy
{% endhighlight %}

And there you have it. 4 commands which can build the site, on demand, to any locations specified in the Capfile. More servers needed? Create them on AWS, and type `cap deploy:setup` and they're ready to receive the goods.
