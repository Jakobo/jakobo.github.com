---
layout: post
permalink: /article/svn_checkout_with_one_key_commit_with_another
title: SVN Checkout With One Key, Commit With Another
---

This really shouldn't be as hard as it ends up being, but in subversion, you have a bear of a time checking out with one set of credentials, and then committing with a second set. For example, you want to give everyone a single public (read only) checkout path, and then let people with commit access use their ssh keys to do checkins. The secret actually lies in the clever use of the `svn switch` command. I in no way know if this is the best solution, but it seemed to be better than changing short usernames or other workarounds in the ssh client itself to force login with a certain user.

## Setting up the SVN Scheme, Doing a checkout

The first step is to set up a scheme for doing a readonly checkout.

[config](https://gist.github.com/341711#file_config)

This defines an ssh scheme called `readonly` which uses a shared key for access. Since we're dealing with this over SSH, everyone needs some kind of login, and this happened to be how it was set up coming in. (This would be mountains easier if "read only" was accomplished over https.)

Once we have the svn scheme set up, we can checkout the code using the `svn co` command.

[co.bash](https://gist.github.com/341711#file_co.bash)

At this point, we have the code checked out, but any attempts to commit will fail (since the user doesn't have write permissions on the target machine. Everything to this point is working as designed. The last step then is to change the repository so that you can use a non-readonly account to perform the commit.

## svn switch --relocate to Change the Commit User
The solution as mentioned at the top is using the `svn switch` command to change the repository's URL. It's the same URL, but by changing the scheme, we enable normal ssh commits (where the local user could presumably use their own private key). The svn switch command uses the --relocate command to rewrite the URLs.

[switch.bash](https://gist.github.com/341711#file_switch.bash)

Our svn commit now goes through over svn ssh using the local user's credentials. If you ever want to revoke the commit access, you can call `svn switch` again and change back to the readonly scheme.
