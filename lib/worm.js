var colorify = require('color');
var range = require('lodash.range');
var vector = require('./vector.js');
var utils = require('./utils.js');

var toRad = vector.toRad;
var distance = vector.distance;
var random = utils.random;
var roundRandom = utils.roundRandom;


function calculateDeltaVeclocity(start, end, speed) {
  var far = distance(end, start);
  return {
    dx: speed * (end.x - start.x) / far,
    dy: speed * (end.y - start.y) / far
  };
}

function renderPoint(ctx, p) {
  ctx.beginPath();
  ctx.fillStyle = p.color;
  ctx.arc(p.x, p.y, p.radius, 0, toRad(30), 1);
  ctx.fill();
  ctx.closePath();
};

function worm(x, y, n, speed, color, path) {
  var nPath = path.length;
  var partials = [];
  var approaching = roundRandom(0, nPath - 1);
  var point = path[approaching];
  var p;
  var dV;
  var coz = colorify(color);

  range(n)
    .forEach(function(i) {
      var p = {
        x: x,
        y: y,
        radius:  2 - i/n,
        color: coz.rotate(1).darken(i / n * 0.1).hslString()
      };

      if (i === 0) {
        dV = calculateDeltaVeclocity(p, point, speed);
        p.dx = dV.dx;
        p.dy = dV.dy;
        p.friction = Math.random() * 0.2 + 0.7;
      }

      partials[i] = p;
    });

  return function(ctx) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    var point = path[approaching];
    var first = partials[0];
    var dV = calculateDeltaVeclocity(first, point, speed);
    first.dx = (first.dx + dV.dx) * first.friction;
    first.dy = (first.dy + dV.dy) * first.friction;
    first.x += first.dx;
    first.y += first.dy;
    renderPoint(ctx, first);

    var p;
    var next;
    for (var j = 0; j < n - 1; j++) {
      p = partials[j];
      next = partials[j + 1];
      next.x += (p.x - next.x) * 0.7;
      next.y += (p.y - next.y) * 0.7;
      renderPoint(ctx, next);
    }

    if (distance(first, point) < /* A */10) {
      approaching = Math.random() > 0.96 ?
      roundRandom(0, nPath - 1) :
      Math.random() > 0.96 ?
        (approaching - 1) :
        (approaching + 1) % nPath;

      if (approaching < 0) approaching += nPath;
    }

    ctx.restore();
  }
}

module.exports = worm;
