class ProjectilesControler {
    constructor(zone) {
        this.canvas = zone.canvas;
        this.bulletsInZone = {};
        this.canvas.addEventListener("shoot", this.handleShoot.bind(this));
        this.canvas.addEventListener("isOutOfZone", this.handleIsOutOfZone.bind(this));
    }

    handleShoot(event) {
        this.bulletsInZone[event.detail.bulletID] = event.detail;
    }

    handleIsOutOfZone(event) {
        delete this.bulletsInZone[event.detail];
    }

    displayBullets() {
        Object.values(this.bulletsInZone).forEach((bullet) => {
            bullet.move();
            bullet.display();
        });
    }
}
export default ProjectilesControler;
