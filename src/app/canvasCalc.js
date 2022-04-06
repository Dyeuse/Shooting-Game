// Measure is either height or width
const calcCanvasMeasure =
    (viewportMeasure) =>
    ({ min, max, pad }) => {
        if (min < viewportMeasure && viewportMeasure < max) {
            return viewportMeasure - pad;
        }
        if (viewportMeasure < min) {
            return min - pad;
        }
        return max - pad;
    };

// To be sure to get an arbitrary ratio of 1.5 between height and width
const calcCanvasSize = (height) => (width) =>
    height / 1.5 < width
        ? { height, width: height / 1.5 }
        : { height: width * 1.5, width };

export { calcCanvasMeasure, calcCanvasSize };
