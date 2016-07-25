var vector = require('./vector.js');
var engine = require('./engine.js');

var load = engine.load;
var getAnimationFrame = engine.getAnimationFrame;
var vec2d = vector.vec2d;
var toRad = vector.toRad;

function increaseAngle(angle, alpha) {
  return (angle + alpha) % 360;
}

function swing(min, max, delta) {
  var value = min;
  return function() {
    value += delta;
    if (value <= min || value >= max) {
      delta *= -1;
    }
    return value;
  }
}

function pos(t, scale) {
  return {
    x: scale * Math.pow(Math.sin(t), 3),
    y: scale / 4 * (3 * Math.cos(t) - 1.3 * Math.cos(2 * t) - 0.6 * Math.cos(3 * t) - 0.2 * Math.cos(4 * t))
  };
}

function heart(centerX, centerY, scale, ctx) {
  var start = -360;
  var p = pos(toRad(start), scale);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.translate(centerX, centerY);
  ctx.beginPath();
  ctx.moveTo(p.x, -p.y);
  while (start < 0) {
    start += 1;
    p = pos(toRad(start), scale);
    ctx.lineTo(p.x, -p.y)
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

load(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenWidth = canvas.clientWidth;
  var screenHeight = canvas.clientHeight;


  (function loop() {
    getAnimationFrame(function () {
      ctx.clearRect(0, 0, screenWidth, screenHeight);
      heart(screenWidth / 2, screenHeight / 2, 100, ctx);
      loop();
    });
  })();
});
