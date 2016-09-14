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

  function tick() {
    var last = current;
    current++;
    if (current > nodes.length - 1) {
      current = 0;
    }
    nodes[last].classList.add("out");
    nodes[last].classList.remove("in");

    nodes[current].classList.add("in");
    nodes[current].classList.remove("out");

    window.setTimeout(tick, delay);
  }

  window.setTimeout(tick, delay);
}());

// Master Countdown
(function(){
  var minutes = parseFloat(ENV.countdown) || 30;
  var seconds = 60 * minutes;
  var soon = new Date();

  // set countdown
  soon.setSeconds(soon.getSeconds() + seconds);

  function tick() {
    var now = new Date();
    var secondsRemaining = Math.ceil((soon.getTime() - now.getTime()) / 1000);
    var displayMinutes = 0;
    var displaySeconds = 0;
    var s1 = s2 = m1 = m2 = 0;
    var pieces = [];

    var nodes = {
      m1: document.querySelectorAll("#countdown .m1")[0],
      m2: document.querySelectorAll("#countdown .m2")[0],
      s1: document.querySelectorAll("#countdown .s1")[0],
      s2: document.querySelectorAll("#countdown .s2")[0]
    };

    secondsRemaining = (secondsRemaining > 0) ? secondsRemaining : 0;
    displayMinutes = Math.floor(secondsRemaining / 60) + "";
    displaySeconds = secondsRemaining % 60 + "";

    // minutes assignment
    pieces = displayMinutes.split("");
    pieces.unshift("0");
    m2 = pieces.pop();
    m1 = pieces.pop();

    // seconds assignment
    pieces = displaySeconds.split("");
    pieces.unshift("0");
    s2 = pieces.pop();
    s1 = pieces.pop();

    nodes.m1.innerHTML = m1;
    nodes.m2.innerHTML = m2;
    nodes.s1.innerHTML = s1;
    nodes.s2.innerHTML = s2;

    if (secondsRemaining <= 0) {
      document.body.classList.add("countdown-zero");
    }

    window.setTimeout(tick, 1000);
  }
  tick();
}())
