const roundDown = (n) => Math.floor(n / 100) * 100;

// Measure is either height or width
const calcCanvasMeasure =
    (viewportRoundedMeasure) =>
    ({ min, max, pad }) => {
        if (min < viewportRoundedMeasure && viewportRoundedMeasure < max) {
            return viewportRoundedMeasure - pad;
        }
        if (viewportRoundedMeasure < min) {
            return min - pad;
        }
        return max - pad;
    };

// To be sure to get an arbitrary ratio of 1.5 between height and width
const calcCanvasSize = (height) => (width) =>
    height / 1.5 < width
        ? { height, width: height / 1.5 }
        : { height: width * 1.5, width };

export { roundDown, calcCanvasMeasure, calcCanvasSize };
