import Bomb from "./bomb";

class Bomber {
    constructor(zone) {
        this.zone = zone;
        this.canvas = zone.canvas;
        this.ctx = zone.ctx;
        this.zoneSize = zone.constructor.size;
    }

    dropBombs() {
        setInterval(() => {
            const position = { x: this.getBombHorizontalCoord(), y: 0 };
            const event = new CustomEvent("drop", { detail: new Bomb(this, position) });
            this.canvas.dispatchEvent(event);
        }, 2000);
    }

    getBombHorizontalCoord() {
        // Bombs can appear in 5 columns
        let x = this.zoneSize.width / 10;
        const col = Math.floor(Math.random() * 5 + 1);
        switch (col) {
            case 1:
                break;
            case 2:
                x *= 3;
                break;
            case 3:
                x *= 5;
                break;
            case 4:
                x *= 7;
                break;
            default:
                x *= 9;
        }
        return x;
    }
}

export default Bomber;
