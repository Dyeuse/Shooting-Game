// @ts-check

/**
 *
 * @typedef coord
 * @type {object}
 * @property {number} x - Abscissa
 * @property {number} y - Ordinate
 */

/**
 *
 * @function
 * @param {coord} coordA - Cartesian coordinates
 * @param {coord} coordB - Cartesian coordinates
 * @returns {coord} Vector's coordinates
 */
const calcVectorCoord = (coordA, coordB) => ({
    x: coordB.x - coordA.x,
    y: coordB.y - coordA.y,
});

/**
 *
 * @function
 * @param {coord} coord - Vector's coordinates
 * @returns {number} Vector's length
 */
const calcVectorLength = (coord) => Math.abs(Math.sqrt(coord.x ** 2 + coord.y ** 2));

/**
 * @function
 * @param {number} vectorLength
 * @param {number} intermediateLength
 * @returns {number} Dividing coefficient
 */
const calcCoefficient = (vectorLength, intermediateLength) =>
    vectorLength / intermediateLength;

/**
 *
 * @function
 * @param {coord} coord - Vector's coordinates
 * @param {number} coefficient
 * @returns {coord} Cartesian coordinates of a vector'point
 */
const calcIntermediateCoord = (coord, coefficient) => ({
    x: coord.x / coefficient,
    y: coord.y / coefficient,
});

export { calcVectorCoord, calcVectorLength, calcCoefficient, calcIntermediateCoord };
