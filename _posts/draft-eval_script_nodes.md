---
published: false
permalink: /article/executing_a_script_node_using_appendchild
title: Executing a Script Node Using appendChild()
---
When it comes to executing code, eval() is not very good at picking up syntax errors. It's line number is consistently the point of eval() and not the line in the eval-ed code that contained the problem. Script tags, however, are free of these problems, and report line numbers as parse errors. What results is an alternate technique for "eval", which can catch parse errors in JavaScript code. Being [evil](http://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/), this "eval" should be used with caution. However, sometimes you just need to get that line number.

.innerHTML and .text
--------------------
The first attempt was to set innerHTML to your JavaScript, and then place that node onto the page via appendChild. If you are only concerned with modern non-microsoft browsers, you'd be done at this point.

[Setting the innerHTML property of a script node](https://gist.github.com/3279693#file_innerhtml.js)

Internet Explorer (helpfully) won't execute the JavaScript inside of this script tag, even though the property is set. However, it [uniquely supports the .text property](http://msdn.microsoft.com/en-us/library/ie/ms535892(v=vs.85).aspx), which no other browsers seem to support. When set, scripts in IE will execute once appended to the DOM. A few changes to our above script, and we have a "safe" method. We'll actually feature test against this text property setting, falling back to alternate versions as needed.

[Setting the script node using innerHTML or text](https://gist.github.com/3279693#file_innerhtml_text.js)

Tying it Together
-----------------
Further optimizations can be used to pre-select the best insertion method. [In inject](https://github.com/linkedin/inject/blob/68c343180ed3a08dffb0ad445fe45d70908683e1/src/executor.js#L129), we wrap the code we want to execute within a function declaration and assignment. This enables us to store the results of the "eval" so that modules can then be executed on demand. The below example is just a simple JSON evaluator as a proof of concept. Like all things eval, you should always be cautious with invoking eval() on items that are not 100% in your control.

[Eval for JSON with createScriptNode](https://gist.github.com/3279693#file_createscriptnode.js)

While this code definitely makes it possible to do more harm than good (we're stepping around JSLint/Hint eval checks here, people), the upside is huge when you're evaluating code and need to understand at what line something is failing on.
