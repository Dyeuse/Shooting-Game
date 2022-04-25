import { calcCanvasMeasure, calcCanvasSize } from "./canvasCalc";

class Zone {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
        this.canvas.setAttribute("height", Zone.size.height);
        this.canvas.setAttribute("width", Zone.size.width);
        window.addEventListener("resize", this.#handleResize.bind(this));
    }

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

    #handleResize() {
        this.canvas.setAttribute("height", Zone.size.height);
        this.canvas.setAttribute("width", Zone.size.width);
    }

    static isOutOfZone(coord) {
        return (
            coord.x < 0 ||
            coord.x > Zone.size.width ||
            coord.y < 0 ||
            coord.y > Zone.size.height
        );
    }
}

export default Zone;
