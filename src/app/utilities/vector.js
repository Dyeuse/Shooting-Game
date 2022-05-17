const calcVectorComponents = (coordA, coordB) => ({
    x: coordB.x - coordA.x,
    y: coordB.y - coordA.y,
});

const calcVectorMagnitude = (vectorComponents) =>
    Math.abs(Math.sqrt(vectorComponents.x ** 2 + vectorComponents.y ** 2));

// This function calculates how many times a length is include in a vector magnitude
const calcCoefficient = (magnitude, includedLength) => magnitude / includedLength;

/* Use case
 * coordA : the gun barrel tip,
 * coordB : the crosshair position when shooting
 * includedLength : the distance between the bullet and the gun barrel tip
 * => intermediateCoord : the bullet coordinates
 */
const calcIntermediateCoord = (coordA, coordB, includedLength) => {
    const componentsAB = calcVectorComponents(coordA, coordB);
    const magnitudeAB = calcVectorMagnitude(componentsAB);
    const dividingCoefficient = calcCoefficient(magnitudeAB, includedLength);
    return {
        x: coordA.x + componentsAB.x / dividingCoefficient,
        y: coordA.y + componentsAB.y / dividingCoefficient,
    };
};

export {
    calcVectorComponents,
    calcVectorMagnitude,
    calcCoefficient,
    calcIntermediateCoord,
};
