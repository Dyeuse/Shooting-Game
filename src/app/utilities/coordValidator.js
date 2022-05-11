function checkIfObject(val) {
    return typeof val === "object";
}
function checkIfNumber(val) {
    return typeof val === "number";
}
function checkCoord(coord) {
    return checkIfObject(coord)
        ? checkIfNumber(coord.x) && checkIfNumber(coord.y)
        : false;
}

export default checkCoord;
