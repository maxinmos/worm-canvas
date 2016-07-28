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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var tinycolor = __webpack_require__(378);
	var range = __webpack_require__(13);
	var rx = __webpack_require__(377);
	var engine = __webpack_require__(14);
	var heart = __webpack_require__(15);
	var utils = __webpack_require__(17);
	var worm = __webpack_require__(18);

	var load = engine.load;
	var getAnimationFrame = engine.getAnimationFrame;
	var random = utils.random;

	function randomSpin(color) {
	  return tinycolor(color)
	  .spin(random(0, 40))
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
	  var worms = bornWorms(20, 'red', path);

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


/***/ },

/***/ 13:
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991,
	    NAN = 0 / 0;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;

	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);

	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}

	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toNumber(start);
	    start = start === start ? start : 0;
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toNumber(end) || 0;
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : (toNumber(step) || 0);
	    return baseRange(start, end, step, fromRight);
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified,
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the range of numbers.
	 * @see _.inRange, _.rangeRight
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();

	module.exports = range;


/***/ },

/***/ 14:
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


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var range = __webpack_require__(13);
	var vector = __webpack_require__(16);

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


/***/ },

/***/ 16:
/***/ function(module, exports) {

	function toRad(r) {
	  return Math.PI * r / 180;
	}

	function distance(p1, p2) {
	  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
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
	  distance: distance,
	  vec2d: vec2d
	};


/***/ },

/***/ 17:
/***/ function(module, exports) {

	function random(min, max) {
	  return min + Math.random() * (max - min);
	}

	function roundRandom(min, max) {
	  return Math.round(random(min, max));
	}

	function increaseAngle(angle, alpha) {
	  return (angle + alpha) % 360;
	}

	module.exports = {
	  random: random,
	  roundRandom: roundRandom,
	  increaseAngle: increaseAngle
	};


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var tinycolor = __webpack_require__(378);
	var range = __webpack_require__(13);
	var vector = __webpack_require__(16);
	var utils = __webpack_require__(17);

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

	function generateColor(color, n, partials) {
	  var cool = tinycolor(color);
	  partials.forEach(function(p, i) {
	    p.color = cool
	      .spin(1.1)
	      .darken(i / n)
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


/***/ },

/***/ 23:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 360:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(361);
	var tryCatch_1 = __webpack_require__(369);
	var errorObject_1 = __webpack_require__(370);
	var Subscription_1 = __webpack_require__(366);
	function isNodeStyleEventEmmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
	}
	function isJQueryStyleEventEmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
	}
	function isNodeList(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
	}
	function isHTMLCollection(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
	}
	function isEventTarget(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
	}
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromEventObservable = (function (_super) {
	    __extends(FromEventObservable, _super);
	    function FromEventObservable(sourceObj, eventName, selector) {
	        _super.call(this);
	        this.sourceObj = sourceObj;
	        this.eventName = eventName;
	        this.selector = selector;
	    }
	    /**
	     * Creates an Observable that emits events of a specific type coming from the
	     * given event target.
	     *
	     * <span class="informal">Creates an Observable from DOM events, or Node
	     * EventEmitter events or others.</span>
	     *
	     * <img src="./img/fromEvent.png" width="100%">
	     *
	     * Creates an Observable by attaching an event listener to an "event target",
	     * which may be an object with `addEventListener` and `removeEventListener`,
	     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
	     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
	     * the output Observable is subscribed, and removed when the Subscription is
	     * unsubscribed.
	     *
	     * @example <caption>Emits clicks happening on the DOM document</caption>
	     * var clicks = Rx.Observable.fromEvent(document, 'click');
	     * clicks.subscribe(x => console.log(x));
	     *
	     * @see {@link from}
	     * @see {@link fromEventPattern}
	     *
	     * @param {EventTargetLike} target The DOMElement, event target, Node.js
	     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
	     * @param {string} eventName The event name of interest, being emitted by the
	     * `target`.
	     * @param {function(...args: any): T} [selector] An optional function to
	     * post-process results. It takes the arguments from the event handler and
	     * should return a single value.
	     * @return {Observable<T>}
	     * @static true
	     * @name fromEvent
	     * @owner Observable
	     */
	    FromEventObservable.create = function (target, eventName, selector) {
	        return new FromEventObservable(target, eventName, selector);
	    };
	    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber) {
	        var unsubscribe;
	        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
	            for (var i = 0, len = sourceObj.length; i < len; i++) {
	                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
	            }
	        }
	        else if (isEventTarget(sourceObj)) {
	            var source_1 = sourceObj;
	            sourceObj.addEventListener(eventName, handler);
	            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
	        }
	        else if (isJQueryStyleEventEmitter(sourceObj)) {
	            var source_2 = sourceObj;
	            sourceObj.on(eventName, handler);
	            unsubscribe = function () { return source_2.off(eventName, handler); };
	        }
	        else if (isNodeStyleEventEmmitter(sourceObj)) {
	            var source_3 = sourceObj;
	            sourceObj.addListener(eventName, handler);
	            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
	        }
	        subscriber.add(new Subscription_1.Subscription(unsubscribe));
	    };
	    FromEventObservable.prototype._subscribe = function (subscriber) {
	        var sourceObj = this.sourceObj;
	        var eventName = this.eventName;
	        var selector = this.selector;
	        var handler = selector ? function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
	            if (result === errorObject_1.errorObject) {
	                subscriber.error(errorObject_1.errorObject.e);
	            }
	            else {
	                subscriber.next(result);
	            }
	        } : function (e) { return subscriber.next(e); };
	        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
	    };
	    return FromEventObservable;
	}(Observable_1.Observable));
	exports.FromEventObservable = FromEventObservable;
	//# sourceMappingURL=FromEventObservable.js.map

