import { calcComponents, calcMagnitude } from "../src/app/vector";

describe("Vectors operations", () => {
    const coordA = { x: 0, y: 0 };
    const coordB = { x: 0, y: 10 };
    const coordC = { x: -10, y: 0 };
    const coordD = { x: 5, y: -5 };
    const coordE = { x: 10, y: 10 };
    const coordF = { x: 3, y: -4 };
    describe("Vector's coordinates calculation", () => {
        test("should return AA vector's coordinates", () => {
            expect(calcComponents(coordA, coordA)).toEqual({
                x: 0,
                y: 0,
            });
        });
        test("should return AB vector's coordinates", () => {
            expect(calcComponents(coordA, coordB)).toEqual({
                x: 0,
                y: 10,
            });
        });
        test("should return AC vector's coordinates", () => {
            expect(calcComponents(coordA, coordC)).toEqual({
                x: -10,
                y: 0,
            });
        });
        test("should return DE vector's coordinates", () => {
            expect(calcComponents(coordD, coordE)).toEqual({
                x: 5,
                y: 15,
            });
        });
    });
    describe("Vector's length calculation", () => {
        test("should return length of the vector { x: 0, y: 0 }", () => {
            expect(calcMagnitude(coordA)).toBe(0);
        });
        test("should return length of the vector { x: -10, y: 0 }", () => {
            expect(calcMagnitude(coordC)).toBe(10);
        });
        test("should return length of the vector { x: 3, y: -4 }", () => {
            expect(calcMagnitude(coordF)).toBe(5);
        });
    });
});
