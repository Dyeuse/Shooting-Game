import Bomb from "./bomb";

class Bomber {
    constructor(zone) {
        this.zone = zone;
        this.canvas = zone.canvas;
        this.ctx = zone.ctx;
        this.zoneSize = zone.constructor.size;
        this.zone.container.addEventListener(
            "resizeGame",
            this.#handleResizeGame.bind(this)
        );
    }

    get bombHorizontalCoord() {
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

    #handleResizeGame(event) {
        this.zoneSize = event.detail;
    }

    #dropABomb(velocity) {
        const position = { x: this.bombHorizontalCoord, y: 0 };
        const event = new CustomEvent("drop", {
            detail: new Bomb(this.zone, position, velocity),
        });
        this.canvas.dispatchEvent(event);
    }

    raid() {
        const that = this;
        let droppedBombs = 0;
        let cadence = 2000;
        let velocity = 1;
        let airdropPhase = setTimeout(function drop() {
            that.#dropABomb(velocity);
            droppedBombs += 1;
            if (droppedBombs % 10 === 0 && cadence > 200) {
                cadence -= 200;
                velocity += 0.5;
            }
            airdropPhase = setTimeout(drop, cadence);
            if (droppedBombs >= 100) {
                clearTimeout(airdropPhase);
            }
        }, cadence);
    }
}

export default Bomber;
