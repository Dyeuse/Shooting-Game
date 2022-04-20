import { calcVectorCoord, calcVectorLength } from "../src/app/vector";

describe("Vectors operations", () => {
    const coordA = { x: 0, y: 0 };
    const coordB = { x: 0, y: 10 };
    const coordC = { x: -10, y: 0 };
    const coordD = { x: 5, y: -5 };
    const coordE = { x: 10, y: 10 };
    const coordF = { x: 3, y: -4 };
    describe("Vector's coordinates calculation", () => {
        test("should return AA vector's coordinates", () => {
            expect(calcVectorCoord(coordA, coordA)).toEqual({
                x: 0,
                y: 0,
            });
        });
        test("should return AB vector's coordinates", () => {
            expect(calcVectorCoord(coordA, coordB)).toEqual({
                x: 0,
                y: 10,
            });
        });
        test("should return AC vector's coordinates", () => {
            expect(calcVectorCoord(coordA, coordC)).toEqual({
                x: -10,
                y: 0,
            });
        });
        test("should return DE vector's coordinates", () => {
            expect(calcVectorCoord(coordD, coordE)).toEqual({
                x: 5,
                y: 15,
            });
        });
    });
    describe("Vector's length calculation", () => {
        test("should return length of the vector { x: 0, y: 0 }", () => {
            expect(calcVectorLength(coordA)).toBe(0);
        });
        test("should return length of the vector { x: -10, y: 0 }", () => {
            expect(calcVectorLength(coordC)).toBe(10);
        });
        test("should return length of the vector { x: 3, y: -4 }", () => {
            expect(calcVectorLength(coordF)).toBe(5);
        });
    });
});
