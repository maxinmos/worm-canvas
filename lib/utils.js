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
