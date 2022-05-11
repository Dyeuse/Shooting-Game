import { calcCanvasMeasure, calcCanvasSize } from "./utilities/canvasCalc";

class Zone {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
        this.canvas.setAttribute("height", Zone.size.height);
        this.canvas.setAttribute("width", Zone.size.width);
        this.container.addEventListener("resizeGame", this.#handleResizeGame);
    }

    #handleResizeGame = (event) => {
        const { height, width } = event.detail;
        this.canvas.setAttribute("height", height);
        this.canvas.setAttribute("width", width);
    };

    static get size() {
        return Zone.#calcZoneSize(window.innerHeight, window.innerWidth);
    }

    static #calcZoneSize(viewportHeight, viewportWidth) {
        const canvasHeight = calcCanvasMeasure(viewportHeight)({
            min: 450,
            max: 1200,
            pad: 150,
        });

        const canvasWidth = calcCanvasMeasure(viewportWidth)({
            min: 300,
            max: 800,
            pad: 100,
        });

        return calcCanvasSize(canvasHeight)(canvasWidth);
    }

    static isOutOfZone(coord) {
        const { width, height } = Zone.size;
        return coord.x < 0 || coord.x > width || coord.y < 0 || coord.y > height;
    }
}

export default Zone;
