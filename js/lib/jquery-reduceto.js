$.fn.reduceTo = function() {
  $(this).nextAll().remove();
  return $(this);
};
