import Bullet from "./bullet";
import { calcIntermediateCoord } from "./vector";

class Gun {
    constructor(zone) {
        Object.assign(this, zone);
        this.zone = zone;
        this.zoneSize = zone.constructor.size;
        this.unity = this.zoneSize.width / 100;
        this.targetCoord = { x: this.zoneSize.width / 2, y: 0 }; // Set barrel initial position
        this.canvas.addEventListener("mousemove", this.#handleMousemove);
        this.canvas.addEventListener("click", this.#handleClick);
        this.container.addEventListener("resizeGame", this.#handleResizeGame);
    }

    #handleMousemove = (event) => {
        this.targetCoord.x = event.offsetX;
        this.targetCoord.y = event.offsetY;
    };

    #handleClick = () => {
        const event = new CustomEvent("shoot", { detail: new Bullet(this) });
        this.canvas.dispatchEvent(event);
    };

    #handleResizeGame = (event) => {
        this.zoneSize = event.detail;
        this.unity = event.detail.width / 100;
    };

    get barrelLength() {
        return this.unity * 15;
    }

    get tailBarrelCoord() {
        return {
            x: this.zoneSize.width / 2,
            y: this.zoneSize.height * 0.97,
        };
    }

    get tipBarrelCoord() {
        return calcIntermediateCoord(
            this.tailBarrelCoord,
            this.targetCoord,
            this.barrelLength
        );
    }

    displayGun() {
        this.#displayBarrel();
        this.#displayBody();
        this.#displaySymbol();
    }

    #displayBody() {
        const {
            ctx,
            unity,
            zoneSize: { width, height },
        } = this;
        ctx.beginPath();
        ctx.fillStyle = "#403D39";
        ctx.fillRect(36 * unity, height - 2 * unity, 28 * unity, 2 * unity);
        ctx.arc(width / 2, height, unity * 10, 0, Math.PI, true);
        ctx.fill();
        ctx.closePath();
    }

    #displayBarrel() {
        const {
            ctx,
            unity,
            tailBarrelCoord: { x: xTail, y: yTail },
            tipBarrelCoord: { x: xTip, y: yTip },
        } = this;
        ctx.beginPath();
        ctx.lineWidth = unity * 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#252422";
        ctx.moveTo(xTail, yTail);
        ctx.lineTo(xTip, yTip);
        ctx.stroke();
        ctx.closePath();
    }

    #displaySymbol() {
        const { ctx, unity } = this;
        ctx.beginPath();
        ctx.lineWidth = unity;
        ctx.strokeStyle = "#CCC5B9";
        // center triangle
        ctx.moveTo(unity * 50, unity * 148);
        ctx.lineTo(unity * 47, unity * 144);
        ctx.lineTo(unity * 53, unity * 144);
        ctx.lineTo(unity * 50, unity * 148);
        // left triangle
        ctx.moveTo(unity * 47, unity * 148);
        ctx.lineTo(unity * 43, unity * 148);
        ctx.lineTo(unity * 45, unity * 145);
        ctx.lineTo(unity * 47, unity * 148);
        // right triangle
        ctx.moveTo(unity * 53, unity * 148);
        ctx.lineTo(unity * 57, unity * 148);
        ctx.lineTo(unity * 55, unity * 145);
        ctx.lineTo(unity * 53, unity * 148);
        ctx.stroke();
        ctx.closePath();
    }
}

export default Gun;
