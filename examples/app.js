var colorify = require('color');
var range = require('lodash.range');
var engine = require('./engine.js');
var heart = require('./heart/heart.js');
var utils = require('../lib/utils.js');
var worm = require('../lib/worm.js');

var load = engine.load;
var getAnimationFrame = engine.getAnimationFrame;
var random = utils.random;

load(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenWidth = canvas.clientWidth;
  var screenHeight = canvas.clientHeight;

  var path = heart(30, 150);
  var worms = range(20)
    .map(function (i) {
      var color = colorify('blue').rotate(random(0, 40)).hslString();
      return worm(0, 0, 20, random(1, 2.5), color, path);
    });

  (function loop() {
    getAnimationFrame(function () {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      ctx.save();
      ctx.translate(screenWidth / 2, screenHeight / 2);
      worms.forEach(function(w) { w(ctx); });
      ctx.restore();
      loop();
    });
  })();
});
