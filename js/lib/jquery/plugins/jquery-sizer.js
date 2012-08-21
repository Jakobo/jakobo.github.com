(function( $ ) {
  
  var stylesheetPlaced = false;
  
  // in: https://lh5.googleusercontent.com/-.../TuFVzz8ryNI/AAAAAAAAAjg/.../s200/screenshot_01.jpg
  // convert that /s200/ to size of best fit
  $.fn.resizeImage = function(factor) {
    var control = this,
        jqNode = $(this),
        src = jqNode.attr("src"),
        jqParent = jqNode.parents("p").eq(0),
        parentWidth = jqParent.width(),
        pieces,
        golden = 1.61803,
        width = 0;
    
    if (factor) {
      width = Math.round(factor*parentWidth);
    }
    else {
      width = Math.round((parentWidth * golden) - parentWidth);
    }
    
    pieces = src.split("/");
    pieces[pieces.length - 2] = "s"+width;
    jqNode.attr("src", pieces.join("/"));
  };
  
})(jQuery);
