class Radar {
    bulletsInZone = {};

    bombsInZone = {};

    constructor(zone) {
        this.zone = zone;
        this.canvas = zone.canvas;
        this.canvas.addEventListener("shoot", this.#handleShoot);
        this.canvas.addEventListener("drop", this.#handleDrop);
        this.canvas.addEventListener("isIntercepted", this.#handleIsIntercepted);
        this.canvas.addEventListener("isOutOfZone", this.#handleIsOutOfZone);
    }

    #handleShoot = (event) => {
        this.bulletsInZone[event.detail.bulletID] = event.detail;
    };

    #handleDrop = (event) => {
        this.bombsInZone[event.detail.bombID] = event.detail;
    };

    #handleIsIntercepted = (event) => {
        this.bombsInZone[event.detail.id].intercepted = true;
    };

    #handleIsOutOfZone = (event) => {
        if (event.detail.type === "bomb") {
            delete this.bombsInZone[event.detail.id];
        } else {
            delete this.bulletsInZone[event.detail.id];
        }
    };

    displayRadar() {
        this.#displayBullets();
        this.#displayBombs();
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
