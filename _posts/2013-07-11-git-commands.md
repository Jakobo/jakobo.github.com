---
layout: post
permalink: /article/good_git_commands_to_know
title: Good Git Commands To Know
---

I love git. It and its other distributed version control systems have changed the way we think and write about code. Not too long ago, we used to commit giant monoliths of code to SVN locations. Complex environments often had to dedicate at least one person to managing branches. It was the complete opposite of good. I've been using git now for over 6 years, and I'm still learning tips and tricks that make my day to day development easier and better. These are my favorite commands.

## git bisect: When did the code go wrong?
Eventually something will break, and it will only happen after a long stream of commits. The `git bisect` command allows you to begin searching for that commit where things went south. The command looks like

{% highlight bash %}
git bisect start
git bisect bad HEAD
git bisect good aecdb123
{% endhighlight %}

You'll need to specify a "bad" revision (often `HEAD`), a "good" revision (perhaps from a tag or `git log`), and then you're off to the races. Git will select a commit exactly halfway between "good" and "bad". So you'll test your code. If it worked

{% highlight bash %}
git bisect good
{% endhighlight %}

And if it didn't

{% highlight bash %}
git bisect bad
{% endhighlight %}

Every time you tell git if things are good/bad, it will cut the remaining revisions down by half. Before you know it, you'll have zeroed in on the code that is causing everything to fail. Check the commit log, see what happened, and you'll usually be 99% of the way towards fixing your broken build. All of the bells and whistles that make bisect even cooler are available on the [git-bisect docs page](http://www.kernel.org/pub/software/scm/git/docs/git-bisect.html).

## git pull --rebase: cleaner merges
Often times, you will have to pull down changes from somewhere like github. By default, `git pull` will create a full merge, interweaving your code and the upstream code together. On large projects, this can be incredibly painful if it comes time to bisect something. Instead, the `git pull` command has the ability to rebase your changes. You'll jump to your upstream version, and then apply your commits as if they were a series of patches. The result? A nice linear commit history.

{% highlight bash %}
git pull --rebase origin master
{% endhighlight %}

The above command rebases the `origin` remote's `master` branch into your current working copy. If you're tracking an upstream branch, the remote and branch names become optional items.

## git config --global alias: less typing
Sometimes, you probably feel like a rediculous string of git commands is necessary to get exactly what you want. Git helpfully makes it easy for you to rerun that command by aliasing your favorite command (which might now be `git pull --rebase` to a new git command), to something like `git rpull`.

{% highlight bash %}
git config --global alias.rpull 'pull --rebase'
{% endhighlight %}

Other uses of the alias command I've seen is to shorten the `git bisect` commands, use special arguments for `git log`, or generate work specific diff files using the options for `git diff`.

## git-reflog: proof you can undo just about anything
`git reset --hard` is probably one of the scariest operations you can do. Just like that, it could appear your entire repository was catapulted back in time. This can be pretty great... as long as you didn't need any of those changes. It only took me accidentally resetting my changes once before I did `git reset` in new branches only. This was before I learned about the "reflog".

The `git reflog` command spits out a sequence of operations.

{% highlight text %}
$ git reflog

1907832 HEAD@{0}: checkout: moving from master to sample
1907832 HEAD@{1}: commit: working on git article
809189a HEAD@{2}: commit: final title change
1887f64 HEAD@{3}: commit: minor amendment to iframe article
6c8e64c HEAD@{4}: commit: launch iframe blog, added to git blog
b47369b HEAD@{5}: pull origin master: Fast-forward
7f66541 HEAD@{6}: commit: changed to hashes for markdown, new post
b9e19d0 HEAD@{7}: commit: converting to pygment happy land
432a308 HEAD@{8}: rebase finished: returning to refs/heads/master
432a308 HEAD@{9}: rebase: more drafting of the creed post
{% endhighlight %}

It turns out that it's damn-near impossible to lose something in git. As you commit, rewind, replay, and revert, git keeps a record of every single thing you've done. Now, let's reset to some arbitrary distance ago, destroying all my hard work.

{% highlight text %}
$ git reset --hard b9e19d0
HEAD is now at b9e19d0 converting to pygment happy land
{% endhighlight %}

Sure, I'm back in "pygment happy land", but I just lost 7 commits worth of work. Whoops. `git reflog` knows you better than you think; it has your history of changes, including your foolish reset:

{% highlight text %}
$ git reflog

b9e19d0 HEAD@{0}: reset: moving to b9e19d0
1907832 HEAD@{1}: checkout: moving from master to sample
1907832 HEAD@{2}: commit: working on git article
809189a HEAD@{3}: commit: final title change
1887f64 HEAD@{4}: commit: minor amendment to iframe article
6c8e64c HEAD@{5}: commit: launch iframe blog, added to git blog
b47369b HEAD@{6}: pull origin master: Fast-forward
7f66541 HEAD@{7}: commit: changed to hashes for markdown, new post
b9e19d0 HEAD@{8}: commit: converting to pygment happy land
432a308 HEAD@{9}: rebase finished: returning to refs/heads/master
432a308 HEAD@{10}: rebase: more drafting of the creed post
{% endhighlight %}

A quick `git reset --hard 1907832`, and everything is back. Making reflog the **absolutely coolest tool in a version control system**.

## Keep Learning
Most of these tips were pulled from notes I took while learning git. I then learned there is an entire website dedicated to improving your git-fu. [http://gitready.com/](http://gitready.com/) has examples, tricks, tips, and even more amazing things that go beyond this basic article.