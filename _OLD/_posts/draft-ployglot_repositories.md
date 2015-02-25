---
published: false
layout: post
permalink: /article/mixing_css_and_js
title: Mixed Language Packages
---

We're at a weird place as front end developers.
npm changing landscape
emergence of ui patterns, the "next" jQuery UI
but how do you distribute

## A Relative Problem
In a single language with single files, this is straightforward. node as example: js calls js
css is not
CSS contains dynamic links to images, fonts, etc
links need to be preserved

## Our Current Attempts Aren't Enough
css rework with npm https://github.com/conradz/rework-npm
bower's main property is overloaded
