/**
 * get a random number up until a specific value
 * @param {number} min
 * @param {number} max
 * @returns random int between min (included) & max (included)
 */
function randomNumberBetween(min, max) {
  return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
}

export default randomNumberBetween;
