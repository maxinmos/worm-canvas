var range = require('lodash.range');
var vector = require('./vector.js');
var utils = require('./utils.js');
var color = require('./color.js');

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

function generateColor(cl, n, partials) {
  var cool = color(cl);
  partials.forEach(function(p, i) {
    p.color = cool
      .spin(1.2)
      .darken(i/n)
      .toString();
  });
}

function renderPoint(ctx, p) {
  ctx.beginPath();
  ctx.fillStyle = p.color;
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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

  range(n)
    .forEach(function(i) {
      var p = {
        x: x,
        y: y,
        radius:  2 - i/n
      };

      if (i === 0) {
        dV = calculateDeltaVeclocity(p, point, speed);
        p.dx = dV.dx;
        p.dy = dV.dy;
        p.friction = Math.random() * 0.2 + 0.7;
      }

      partials[i] = p;
    });

  generateColor(color, n, partials);

  return {
    draw: function(ctx) {
      ctx.save();

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

      if (distance(first, point) < 12) {
        approaching = Math.random() > 0.96 ?
        roundRandom(0, nPath - 1) :
        Math.random() > 0.96 ?
          (approaching - 1) :
          (approaching + 1) % nPath;

        if (approaching < 0) approaching += nPath;
      }

      ctx.restore();
    },
    color: function(color) {
      generateColor(color, n, partials);
    }
  };
}

module.exports = worm;
