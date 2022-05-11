import { calcComponents, calcIntermediateCoord, calcMagnitude } from "./vector";

class Bullet {
    bulletID = Date.now();

    distanceFromInitCoord = 0;

    constructor(gun) {
        this.zone = gun.zone;
        this.canvas = gun.canvas;
        this.ctx = gun.ctx;
        this.unity = gun.unity;
        this.initCoord = { ...gun.tipBarrelCoord };
        this.targetCoord = { ...gun.targetCoord };
    }

    get currentCoord() {
        return calcIntermediateCoord(
            this.initCoord,
            this.targetCoord,
            this.distanceFromInitCoord
        );
    }

    moveBullet() {
        if (this.zone.constructor.isOutOfZone(this.currentCoord)) {
            this.#isOutOfZone();
        } else {
            this.distanceFromInitCoord += this.unity * 3; // Create bullet motion impression
        }
    }

    checkImpact(bombs) {
        bombs.forEach((bomb) => {
            const bulletBombComponents = calcComponents(bomb.position, this.currentCoord);
            const bulletBombMagnitude = calcMagnitude(bulletBombComponents);
            if (bulletBombMagnitude <= this.unity * 10) {
                this.#isOutOfZone();
                this.#isIntercepted(bomb);
            }
        });
    }

    displayBullet() {
        const {
            ctx,
            unity,
            currentCoord: { x, y },
        } = this;
        ctx.beginPath();
        ctx.fillStyle = "#F00";
        ctx.arc(x, y, unity * 1.5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }

    #isOutOfZone() {
        const event = new CustomEvent("isOutOfZone", {
            detail: { type: "bullet", id: this.bulletID },
        });
        this.canvas.dispatchEvent(event);
    }

    #isIntercepted(bomb) {
        const event = new CustomEvent("isIntercepted", {
            detail: { type: "bomb", id: bomb.bombID },
        });
        this.canvas.dispatchEvent(event);
    }
}

export default Bullet;
