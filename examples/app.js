var range = require('lodash.range');
var rx = require('rxjs/observable/fromEvent');
var engine = require('./engine.js');
var heart = require('./heart/heart.js');
var utils = require('../lib/utils.js');
var worm = require('../lib/worm.js');
var color = require('../lib/color.js');

var load = engine.load;
var getAnimationFrame = engine.getAnimationFrame;
var random = utils.random;
var roundRandom = utils.roundRandom;

function randomSpin(cl) {
  return color(cl)
  .spin(roundRandom(0, 40))
  .toString();
}

function bornWorms(n, color, path) {
  return range(n)
    .map(function() {
      var cool = randomSpin(color);
      return worm(0, 0, 30, random(1.5, 2), cool, path);
    });
}

load(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  var path = heart(30, 200);
  var worms = bornWorms(20, '#d47eff', path);

  canvas.width = screenWidth;
  canvas.height = screenHeight;

  rx.fromEvent(document.getElementById('color'), 'change')
    .subscribe(function(event) {
      worms.forEach(function(w) {
        var cool = randomSpin(event.target.value);
        w.color(cool);
      });
    });

  (function loop() {
    getAnimationFrame(function () {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      ctx.save();
      ctx.translate(screenWidth / 2, screenHeight / 2);
      worms.forEach(function(w) { w.draw(ctx); });
      ctx.restore();
      loop();
    });
  })();
});
