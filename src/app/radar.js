class Radar {
    bulletsInZone = {};

    bombsInZone = {};

    droppedBombs = 0;

    interceptedBombs = 0;

    constructor(zone) {
        this.zone = zone;
        this.canvas = zone.canvas;
        this.container = zone.container;
        this.infoForPlayer = this.container.querySelector(".infoForPlayer");
        this.infoForPlayer.style.width = `${zone.constructor.size.width}px`;
        this.bombsCounter = this.container.querySelector(".bombsCounter-info");
        this.level = this.container.querySelector(".level-info");
        this.score = this.container.querySelector(".score-info");
        this.canvas.addEventListener("shoot", this.#handleShoot);
        this.canvas.addEventListener("drop", this.#handleDrop);
        this.canvas.addEventListener("isIntercepted", this.#handleIsIntercepted);
        this.canvas.addEventListener("isOutOfZone", this.#handleIsOutOfZone);
        this.canvas.addEventListener("resetRadar", this.#handleResetRadar);
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
    };

    #handleIsOutOfZone = (event) => {
        if (event.detail.type === "bomb") {
            delete this.bombsInZone[event.detail.id];
        } else {
            delete this.bulletsInZone[event.detail.id];
        }
    };

    #handleResetRadar = () => {
        this.bulletsInZone = {};
        this.bombsInZone = {};
        this.droppedBombs = 0;
        this.interceptedBombs = 0;
    };

    #handleResizeGame = (event) => {
        this.infoForPlayer.style.width = `${event.detail.width}px`;
    };

    displayRadar() {
        this.#displayBullets();
        this.#displayBombs();
    }

    displayDashboard() {
        this.bombsCounter.textContent = this.droppedBombs;
        this.level.textContent = Math.ceil(this.droppedBombs / 10);
        this.score.textContent = this.interceptedBombs;
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
