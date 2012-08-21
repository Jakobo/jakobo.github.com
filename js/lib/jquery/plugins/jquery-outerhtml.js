(function( $ ) {

$.fn.outerHTML = function() {
  var doc = this[0] ? this[0].ownerDocument : document,
      div = doc.createElement("div"),
      node = this.eq(0).clone().get(0);
  div.appendChild(node);
  return div.innerHTML;
};

})(jQuery);