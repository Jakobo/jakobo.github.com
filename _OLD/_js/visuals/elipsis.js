var $ = require('jquery');

module.exports = function($el, options) {
  options = $.extend(true, {}, {
    height: null,
    words: -1,
    punctuation: true
  }, options);

  function getClipAmount(node) {
    var nodeBottom = node.get(0).getClientRects()[0].bottom,
        parentBottom = node.parent().get(0).getClientRects()[0].bottom,
        diff = nodeBottom - parentBottom;
    return (diff <= 0) ? 0 : node.height() - diff;
  }

  var text = $el.text(),
      maxHeight = options.height || getClipAmount($el) || $el.outerHeight(),
      characters = text.length,
      step = text.length / 2,
      newText = text,
      words = null,
      wordsLength = 0;

  while (step > 0) {
    $el.html(newText);
    if ($el.outerHeight() <= maxHeight) {
      if (text.length == newText.length) {
        step = 0;
      } else {
        characters += step;
        newText = text.substring(0, characters);
      }
    } else {
      characters -= step;
      newText = newText.substring(0, characters);
    }
    step = parseInt(step / 2);
  }

  if (options.words !== null && options.words !== 0) {
    words = newText.split(" ");
    if (options.words < 0) {
      wordsLength = words.length + options.words;
    }
    else {
      wordsLength = options.words;
    }
    newText = words.slice(0, wordsLength).join(" ");
  }

  if (options.punctuation) {
    newText = newText.replace(/(.*?)[^a-z0-9]+$/ig, "$1");
  }

  if (text.length > newText.length) {
    newText = $.trim(newText);
    $el.html(newText + "...");
    while ($el.outerHeight() > maxHeight && newText.length >= 1) {
      newText = newText.substring(0, newText.length - 1);
      $el.html($.trim(newText) + "...");
    }
  }

  return $el;
};
