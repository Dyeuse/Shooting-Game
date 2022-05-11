// @ts-check

/**
 *
 * @typedef cartesianCoordinates
 * @type {object}
 * @property {number} x - Abscissa
 * @property {number} y - Ordinate
 *
 * @typedef vectorComponents
 * @type {object}
 * @property {number} x - horizontal component
 * @property {number} y - vertical component
 */

/**
 *
 * @function
 * @param {cartesianCoordinates} coordA
 * @param {cartesianCoordinates} coordB
 * @returns {vectorComponents} Components of the vector AB (= coordinates)
 */
const calcComponents = (coordA, coordB) => ({
    x: coordB.x - coordA.x,
    y: coordB.y - coordA.y,
});

/**
 *
 * @function
 * @param {vectorComponents} compo -
 * @returns {number} Vector's magnitude (= length)
 */
const calcMagnitude = (compo) => Math.abs(Math.sqrt(compo.x ** 2 + compo.y ** 2));

/**
 * @function
 * @param {number} magnitude
 * @param {number} includedLength
 * @returns {number} Dividing coefficient (number of times a length is in a magnitude)
 */
const calcCoefficient = (magnitude, includedLength) => magnitude / includedLength;

/**
 *
 * @function
 * @param {cartesianCoordinates} coordA
 * @param {cartesianCoordinates} coordB
 * @param {number} includedLength
 * @returns {cartesianCoordinates} Cartesian coordinates of a vector'point
 */
const calcIntermediateCoord = (coordA, coordB, includedLength) => {
    const componentsAB = calcComponents(coordA, coordB);
    const magnitudeAB = calcMagnitude(componentsAB);
    const dividingCoefficient = calcCoefficient(magnitudeAB, includedLength);
    return {
        x: coordA.x + componentsAB.x / dividingCoefficient,
        y: coordA.y + componentsAB.y / dividingCoefficient,
    };
};

export { calcComponents, calcMagnitude, calcCoefficient, calcIntermediateCoord };
