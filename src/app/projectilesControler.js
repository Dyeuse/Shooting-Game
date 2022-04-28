class ProjectilesControler {
    constructor(zone) {
        this.canvas = zone.canvas;
        this.bulletsInZone = {};
        this.bombsInZone = {};
        this.canvas.addEventListener("shoot", this.handleShoot.bind(this));
        this.canvas.addEventListener("drop", this.handleDrop.bind(this));
        this.canvas.addEventListener("explose", this.handleExplose.bind(this));
        this.canvas.addEventListener("isOutOfZone", this.handleIsOutOfZone.bind(this));
    }

    handleShoot(event) {
        this.bulletsInZone[event.detail.bulletID] = event.detail;
    }

    handleDrop(event) {
        this.bombsInZone[event.detail.bombID] = event.detail;
    }

    handleExplose(event) {
        this.bombsInZone[event.detail.bulletID].displayExplosin();
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
            bullet.move();
            bullet.display();
        });
    }

    #displayBombs() {
        Object.values(this.bombsInZone).forEach((bomb) => {
            bomb.move();
            bomb.display();
        });
    }
}
export default ProjectilesControler;