/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(362);
	var toSubscriber_1 = __webpack_require__(363);
	var symbol_observable_1 = __webpack_require__(374);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` imple will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[symbol_observable_1.default] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ },

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(364);
	var rxSubscriber_1 = __webpack_require__(373);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber();
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },

/***/ 364:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(365);
	var Subscription_1 = __webpack_require__(366);
	var Observer_1 = __webpack_require__(372);
	var rxSubscriber_1 = __webpack_require__(373);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },

/***/ 365:
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(367);
	var isObject_1 = __webpack_require__(368);
	var isFunction_1 = __webpack_require__(365);
	var tryCatch_1 = __webpack_require__(369);
	var errorObject_1 = __webpack_require__(370);
	var UnsubscriptionError_1 = __webpack_require__(371);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.isUnsubscribed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `isUnsubscribed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
	            return;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.isUnsubscribed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.isUnsubscribed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },

/***/ 367:
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },

/***/ 368:
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },

/***/ 369:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(370);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },

/***/ 370:
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },

/***/ 371:
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },

/***/ 372:
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    isUnsubscribed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },

/***/ 373:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(362);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },

/***/ 374:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(375);


/***/ },

/***/ 375:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ponyfill = __webpack_require__(376);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var root = undefined; /* global window */

	if (typeof global !== 'undefined') {
		root = global;
	} else if (typeof window !== 'undefined') {
		root = window;
	}

	var result = (0, _ponyfill2.default)(root);
	exports.default = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 376:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },

