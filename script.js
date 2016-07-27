var range = require('lodash.range');
var vector = require('./vector.js');
var engine = require('./engine.js');

var load = engine.load;
var getAnimationFrame = engine.getAnimationFrame;
var vec2d = vector.vec2d;
var toRad = vector.toRad;
var distance = vector.distance;

function roundRandom(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function increaseAngle(angle, alpha) {
  return (angle + alpha) % 360;
}

function pos(t, scale) {
  return {
    x: scale * Math.pow(Math.sin(t), 3),
    y: -scale / 4 * (3 * Math.cos(t) - 1.3 * Math.cos(2 * t) - 0.6 * Math.cos(3 * t) - 0.2 * Math.cos(4 * t))
  };
}

function heartPath(n, scale) {
  var step = toRad(360 / n);
  var angle = 0;
  return range(n).map(function() {
    angle += step;
    return pos(angle, scale);
  });
}

function renderPoint(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, toRad(40));
  ctx.closePath();
  ctx.fill();
};

function calculateDeltaVeclocity(start, end, speed) {
  return {
    dx: speed * (end.x - start.x) / distance(end.x, end.y, start.x, start.y),
    dy: speed * (end.y - start.y) / distance(end.x, end.y, start.x, start.y)
  };
}

function worm(path, n, x, y, dSpeed) {
  var nPath = path.length;
  var partials = [];
  var approaching = null;

  approaching = roundRandom(0, nPath - 1);

  var point = path[approaching];
  var p;
  var dV;
  for (i = 0; i < n; i++) {
    var p = {
      x: -i * 1.5,
      y: -i * 1.5
    };
    if (i === 0) {
      dV = calculateDeltaVeclocity(p, point, dSpeed);
      p.dx = dV.dx;
      p.dy = dV.dy;
    }
    partials[i] = p;
  }

  return function(ctx) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.translate(x, y);

    var point = path[approaching];
    var first = partials[0];
    var dV;
    first.x += first.dx;
    first.y += first.dy;
    if (distance(first.x, first.y, point.x, point.y) < 10) {

      approaching = Math.random() < 0.05 ?
        roundRandom(0, nPath - 1) :
        (approaching + 1) % nPath;

      point = path[approaching];
      dV = calculateDeltaVeclocity(first, point, dSpeed);
      first.dx = dV.dx;
      first.dy = dV.dy;
    }
    renderPoint(ctx, first.x, first.y, 4);

    var p;
    var next;
    for (var j = 0; j < n - 1; j++) {
      p = partials[j];
      next = partials[j + 1];
      next.x += (p.x - next.x) * 0.7;
      next.y += (p.y - next.y) * 0.7;
      renderPoint(ctx, next.x, next.y, 4);
    }

    ctx.restore();
  }
}

load(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenWidth = canvas.clientWidth;
  var screenHeight = canvas.clientHeight;

  var path = heartPath(30, 100);
  var w = range(30).map(function (i) {
    return worm(path, 10, screenWidth / 2, screenHeight / 2, 4);
  });

  (function loop() {
    getAnimationFrame(function () {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      w.forEach(function(wr) {
        wr(ctx);
      });
      loop();
    });
  })();
});
