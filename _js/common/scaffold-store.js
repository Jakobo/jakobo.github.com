
// shared behavior and methods for all stores

module.exports = function(constants) {
  return {
    emitChange: function() {
      this.emit(constants.CHANGE);
    },
    addChangeListener: function(callback) {
      this.on(constants.CHANGE, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(constants.CHANGE, callback);
    }
  };
}