/***/ 377:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FromEventObservable_1 = __webpack_require__(360);
	exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
	//# sourceMappingURL=fromEvent.js.map

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.1
	// https://github.com/bgrins/TinyColor
	// Brian Grinstead, MIT License

	(function(Math) {

	var trimLeft = /^\s+/,
	    trimRight = /\s+$/,
	    tinyCounter = 0,
	    mathRound = Math.round,
	    mathMin = Math.min,
	    mathMax = Math.max,
	    mathRandom = Math.random;

	function tinycolor (color, opts) {

	    color = (color) ? color : '';
	    opts = opts || { };

	    // If input is already a tinycolor, return itself
	    if (color instanceof tinycolor) {
	       return color;
	    }
	    // If we are called as a function, call using new instead
	    if (!(this instanceof tinycolor)) {
	        return new tinycolor(color, opts);
	    }

	    var rgb = inputToRGB(color);
	    this._originalInput = color,
	    this._r = rgb.r,
	    this._g = rgb.g,
	    this._b = rgb.b,
	    this._a = rgb.a,
	    this._roundA = mathRound(100*this._a) / 100,
	    this._format = opts.format || rgb.format;
	    this._gradientType = opts.gradientType;

	    // Don't let the range of [0,255] come back in [0,1].
	    // Potentially lose a little bit of precision here, but will fix issues where
	    // .5 gets interpreted as half of the total, instead of half of 1
	    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
	    if (this._r < 1) { this._r = mathRound(this._r); }
	    if (this._g < 1) { this._g = mathRound(this._g); }
	    if (this._b < 1) { this._b = mathRound(this._b); }

	    this._ok = rgb.ok;
	    this._tc_id = tinyCounter++;
	}

	tinycolor.prototype = {
	    isDark: function() {
	        return this.getBrightness() < 128;
	    },
	    isLight: function() {
	        return !this.isDark();
	    },
	    isValid: function() {
	        return this._ok;
	    },
	    getOriginalInput: function() {
	      return this._originalInput;
	    },
	    getFormat: function() {
	        return this._format;
	    },
	    getAlpha: function() {
	        return this._a;
	    },
	    getBrightness: function() {
	        //http://www.w3.org/TR/AERT#color-contrast
	        var rgb = this.toRgb();
	        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	    },
	    getLuminance: function() {
	        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	        var rgb = this.toRgb();
	        var RsRGB, GsRGB, BsRGB, R, G, B;
	        RsRGB = rgb.r/255;
	        GsRGB = rgb.g/255;
	        BsRGB = rgb.b/255;

	        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
	        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
	        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
	        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
	    },
	    setAlpha: function(value) {
	        this._a = boundAlpha(value);
	        this._roundA = mathRound(100*this._a) / 100;
	        return this;
	    },
	    toHsv: function() {
	        var hsv = rgbToHsv(this._r, this._g, this._b);
	        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
	    },
	    toHsvString: function() {
	        var hsv = rgbToHsv(this._r, this._g, this._b);
	        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
	        return (this._a == 1) ?
	          "hsv("  + h + ", " + s + "%, " + v + "%)" :
	          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
	    },
	    toHsl: function() {
	        var hsl = rgbToHsl(this._r, this._g, this._b);
	        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
	    },
	    toHslString: function() {
	        var hsl = rgbToHsl(this._r, this._g, this._b);
	        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
	        return (this._a == 1) ?
	          "hsl("  + h + ", " + s + "%, " + l + "%)" :
	          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
	    },
	    toHex: function(allow3Char) {
	        return rgbToHex(this._r, this._g, this._b, allow3Char);
	    },
	    toHexString: function(allow3Char) {
	        return '#' + this.toHex(allow3Char);
	    },
	    toHex8: function(allow4Char) {
	        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
	    },
	    toHex8String: function(allow4Char) {
	        return '#' + this.toHex8(allow4Char);
	    },
	    toRgb: function() {
	        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
	    },
	    toRgbString: function() {
	        return (this._a == 1) ?
	          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
	          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
	    },
	    toPercentageRgb: function() {
	        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
	    },
	    toPercentageRgbString: function() {
	        return (this._a == 1) ?
	          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
	          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
	    },
	    toName: function() {
	        if (this._a === 0) {
	            return "transparent";
	        }

	        if (this._a < 1) {
	            return false;
	        }

	        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
	    },
	    toFilter: function(secondColor) {
	        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
	        var secondHex8String = hex8String;
	        var gradientType = this._gradientType ? "GradientType = 1, " : "";

	        if (secondColor) {
	            var s = tinycolor(secondColor);
	            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
	        }

	        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
	    },
	    toString: function(format) {
	        var formatSet = !!format;
	        format = format || this._format;

	        var formattedString = false;
	        var hasAlpha = this._a < 1 && this._a >= 0;
	        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

	        if (needsAlphaFormat) {
	            // Special case for "transparent", all other non-alpha formats
	            // will return rgba when there is transparency.
	            if (format === "name" && this._a === 0) {
	                return this.toName();
	            }
	            return this.toRgbString();
	        }
	        if (format === "rgb") {
	            formattedString = this.toRgbString();
	        }
	        if (format === "prgb") {
	            formattedString = this.toPercentageRgbString();
	        }
	        if (format === "hex" || format === "hex6") {
	            formattedString = this.toHexString();
	        }
	        if (format === "hex3") {
	            formattedString = this.toHexString(true);
	        }
	        if (format === "hex4") {
	            formattedString = this.toHex8String(true);
	        }
	        if (format === "hex8") {
	            formattedString = this.toHex8String();
	        }
	        if (format === "name") {
	            formattedString = this.toName();
	        }
	        if (format === "hsl") {
	            formattedString = this.toHslString();
	        }
	        if (format === "hsv") {
	            formattedString = this.toHsvString();
	        }

	        return formattedString || this.toHexString();
	    },
	    clone: function() {
	        return tinycolor(this.toString());
	    },

	    _applyModification: function(fn, args) {
	        var color = fn.apply(null, [this].concat([].slice.call(args)));
	        this._r = color._r;
	        this._g = color._g;
	        this._b = color._b;
	        this.setAlpha(color._a);
	        return this;
	    },
	    lighten: function() {
	        return this._applyModification(lighten, arguments);
	    },
	    brighten: function() {
	        return this._applyModification(brighten, arguments);
	    },
	    darken: function() {
	        return this._applyModification(darken, arguments);
	    },
	    desaturate: function() {
	        return this._applyModification(desaturate, arguments);
	    },
	    saturate: function() {
	        return this._applyModification(saturate, arguments);
	    },
	    greyscale: function() {
	        return this._applyModification(greyscale, arguments);
	    },
	    spin: function() {
	        return this._applyModification(spin, arguments);
	    },

	    _applyCombination: function(fn, args) {
	        return fn.apply(null, [this].concat([].slice.call(args)));
	    },
	    analogous: function() {
	        return this._applyCombination(analogous, arguments);
	    },
	    complement: function() {
	        return this._applyCombination(complement, arguments);
	    },
	    monochromatic: function() {
	        return this._applyCombination(monochromatic, arguments);
	    },
	    splitcomplement: function() {
	        return this._applyCombination(splitcomplement, arguments);
	    },
	    triad: function() {
	        return this._applyCombination(triad, arguments);
	    },
	    tetrad: function() {
	        return this._applyCombination(tetrad, arguments);
	    }
	};

	// If input is an object, force 1 into "1.0" to handle ratios properly
	// String input requires "1.0" as input, so 1 will be treated as 1
	tinycolor.fromRatio = function(color, opts) {
	    if (typeof color == "object") {
	        var newColor = {};
	        for (var i in color) {
	            if (color.hasOwnProperty(i)) {
	                if (i === "a") {
	                    newColor[i] = color[i];
	                }
	                else {
	                    newColor[i] = convertToPercentage(color[i]);
	                }
	            }
	        }
	        color = newColor;
	    }

	    return tinycolor(color, opts);
	};

	// Given a string or object, convert that input to RGB
	// Possible string inputs:
	//
	//     "red"
	//     "#f00" or "f00"
	//     "#ff0000" or "ff0000"
	//     "#ff000000" or "ff000000"
	//     "rgb 255 0 0" or "rgb (255, 0, 0)"
	//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	//
	function inputToRGB(color) {

	    var rgb = { r: 0, g: 0, b: 0 };
	    var a = 1;
	    var s = null;
	    var v = null;
	    var l = null;
	    var ok = false;
	    var format = false;

	    if (typeof color == "string") {
	        color = stringInputToObject(color);
	    }

	    if (typeof color == "object") {
	        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
	            rgb = rgbToRgb(color.r, color.g, color.b);
	            ok = true;
	            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
	        }
	        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
	            s = convertToPercentage(color.s);
	            v = convertToPercentage(color.v);
	            rgb = hsvToRgb(color.h, s, v);
	            ok = true;
	            format = "hsv";
	        }
	        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
	            s = convertToPercentage(color.s);
	            l = convertToPercentage(color.l);
	            rgb = hslToRgb(color.h, s, l);
	            ok = true;
	            format = "hsl";
	        }

	        if (color.hasOwnProperty("a")) {
	            a = color.a;
	        }
	    }

	    a = boundAlpha(a);

	    return {
	        ok: ok,
	        format: color.format || format,
	        r: mathMin(255, mathMax(rgb.r, 0)),
	        g: mathMin(255, mathMax(rgb.g, 0)),
	        b: mathMin(255, mathMax(rgb.b, 0)),
	        a: a
	    };
	}


	// Conversion Functions
	// --------------------

	// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

	// `rgbToRgb`
	// Handle bounds / percentage checking to conform to CSS color spec
	// <http://www.w3.org/TR/css3-color/>
	// *Assumes:* r, g, b in [0, 255] or [0, 1]
	// *Returns:* { r, g, b } in [0, 255]
	function rgbToRgb(r, g, b){
	    return {
	        r: bound01(r, 255) * 255,
	        g: bound01(g, 255) * 255,
	        b: bound01(b, 255) * 255
	    };
	}

	// `rgbToHsl`
	// Converts an RGB color value to HSL.
	// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	// *Returns:* { h, s, l } in [0,1]
	function rgbToHsl(r, g, b) {

	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    var max = mathMax(r, g, b), min = mathMin(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min) {
	        h = s = 0; // achromatic
	    }
	    else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }

	        h /= 6;
	    }

	    return { h: h, s: s, l: l };
	}

	// `hslToRgb`
	// Converts an HSL color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	function hslToRgb(h, s, l) {
	    var r, g, b;

	    h = bound01(h, 360);
	    s = bound01(s, 100);
	    l = bound01(l, 100);

	    function hue2rgb(p, q, t) {
	        if(t < 0) t += 1;
	        if(t > 1) t -= 1;
	        if(t < 1/6) return p + (q - p) * 6 * t;
	        if(t < 1/2) return q;
	        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	        return p;
	    }

	    if(s === 0) {
	        r = g = b = l; // achromatic
	    }
	    else {
	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHsv`
	// Converts an RGB color value to HSV
	// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	// *Returns:* { h, s, v } in [0,1]
	function rgbToHsv(r, g, b) {

	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    var max = mathMax(r, g, b), min = mathMin(r, g, b);
	    var h, s, v = max;

	    var d = max - min;
	    s = max === 0 ? 0 : d / max;

	    if(max == min) {
	        h = 0; // achromatic
	    }
	    else {
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    return { h: h, s: s, v: v };
	}

	// `hsvToRgb`
	// Converts an HSV color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	 function hsvToRgb(h, s, v) {

	    h = bound01(h, 360) * 6;
	    s = bound01(s, 100);
	    v = bound01(v, 100);

	    var i = Math.floor(h),
	        f = h - i,
	        p = v * (1 - s),
	        q = v * (1 - f * s),
	        t = v * (1 - (1 - f) * s),
	        mod = i % 6,
	        r = [v, q, p, p, t, v][mod],
	        g = [t, v, v, q, p, p][mod],
	        b = [p, p, t, v, v, q][mod];

	    return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHex`
	// Converts an RGB color to hex
	// Assumes r, g, and b are contained in the set [0, 255]
	// Returns a 3 or 6 character hex
	function rgbToHex(r, g, b, allow3Char) {

	    var hex = [
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16))
	    ];

	    // Return a 3 character hex if possible
	    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	    }

	    return hex.join("");
	}

	// `rgbaToHex`
	// Converts an RGBA color plus alpha transparency to hex
	// Assumes r, g, b are contained in the set [0, 255] and
	// a in [0, 1]. Returns a 4 or 8 character rgba hex
	function rgbaToHex(r, g, b, a, allow4Char) {

	    var hex = [
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16)),
	        pad2(convertDecimalToHex(a))
	    ];

	    // Return a 4 character hex if possible
	    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
	    }

	    return hex.join("");
	}

	// `rgbaToArgbHex`
	// Converts an RGBA color to an ARGB Hex8 string
	// Rarely used, but required for "toFilter()"
	function rgbaToArgbHex(r, g, b, a) {

	    var hex = [
	        pad2(convertDecimalToHex(a)),
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16))
	    ];

	    return hex.join("");
	}

	// `equals`
	// Can be called with any tinycolor input
	tinycolor.equals = function (color1, color2) {
	    if (!color1 || !color2) { return false; }
	    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
	};

	tinycolor.random = function() {
	    return tinycolor.fromRatio({
	        r: mathRandom(),
	        g: mathRandom(),
	        b: mathRandom()
	    });
	};


	// Modification Functions
	// ----------------------
	// Thanks to less.js for some of the basics here
	// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

	function desaturate(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.s -= amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return tinycolor(hsl);
	}

	function saturate(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.s += amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return tinycolor(hsl);
	}

	function greyscale(color) {
	    return tinycolor(color).desaturate(100);
	}

	function lighten (color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.l += amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return tinycolor(hsl);
	}

	function brighten(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var rgb = tinycolor(color).toRgb();
	    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
	    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
	    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
	    return tinycolor(rgb);
	}

	function darken (color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.l -= amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return tinycolor(hsl);
	}

	// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	// Values outside of this range will be wrapped into this range.
	function spin(color, amount) {
	    var hsl = tinycolor(color).toHsl();
	    var hue = (hsl.h + amount) % 360;
	    hsl.h = hue < 0 ? 360 + hue : hue;
	    return tinycolor(hsl);
	}

	// Combination Functions
	// ---------------------
	// Thanks to jQuery xColor for some of the ideas behind these
	// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

	function complement(color) {
	    var hsl = tinycolor(color).toHsl();
	    hsl.h = (hsl.h + 180) % 360;
	    return tinycolor(hsl);
	}

	function triad(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
	    ];
	}

	function tetrad(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
	    ];
	}

	function splitcomplement(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
	        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
	    ];
	}

	function analogous(color, results, slices) {
	    results = results || 6;
	    slices = slices || 30;

	    var hsl = tinycolor(color).toHsl();
	    var part = 360 / slices;
	    var ret = [tinycolor(color)];

	    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
	        hsl.h = (hsl.h + part) % 360;
	        ret.push(tinycolor(hsl));
	    }
	    return ret;
	}

	function monochromatic(color, results) {
	    results = results || 6;
	    var hsv = tinycolor(color).toHsv();
	    var h = hsv.h, s = hsv.s, v = hsv.v;
	    var ret = [];
	    var modification = 1 / results;

	    while (results--) {
	        ret.push(tinycolor({ h: h, s: s, v: v}));
	        v = (v + modification) % 1;
	    }

	    return ret;
	}

	// Utility Functions
	// ---------------------

	tinycolor.mix = function(color1, color2, amount) {
	    amount = (amount === 0) ? 0 : (amount || 50);

	    var rgb1 = tinycolor(color1).toRgb();
	    var rgb2 = tinycolor(color2).toRgb();

	    var p = amount / 100;

	    var rgba = {
	        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
	        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
	        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
	        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
	    };

	    return tinycolor(rgba);
	};


	// Readability Functions
	// ---------------------
	// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

	// `contrast`
	// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
	tinycolor.readability = function(color1, color2) {
	    var c1 = tinycolor(color1);
	    var c2 = tinycolor(color2);
	    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
	};

	// `isReadable`
	// Ensure that foreground and background color combinations meet WCAG2 guidelines.
	// The third argument is an optional Object.
	//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
	//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
	// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

	// *Example*
	//    tinycolor.isReadable("#000", "#111") => false
	//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
	tinycolor.isReadable = function(color1, color2, wcag2) {
	    var readability = tinycolor.readability(color1, color2);
	    var wcag2Parms, out;

	    out = false;

	    wcag2Parms = validateWCAG2Parms(wcag2);
	    switch (wcag2Parms.level + wcag2Parms.size) {
	        case "AAsmall":
	        case "AAAlarge":
	            out = readability >= 4.5;
	            break;
	        case "AAlarge":
	            out = readability >= 3;
	            break;
	        case "AAAsmall":
	            out = readability >= 7;
	            break;
	    }
	    return out;

	};

	// `mostReadable`
	// Given a base color and a list of possible foreground or background
	// colors for that base, returns the most readable color.
	// Optionally returns Black or White if the most readable color is unreadable.
	// *Example*
	//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
	//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
	//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
	//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
	tinycolor.mostReadable = function(baseColor, colorList, args) {
	    var bestColor = null;
	    var bestScore = 0;
	    var readability;
	    var includeFallbackColors, level, size ;
	    args = args || {};
	    includeFallbackColors = args.includeFallbackColors ;
	    level = args.level;
	    size = args.size;

	    for (var i= 0; i < colorList.length ; i++) {
	        readability = tinycolor.readability(baseColor, colorList[i]);
	        if (readability > bestScore) {
	            bestScore = readability;
	            bestColor = tinycolor(colorList[i]);
	        }
	    }

	    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
	        return bestColor;
	    }
	    else {
	        args.includeFallbackColors=false;
	        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
	    }
	};


	// Big List of Colors
	// ------------------
	// <http://www.w3.org/TR/css3-color/#svg-color>
	var names = tinycolor.names = {
	    aliceblue: "f0f8ff",
	    antiquewhite: "faebd7",
	    aqua: "0ff",
	    aquamarine: "7fffd4",
	    azure: "f0ffff",
	    beige: "f5f5dc",
	    bisque: "ffe4c4",
	    black: "000",
	    blanchedalmond: "ffebcd",
	    blue: "00f",
	    blueviolet: "8a2be2",
	    brown: "a52a2a",
	    burlywood: "deb887",
	    burntsienna: "ea7e5d",
	    cadetblue: "5f9ea0",
	    chartreuse: "7fff00",
	    chocolate: "d2691e",
	    coral: "ff7f50",
	    cornflowerblue: "6495ed",
	    cornsilk: "fff8dc",
	    crimson: "dc143c",
	    cyan: "0ff",
	    darkblue: "00008b",
	    darkcyan: "008b8b",
	    darkgoldenrod: "b8860b",
	    darkgray: "a9a9a9",
	    darkgreen: "006400",
	    darkgrey: "a9a9a9",
	    darkkhaki: "bdb76b",
	    darkmagenta: "8b008b",
	    darkolivegreen: "556b2f",
	    darkorange: "ff8c00",
	    darkorchid: "9932cc",
	    darkred: "8b0000",
	    darksalmon: "e9967a",
	    darkseagreen: "8fbc8f",
	    darkslateblue: "483d8b",
	    darkslategray: "2f4f4f",
	    darkslategrey: "2f4f4f",
	    darkturquoise: "00ced1",
	    darkviolet: "9400d3",
	    deeppink: "ff1493",
	    deepskyblue: "00bfff",
	    dimgray: "696969",
	    dimgrey: "696969",
	    dodgerblue: "1e90ff",
	    firebrick: "b22222",
	    floralwhite: "fffaf0",
	    forestgreen: "228b22",
	    fuchsia: "f0f",
	    gainsboro: "dcdcdc",
	    ghostwhite: "f8f8ff",
	    gold: "ffd700",
	    goldenrod: "daa520",
	    gray: "808080",
	    green: "008000",
	    greenyellow: "adff2f",
	    grey: "808080",
	    honeydew: "f0fff0",
	    hotpink: "ff69b4",
	    indianred: "cd5c5c",
	    indigo: "4b0082",
	    ivory: "fffff0",
	    khaki: "f0e68c",
	    lavender: "e6e6fa",
	    lavenderblush: "fff0f5",
	    lawngreen: "7cfc00",
	    lemonchiffon: "fffacd",
	    lightblue: "add8e6",
	    lightcoral: "f08080",
	    lightcyan: "e0ffff",
	    lightgoldenrodyellow: "fafad2",
	    lightgray: "d3d3d3",
	    lightgreen: "90ee90",
	    lightgrey: "d3d3d3",
	    lightpink: "ffb6c1",
	    lightsalmon: "ffa07a",
	    lightseagreen: "20b2aa",
	    lightskyblue: "87cefa",
	    lightslategray: "789",
	    lightslategrey: "789",
	    lightsteelblue: "b0c4de",
	    lightyellow: "ffffe0",
	    lime: "0f0",
	    limegreen: "32cd32",
	    linen: "faf0e6",
	    magenta: "f0f",
	    maroon: "800000",
	    mediumaquamarine: "66cdaa",
	    mediumblue: "0000cd",
	    mediumorchid: "ba55d3",
	    mediumpurple: "9370db",
	    mediumseagreen: "3cb371",
	    mediumslateblue: "7b68ee",
	    mediumspringgreen: "00fa9a",
	    mediumturquoise: "48d1cc",
	    mediumvioletred: "c71585",
	    midnightblue: "191970",
	    mintcream: "f5fffa",
	    mistyrose: "ffe4e1",
	    moccasin: "ffe4b5",
	    navajowhite: "ffdead",
	    navy: "000080",
	    oldlace: "fdf5e6",
	    olive: "808000",
	    olivedrab: "6b8e23",
	    orange: "ffa500",
	    orangered: "ff4500",
	    orchid: "da70d6",
	    palegoldenrod: "eee8aa",
	    palegreen: "98fb98",
	    paleturquoise: "afeeee",
	    palevioletred: "db7093",
	    papayawhip: "ffefd5",
	    peachpuff: "ffdab9",
	    peru: "cd853f",
	    pink: "ffc0cb",
	    plum: "dda0dd",
	    powderblue: "b0e0e6",
	    purple: "800080",
	    rebeccapurple: "663399",
	    red: "f00",
	    rosybrown: "bc8f8f",
	    royalblue: "4169e1",
	    saddlebrown: "8b4513",
	    salmon: "fa8072",
	    sandybrown: "f4a460",
	    seagreen: "2e8b57",
	    seashell: "fff5ee",
	    sienna: "a0522d",
	    silver: "c0c0c0",
	    skyblue: "87ceeb",
	    slateblue: "6a5acd",
	    slategray: "708090",
	    slategrey: "708090",
	    snow: "fffafa",
	    springgreen: "00ff7f",
	    steelblue: "4682b4",
	    tan: "d2b48c",
	    teal: "008080",
	    thistle: "d8bfd8",
	    tomato: "ff6347",
	    turquoise: "40e0d0",
	    violet: "ee82ee",
	    wheat: "f5deb3",
	    white: "fff",
	    whitesmoke: "f5f5f5",
	    yellow: "ff0",
	    yellowgreen: "9acd32"
	};

	// Make it easy to access colors via `hexNames[hex]`
	var hexNames = tinycolor.hexNames = flip(names);


	// Utilities
	// ---------

	// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
	function flip(o) {
	    var flipped = { };
	    for (var i in o) {
	        if (o.hasOwnProperty(i)) {
	            flipped[o[i]] = i;
	        }
	    }
	    return flipped;
	}

	// Return a valid alpha value [0,1] with all invalid values being set to 1
	function boundAlpha(a) {
	    a = parseFloat(a);

	    if (isNaN(a) || a < 0 || a > 1) {
	        a = 1;
	    }

	    return a;
	}

	// Take input from [0, n] and return it as [0, 1]
	function bound01(n, max) {
	    if (isOnePointZero(n)) { n = "100%"; }

	    var processPercent = isPercentage(n);
	    n = mathMin(max, mathMax(0, parseFloat(n)));

	    // Automatically convert percentage into number
	    if (processPercent) {
	        n = parseInt(n * max, 10) / 100;
	    }

	    // Handle floating point rounding errors
	    if ((Math.abs(n - max) < 0.000001)) {
	        return 1;
	    }

	    // Convert into [0, 1] range if it isn't already
	    return (n % max) / parseFloat(max);
	}

	// Force a number between 0 and 1
	function clamp01(val) {
	    return mathMin(1, mathMax(0, val));
	}

	// Parse a base-16 hex value into a base-10 integer
	function parseIntFromHex(val) {
	    return parseInt(val, 16);
	}

	// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	function isOnePointZero(n) {
	    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
	}

	// Check to see if string passed in is a percentage
	function isPercentage(n) {
	    return typeof n === "string" && n.indexOf('%') != -1;
	}

	// Force a hex value to have 2 characters
	function pad2(c) {
	    return c.length == 1 ? '0' + c : '' + c;
	}

	// Replace a decimal with it's percentage value
	function convertToPercentage(n) {
	    if (n <= 1) {
	        n = (n * 100) + "%";
	    }

	    return n;
	}

	// Converts a decimal to a hex value
	function convertDecimalToHex(d) {
	    return Math.round(parseFloat(d) * 255).toString(16);
	}
	// Converts a hex value to a decimal
	function convertHexToDecimal(h) {
	    return (parseIntFromHex(h) / 255);
	}

	var matchers = (function() {

	    // <http://www.w3.org/TR/css3-values/#integers>
	    var CSS_INTEGER = "[-\\+]?\\d+%?";

	    // <http://www.w3.org/TR/css3-values/#number-value>
	    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

	    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
	    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

	    // Actual matching.
	    // Parentheses and commas are optional, but not required.
	    // Whitespace can take the place of commas or opening paren
	    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
	    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

	    return {
	        CSS_UNIT: new RegExp(CSS_UNIT),
	        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
	        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
	        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
	        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
	        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
	        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
	        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
	    };
	})();

	// `isValidCSSUnit`
	// Take in a single string / number and check to see if it looks like a CSS unit
	// (see `matchers` above for definition).
	function isValidCSSUnit(color) {
	    return !!matchers.CSS_UNIT.exec(color);
	}

	// `stringInputToObject`
	// Permissive string parsing.  Take in a number of formats, and output an object
	// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	function stringInputToObject(color) {

	    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
	    var named = false;
	    if (names[color]) {
	        color = names[color];
	        named = true;
	    }
	    else if (color == 'transparent') {
	        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
	    }

	    // Try to match string input using regular expressions.
	    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	    // Just return an object and let the conversion functions handle that.
	    // This way the result will be the same whether the tinycolor is initialized with string or object.
	    var match;
	    if ((match = matchers.rgb.exec(color))) {
	        return { r: match[1], g: match[2], b: match[3] };
	    }
	    if ((match = matchers.rgba.exec(color))) {
	        return { r: match[1], g: match[2], b: match[3], a: match[4] };
	    }
	    if ((match = matchers.hsl.exec(color))) {
	        return { h: match[1], s: match[2], l: match[3] };
	    }
	    if ((match = matchers.hsla.exec(color))) {
	        return { h: match[1], s: match[2], l: match[3], a: match[4] };
	    }
	    if ((match = matchers.hsv.exec(color))) {
	        return { h: match[1], s: match[2], v: match[3] };
	    }
	    if ((match = matchers.hsva.exec(color))) {
	        return { h: match[1], s: match[2], v: match[3], a: match[4] };
	    }
	    if ((match = matchers.hex8.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            a: convertHexToDecimal(match[4]),
	            format: named ? "name" : "hex8"
	        };
	    }
	    if ((match = matchers.hex6.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            format: named ? "name" : "hex"
	        };
	    }
	    if ((match = matchers.hex4.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1] + '' + match[1]),
	            g: parseIntFromHex(match[2] + '' + match[2]),
	            b: parseIntFromHex(match[3] + '' + match[3]),
	            a: convertHexToDecimal(match[4] + '' + match[4]),
	            format: named ? "name" : "hex8"
	        };
	    }
	    if ((match = matchers.hex3.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1] + '' + match[1]),
	            g: parseIntFromHex(match[2] + '' + match[2]),
	            b: parseIntFromHex(match[3] + '' + match[3]),
	            format: named ? "name" : "hex"
	        };
	    }

	    return false;
	}

	function validateWCAG2Parms(parms) {
	    // return valid WCAG2 parms for isReadable.
	    // If input parms are invalid, return {"level":"AA", "size":"small"}
	    var level, size;
	    parms = parms || {"level":"AA", "size":"small"};
	    level = (parms.level || "AA").toUpperCase();
	    size = (parms.size || "small").toLowerCase();
	    if (level !== "AA" && level !== "AAA") {
	        level = "AA";
	    }
	    if (size !== "small" && size !== "large") {
	        size = "small";
	    }
	    return {"level":level, "size":size};
	}

	// Node: Export function
	if (typeof module !== "undefined" && module.exports) {
	    module.exports = tinycolor;
	}
	// AMD/requirejs: Define the module
	else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {return tinycolor;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	// Browser: Expose to window
	else {
	    window.tinycolor = tinycolor;
	}

	})(Math);


/***/ }

/******/ });