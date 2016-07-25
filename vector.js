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
