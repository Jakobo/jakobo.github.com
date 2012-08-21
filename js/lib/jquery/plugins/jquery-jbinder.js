$.fn.jBinder = function(binder) {
  binder = binder || "jbinder";
  $("script[type='"+binder+"/control']").each(function ittrScript() {
    var fn = new Function($.trim($(this).html()));
    $($(this).attr("data-"+binder+"-describes")).each(function ittrDescribes() {
      fn.apply(this);
    });
  });
  return $(this);
};
