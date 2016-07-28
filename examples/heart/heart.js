var range = require('lodash.range');
var vector = require('../../lib/vector');

function pos(t, scale) {
  return {
    x: scale * Math.pow(Math.sin(t), 3),
    y: -scale / 4 * (3 * Math.cos(t) - 1.3 * Math.cos(2 * t) - 0.6 * Math.cos(3 * t) - 0.2 * Math.cos(4 * t))
  };
}

function heartPath(n, scale) {
  var step = vector.toRad(360 / n);
  var angle = 0;
  return range(n).map(function() {
    angle += step;
    return pos(angle, scale);
  });
}

module.exports = heartPath;
