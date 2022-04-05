import { roundDown, calcCanvasMeasure, calcCanvasSize } from "../src/app/canvasCalc";

describe("Canvas calculation", () => {
    describe("Rounded viewport measurement", () => {
        test("should return a number", () => {
            expect(typeof roundDown(1)).toBe("number");
            expect(typeof roundDown(0)).toBe("number");
            expect(typeof roundDown(1000)).toBe("number");
        });
        test("should return a multiple of one hundred", () => {
            expect(roundDown(1234) % 100).toBe(0);
            expect(roundDown(1200) % 100).toBe(0);
        });
    });
    describe("Canvas height or width calculation", () => {
        // Only one of those 2 obj are passed to the "inner" function
        const height = { min: 450, max: 1200, pad: 150 };
        const width = { min: 300, max: 800, pad: 100 };
        test("should return 850", () => {
            expect(calcCanvasMeasure(1000)(height)).toBe(850);
        });
        test("should return 300", () => {
            expect(calcCanvasMeasure(400)(height)).toBe(300);
        });
        test("should return 1050", () => {
            expect(calcCanvasMeasure(1250)(height)).toBe(1050);
        });
        test("should return 400", () => {
            expect(calcCanvasMeasure(500)(width)).toBe(400);
        });
        test("should return 200", () => {
            expect(calcCanvasMeasure(200)(width)).toBe(200);
        });
        test("should return 700", () => {
            expect(calcCanvasMeasure(850)(width)).toBe(700);
        });
    });
    describe("Canvas size determination", () => {
        test("should return {height: 1500, width: 1000}", () => {
            expect(calcCanvasSize(1500)(1000)).toEqual({ height: 1500, width: 1000 });
            expect(calcCanvasSize(1500)(1200)).toEqual({ height: 1500, width: 1000 });
            expect(calcCanvasSize(1700)(1000)).toEqual({ height: 1500, width: 1000 });
        });
    });
});
