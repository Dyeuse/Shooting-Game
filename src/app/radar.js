class Radar {
    constructor(zone) {
        this.canvas = zone.canvas;
        this.zone = zone;
        this.bulletsInZone = {};
        this.bombsInZone = {};
        this.canvas.addEventListener("shoot", this.handleShoot.bind(this));
        this.canvas.addEventListener("drop", this.handleDrop.bind(this));
        this.canvas.addEventListener(
            "isIntercepted",
            this.handleIsIntercepted.bind(this)
        );
        this.canvas.addEventListener("isOutOfZone", this.handleIsOutOfZone.bind(this));
    }

    handleShoot(event) {
        this.bulletsInZone[event.detail.bulletID] = event.detail;
    }

    handleDrop(event) {
        this.bombsInZone[event.detail.bombID] = event.detail;
    }

    handleIsIntercepted(event) {
        this.bombsInZone[event.detail.id].intercepted = true;
    }

    handleIsOutOfZone(event) {
        if (event.detail.type === "bomb") {
            delete this.bombsInZone[event.detail.id];
        } else {
            delete this.bulletsInZone[event.detail.id];
        }
    }

    display() {
        this.#displayBullets();
        this.#displayBombs();
    }

    #displayBullets() {
        Object.values(this.bulletsInZone).forEach((bullet) => {
            bullet.checkImpact(Object.values(this.bombsInZone));
            bullet.move();
            bullet.display();
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
