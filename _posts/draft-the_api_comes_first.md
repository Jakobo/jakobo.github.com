---
published: false
layout: post
permalink: /article/the_api_comes_first
title: The API Comes First
---

It's easy to overengineer. It's hard to course correct. It's impossible to think your code will be as beautiful as the day you wrote it. You can, however, improve the survivability of your code by focusing on the most important part of software you write: your API. No matter if it is a library, public methods, or integration code, writing a good API will make refactoring and updating the code easier as it ages.

## Don't Jump Into It
Unless the code was due in production yesterday, don't start by writing your end-code. If the code was due in production, perhaps it's time to push back. When planning out your public methods, you should be able to answer the following questions:

1. What does someone invoke to use my code?
2. If someone needs to change something, where would they look?
3. If I have to come back to my code in a year, what would I need?

The most useful tool here is the README file. Take a stab at writing your README. What makes this code special? How does it work? How does someone start using it right away? This code is being written for developers; your future self may be your own consumer.

TODO: Write the blog post first

## Pick a Philosophy
After you've built the README, there's a dominant philosophy that is emerging. It's okay, all engineers have opinions on how to do something. Your job as a software author is to make sure the philosophy is clear- personally I recommend adding this to the README too. While people may agree or disagree with your philosophy behind the code, understanding intent makes it easier to diagnose problems and unravel complexity.

It doesn't have to be right, it just has to be consistent.

## Meet Your "Client"
README, check. Philosophy, check. It's time to get some opinions. At LinkedIn, I'm fortunate enough to have almost a hundred colleagues in my discipline to bounce ideas off of, and another 400+ in various engineering functions around the company. Every one of these people is a potential user of your code; their feedback will be valuable in molding your vision into something people can get excited about.

## Advertise
