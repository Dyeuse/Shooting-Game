import { calcComponents, calcIntermediateCoord, calcMagnitude } from "./vector";

class Bullet {
    constructor(gun) {
        this.zone = gun.zone;
        this.canvas = gun.canvas;
        this.ctx = gun.ctx;
        this.zoneSize = gun.zoneSize;
        this.bulletID = Date.now();
        this.initCoord = { ...gun.tipBarrelCoord };
        this.targetCoord = { ...gun.targetCoord };
        this.distanceFromInitCoord = 0;
    }

    get currentCoord() {
        return calcIntermediateCoord(
            this.initCoord,
            this.targetCoord,
            this.distanceFromInitCoord
        );
    }

    #isOut() {
        const event = new CustomEvent("isOutOfZone", {
            detail: { type: "bullet", id: this.bulletID },
        });
        this.canvas.dispatchEvent(event);
    }

    move() {
        if (this.zone.constructor.isOutOfZone(this.currentCoord)) {
            this.#isOut();
        } else {
            this.distanceFromInitCoord += 3;
        }
    }

    checkImpact(bombs) {
        bombs.forEach((bomb) => {
            const bulletBombComponents = calcComponents(bomb.position, this.currentCoord);
            const bulletBombMagnitude = calcMagnitude(bulletBombComponents);
            if (bulletBombMagnitude <= this.zoneSize.width / 10) {
                this.#isOut();
                const event = new CustomEvent("isIntercepted", {
                    detail: { type: "bomb", id: bomb.bombID },
                });
                this.canvas.dispatchEvent(event);
            }
        });
    }

    display() {
        const { ctx } = this;
        ctx.beginPath();
        ctx.fillStyle = "#F00";
        ctx.arc(
            this.currentCoord.x,
            this.currentCoord.y,
            this.zoneSize.width / 70,
            0,
            Math.PI * 2,
            false
        );
        ctx.fill();
        ctx.closePath();
    }
}

export default Bullet;
