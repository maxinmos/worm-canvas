/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var vector = __webpack_require__(1);
	var engine = __webpack_require__(2);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	function toRad(r) {
	  return Math.PI * r / 180;
	}

	function vec2d(length, rad) {
	  return {
	    y: Math.sin(rad) * length,
	    x: Math.cos(rad) * length,
	    angle: rad
	  };
	}

	module.exports = {
	  toRad: toRad,
	  vec2d: vec2d
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);