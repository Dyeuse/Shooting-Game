import Bomb from "./bomb";

class Bomber {
    raidInProgress = 0;

    constructor(zone) {
        Object.assign(this, zone);
        this.zone = zone;
        this.zoneSize = zone.constructor.size;
        this.unity = zone.constructor.size.width / 100;
        this.container.addEventListener("resizeGame", this.handleResizeGame);
    }

    handleResizeGame = (event) => {
        this.zoneSize = event.detail;
    };

    raid = () => {
        const that = this;
        let droppedBombs = 0;
        let delay = 2000;
        let velocity = that.unity / 1.5;

        that.raidInProgress = setTimeout(function drop() {
            that.#dropABomb(velocity);
            droppedBombs += 1;
            if (droppedBombs < 100) {
                that.raidInProgress = setTimeout(drop, delay);
            }
            if (droppedBombs % 10 === 0 && delay > 400) {
                delay -= 200;
                velocity += that.unity / 20;
            }
        }, delay);
    };

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

    #dropABomb(velocity) {
        const position = { x: this.bombHorizontalCoord, y: 0 };
        const event = new CustomEvent("drop", {
            detail: new Bomb(this.zone, position, velocity),
        });
        this.canvas.dispatchEvent(event);
    }
}

export default Bomber;
