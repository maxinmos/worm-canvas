var load = function(cb) {
  window.onload = cb;
};

var getAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function frame(callback) {
    window.setTimeout(callback, 16.6);
  };

module.exports = {
  load: load,
  getAnimationFrame: getAnimationFrame
};
