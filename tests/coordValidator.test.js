import checkCoord from "../src/app/utilities/coordValidator";

describe.skip("Coordinates validation", () => {
    const coord1 = { x: 0, y: 0 };
    const coord2 = { x: 0, z: 0 };
    const coord3 = { x: 0, y: "0" };
    const coord4 = { x: true, y: 1 };
    const coord5 = 1;
    const coord6 = [1, 1];
    test("should return true if the parameter is an object", () => {
        expect(checkCoord(coord1)).toBe(true);
    });
    test("should return false if the parameter isn't an object", () => {
        expect(checkCoord(coord5)).toBe(false);
        expect(checkCoord(coord6)).toBe(false);
    });
    test("should return false if the parameter is missing", () => {
        expect(checkCoord()).toBe(false);
    });
    test("should return false if the x or y properties are missing", () => {
        expect(checkCoord(coord2)).toBe(false);
    });
    test("should return false if the x or y properties are not a number", () => {
        expect(checkCoord(coord3)).toBe(false);
        expect(checkCoord(coord4)).toBe(false);
    });
});
