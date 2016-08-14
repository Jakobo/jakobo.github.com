const SPRING = [153, 204, 0];
const SUMMER = [104, 184, 217];
const FALL = [222, 163, 0];
const WINTER = [77, 0, 171];
const now = new Date();

// easy to read points for the seasons
const points = {
  lastWinter: {
    at: new Date(now.getFullYear() - 1, 11, 1),
    is: WINTER
  },
  spring: {
    at: new Date(now.getFullYear(), 2, 1),
    is: SPRING
  },
  summer: {
    at: new Date(now.getFullYear(), 6, 1),
    is: SUMMER
  },
  fall: {
    at: new Date(now.getFullYear(), 9, 1),
    is: FALL
  },
  winter: {
    at: new Date(now.getFullYear(), 11, 1),
    is: WINTER
  },
  nextSpring: {
    at: new Date(now.getFullYear() + 1, 2, 1),
    is: SPRING
  }
};

// build a more programatic friendly data structure we can iterate on
let timeline = {};
Object.keys(points).forEach(function(season) {
  timeline[points[season].at.getTime()] = points[season].is;
});

const orderedTimes = Object.keys(timeline).sort(function(a, b) {
  return parseInt(a, 10) - parseInt(b, 10);
});

// find the nearest time in our timeline
let useTime = 0;
let nextTime = 0;
orderedTimes.forEach(function(time, idx) {
  // choose this if it is less than now
  if (time < now.getTime()) {
    useTime = time;
    nextTime = orderedTimes[idx + 1];
  }
});

const start = timeline[useTime];
const end = timeline[nextTime];
const progress = (now.getTime() - useTime) / (nextTime - useTime);

const red = Math.floor(start[0] + ((end[0] - start[0]) * progress));
const green = Math.floor(start[1] + ((end[1] - start[1]) * progress));
const blue = Math.floor(start[2] + ((end[2] - start[2]) * progress));

const rgb = "rgb(" + [red, green, blue].join(", ") + ")";
export default rgb;
