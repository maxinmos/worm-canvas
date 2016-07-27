var range = require('lodash.range');
var engine = require('./engine.js');
var utils = require('./lib/utils.js');
var heart = require('./lib/heart.js');
var worm = require('./lib/worm.js');

var load = engine.load;
var getAnimationFrame = engine.getAnimationFrame;

load(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenWidth = canvas.clientWidth;
  var screenHeight = canvas.clientHeight;

  var path = heart(30, 200);
  var w = range(15).map(function (i) {
    return worm(path, 20, 0, 0, utils.random(1, 2));
  });

  (function loop() {
    getAnimationFrame(function () {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      ctx.save();
      ctx.translate(screenWidth / 2, screenHeight / 2);
      w.forEach(function(wr) {
        wr(ctx);
      });
      ctx.restore();
      loop();
    });
  })();
});
