function memoizeAsync(fn, cbLocation, memoKey) {
  fn.memoize = {
    hashes: {}
  };
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var memoArgs = Array.prototype.slice.call(arguments);
    var hash = memoKey.apply(this, args);
    var queue = [];
    var callback = args[cbLocation];
    var triggerQueue = function() {
      // store arguments
      fn.memoize.hashes[hash] = Array.prototype.slice.call(arguments);
      for (var i = 0, len = queue.length; i < len; i++) {
        queue[i].apply(this, fn.memoize.hashes[hash]);
      }
    };
    
    // callback sub
    memoArgs.splice(cbLocation, 1, triggerQueue);

    // memo check
    if (hash in fn.memoize.hashes) {
      return callback.apply(this, fn.memoize.hashes[hash]);
    }
    else {
      queue.push(callback);
      return fn.apply(this, memoArgs);
    }
  }
}

function memoize(fn, memoKey) {
  fn.memoize = {
    hashes: {}
  };
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var hash = memoKey.apply(this, args);
    return (hash in fn.memoize.hashes) ? fn.memoize.hashes[hash] : fn.memoize.hashes[hash] = fn.apply(this, arguments);
  };
}