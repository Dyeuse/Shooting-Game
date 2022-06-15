class Radar {
    bulletsInZone = {};

    bombsInZone = {};

    droppedBombs = 0;

    interceptedBombs = 0;

    constructor(zone, score) {
        this.zone = zone;
        this.canvas = zone.canvas;
        this.container = zone.container;
        this.score = score;
        this.canvas.addEventListener("shoot", this.#handleShoot);
        this.canvas.addEventListener("drop", this.#handleDrop);
        this.canvas.addEventListener("isIntercepted", this.#handleIsIntercepted);
        this.canvas.addEventListener("isOutOfZone", this.#handleIsOutOfZone);
        this.canvas.addEventListener("resetRaid", this.#handleResetRaid);
        this.canvas.addEventListener("startOfTheRaid", this.#handleStartOfTheRaid);
        this.canvas.addEventListener("endOfTheRaid", this.#handleEndOfTheRaid);
        this.zone.container.addEventListener("resizeGame", this.#handleResizeGame);
    }

    #handleShoot = (event) => {
        this.bulletsInZone[event.detail.bulletID] = event.detail;
    };

    #handleDrop = (event) => {
        this.droppedBombs += 1;
        this.bombsInZone[event.detail.bombID] = event.detail;
    };

    #handleIsIntercepted = (event) => {
        this.interceptedBombs += 1;
        this.bombsInZone[event.detail.id].intercepted = true;
        this.score.innerHTML = `${this.interceptedBombs}`;
    };

    #handleIsOutOfZone = (event) => {
        if (event.detail.type === "bomb") {
            delete this.bombsInZone[event.detail.id];
        } else {
            delete this.bulletsInZone[event.detail.id];
        }
    };

    #handleResetRaid = () => {
        this.bulletsInZone = {};
        this.bombsInZone = {};
        this.droppedBombs = 0;
        this.interceptedBombs = 0;
        this.score.innerHTML = "";
    };

    #handleStartOfTheRaid = () => {
        this.score.innerHTML = "";
    };

    #handleEndOfTheRaid = () => {
        const idInterval = setInterval(() => {
            if (Object.keys(this.bombsInZone).length === 0) {
                this.#resetData();
                clearInterval(idInterval);
            }
        }, 100);
    };

    #handleResizeGame = (event) => {
        this.infoForPlayer.style.width = `${event.detail.width}px`;
    };

    displayRadar() {
        this.#displayBullets();
        this.#displayBombs();
    }

    #resetData() {
        setTimeout(() => {
            this.bulletsInZone = {};
            this.bombsInZone = {};
            this.droppedBombs = 0;
            this.interceptedBombs = 0;
        }, 1500);
    }

    #displayBullets() {
        Object.values(this.bulletsInZone).forEach((bullet) => {
            bullet.checkImpact(Object.values(this.bombsInZone));
            bullet.moveBullet();
            bullet.displayBullet();
        });
    }

    #displayBombs() {
        Object.values(this.bombsInZone).forEach((bomb) => {
            bomb.moveBomb();
            bomb.displayBomb();
        });
    }
}
export default Radar;
