import Bullet from "./bullet";
import { calcIntermediateCoord } from "./vector";

class Gun {
    constructor(zone) {
        this.zone = zone;
        this.canvas = zone.canvas;
        this.ctx = zone.ctx;
        this.zoneSize = zone.constructor.size;
        this.targetCoord = { x: this.zoneSize.width / 2, y: 0 };
        this.aliveBullets = [];
        this.canvas.addEventListener("mousemove", this.handleMousemove.bind(this));
        this.canvas.addEventListener("click", this.handleClick.bind(this));
        this.zone.container.addEventListener(
            "resizeGame",
            this.#handleResizeGame.bind(this)
        );
    }

    get barrelLength() {
        return this.zoneSize.height / 10;
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

    handleMousemove(event) {
        this.targetCoord.x = event.pageX - event.target.offsetLeft;
        this.targetCoord.y = event.pageY - event.target.offsetTop;
    }

    handleClick() {
        const event = new CustomEvent("shoot", { detail: new Bullet(this) });
        this.canvas.dispatchEvent(event);
    }

    #handleResizeGame(event) {
        this.zoneSize = event.detail;
    }

    display() {
        this.#displayBarrel();
        this.#displayBody();
    }

    #displayBody = () => {
        const { ctx } = this;
        ctx.fillStyle = "#555";
        ctx.beginPath();
        ctx.arc(
            this.zoneSize.width / 2,
            this.zoneSize.height,
            this.zoneSize.width / 10,
            0,
            Math.PI,
            true
        );
        ctx.fill();
        ctx.closePath();
    };

    #displayBarrel = () => {
        const { ctx } = this;
        ctx.lineWidth = (this.zoneSize.width * 2) / 100;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#252422";
        ctx.beginPath();
        ctx.moveTo(this.tailBarrelCoord.x, this.tailBarrelCoord.y);
        ctx.lineTo(this.tipBarrelCoord.x, this.tipBarrelCoord.y);
        ctx.stroke();
        ctx.closePath();
    };
}

export default Gun;
