function toRad(r) {
  return Math.PI * r / 180;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
