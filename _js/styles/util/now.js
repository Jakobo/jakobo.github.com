// determines a "now" color based on moving through the year
var constants = require("../../constants/colors");
var now = new Date();

// easy to read points for the seasons
var points = {
  lastWinter: {
    at: new Date(now.getFullYear() - 1, 11, 1),
    is: constants.WINTER
  },
  spring: {
    at: new Date(now.getFullYear(), 2, 1),
    is: constants.SPRING
  },
  summer: {
    at: new Date(now.getFullYear(), 6, 1),
    is: constants.SUMMER
  },
  fall: {
    at: new Date(now.getFullYear(), 9, 1),
    is: constants.FALL
  },
  winter: {
    at: new Date(now.getFullYear(), 11, 1),
    is: constants.WINTER
  },
  nextSpring: {
    at: new Date(now.getFullYear() + 1, 2, 1),
    is: constants.SPRING
  }
};

// build a more programatic friendly data structure we can iterate on
var timeline = {};
Object.keys(points).forEach(function(season) {
  timeline[points[season].at.getTime()] = points[season].is;
});
var orderedTimes = Object.keys(timeline).sort(function(a, b) {
  return parseInt(a, 10) - parseInt(b, 10);
});

// find the nearest time in our timeline
var useTime;
var nextTime;
orderedTimes.forEach(function(time, idx) {
  // choose this if it is less than now
  if (time < now.getTime()) {
    useTime = time;
    nextTime = orderedTimes[idx + 1];
  }
});

var start = timeline[useTime];
var end = timeline[nextTime];
var progress = (now.getTime() - useTime) / (nextTime - useTime);

var red = Math.floor(start[0] + ((end[0] - start[0]) * progress));
var green = Math.floor(start[1] + ((end[1] - start[1]) * progress));
var blue = Math.floor(start[2] + ((end[2] - start[2]) * progress));

module.exports = {
  rgb: "rgb(" + [red, green, blue].join(", ") + ")",
  red: red,
  green: green,
  blue: blue
};
