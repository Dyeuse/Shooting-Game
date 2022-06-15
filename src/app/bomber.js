import Bomb from "./bomb";

class Bomber {
    raidInProgress = 0;

    raidSuspending = false;

    constructor(zone) {
        Object.assign(this, zone);
        this.zone = zone;
        this.unity = zone.constructor.size.width / 100;
        this.bombVelocity = this.unity;
        this.container.addEventListener("resizeGame", this.handleResizeGame);
        this.canvas.addEventListener("resetRaid", this.handleResetRaid);
        this.canvas.addEventListener("suspendRaid", this.handleSuspendRaid);
        this.canvas.addEventListener("restartRaid", this.handleRestartRaid);
    }

    handleResizeGame = (event) => {
        this.unity = event.detail.width / 100;
        this.bombVelocity = this.unity / 1.5;
    };

    handleResetRaid = () => {
        this.raidSuspending = false;
        clearTimeout(this.raidInProgress);
        this.raidInProgress = 0;
    };

    handleSuspendRaid = () => {
        this.raidSuspending = true;
    };

    handleRestartRaid = () => {
        this.raidSuspending = false;
    };

    raid = () => {
        const that = this;
        let droppedBombs = 0;
        let delay = 1500;
        // Recursive setTimeout instead of setInterval to allow the modification of the delay parameter
        that.raidInProgress = setTimeout(function drop() {
            if (!that.raidSuspending) {
                that.#dropABomb();
                droppedBombs += 1;
            }
            if (droppedBombs < 60) {
                that.raidInProgress = setTimeout(drop, delay);
            } else {
                that.#finishRaid();
            }
            if (droppedBombs % 3 === 0 && delay > 300) {
                delay -= 100;
                that.bombVelocity += that.unity / 20;
            }
        }, delay);
    };

    get bombHorizontalCoord() {
        // Bombs can appear in 5 columns
        let x = this.unity * 10;
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

    #dropABomb() {
        const position = { x: this.bombHorizontalCoord, y: 0 };
        const event = new CustomEvent("drop", {
            detail: new Bomb(this.zone, position, this.bombVelocity),
        });
        this.canvas.dispatchEvent(event);
    }

    #finishRaid() {
        this.raidInProgress = 0;
        this.raidSuspending = false;
        this.bombVelocity = this.unity;
        clearTimeout(this.raidInProgress);
        const event = new CustomEvent("endOfTheRaid");
        this.canvas.dispatchEvent(event);
    }
}

export default Bomber;
