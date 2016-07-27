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
