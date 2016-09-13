window.ENV = (function(){
  var query = {};
  var a = location.search.substr(1).split('&');
  for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || true);
  }
  return query;
}());

// test
(function() {
  if (ENV.test) {
    document.getElementsByTagName("body")[0].classList.add("test");
  }
}());

// omni
(function() {
  var delay = ENV.omnidelay || 5000;
  var nodes = document.querySelectorAll("#omni p");
  var current = 0;
  nodes[0].classList.toggle("in");

  function next() {
    var last = current;
    current++;
    if (current > nodes.length - 1) {
      current = 0;
    }
    nodes[last].classList.add("out");
    nodes[last].classList.remove("in");

    nodes[current].classList.add("in");
    nodes[current].classList.remove("out");

    window.setTimeout(next, delay);
  }

  window.setTimeout(next, delay);
}());

// Master Countdown
(function(){

}())
