var $ = require('jquery');

module.exports = function($el, options) {
  $el.nextAll().remove();
  return $el;
}
