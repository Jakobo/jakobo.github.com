---
layout: post
permalink: /article/hidden_wizards_of_linkedin
title: The Hidden Wizards of LinkedIn
---

In case you somehow found this blog before my employer's, we recently released the [new LinkedIn Platform](http://blog.linkedin.com/2011/04/06/linkedin-developer-platform/). With it comes a system for embedding professional content around the web. It's been almost a year in development, launched after a hard look at our dated member and company profile widgets which were used on really high profile sites. You can't do something like this without having some fun though.

## Hidden Wizards
Simply put, the Hidden Wizard is an Easter Egg of sorts. It my mind, it pays homage in name to the Imagineers of Disney who [placed subtle images of Mickey Mouse](http://en.wikipedia.org/wiki/Hidden_Mickey) into their designs. LinkedIn's "Wizard of IN" used to be the image associated with downtime on the site as we'd update the Java code base. Advances in our operations infrastructure has removed the need for the Wizard, so he has become available for more playful endeavors. Sometimes, we leak one or two for fun, but the majority of them we leave in secret for other engineers and developers to find. It's actually quite fun to find a bit of code as a developer and go "hey, what's that do?" and them BAM, the LinkedIn Wizard shows up.

The Wizard doesn't always manifest the same either. Sometimes it's an image, but other times it's just a one line reference in a code comment or a comical reference to something being handled "magically".

## LinkedIn Platform Wizard 1 of ?
Given the brief history of Hidden Wizards and the fact it's been a bit of an inside joke here at the company, it's possible you didn't even know we had them. To start your quest for Wizards, the LinkedIn Platform supports script tags with a type of "IN/tagName" where "tagName" is the name of a tag. We have tags for member profiles, company profiles, share buttons, and login buttons. What happens if we have use "IN/Wizard"?

{% highlight html %}
<script type="text/javascript" src="http://platform.linkedin.com/in.js"></script>
<script type="IN/Wizard"></script>
{% endhighlight %}

<script type="text/javascript" src="http://platform.linkedin.com/in.js"></script>
<script type="IN/Wizard"></script>

And there's the Wizard. Where else is the Wizard lurking? You'll just have to explore.
