(function( $ ) {

$.fn.ellipsis = function(options) {
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
  
  var element = $(this),
      text = element.text(),
      maxHeight = options.height || getClipAmount(element) || element.outerHeight(),
      characters = text.length,
      step = text.length / 2,
      newText = text,
      words = null,
      wordsLength = 0;

  while (step > 0) {
    element.html(newText);
    if (element.outerHeight() <= maxHeight) {
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
    element.html(newText + "...");
    while (element.outerHeight() > maxHeight && newText.length >= 1) {
      newText = newText.substring(0, newText.length - 1);
      element.html($.trim(newText) + "...");
    }
  }
  return element;
};

})(jQuery);