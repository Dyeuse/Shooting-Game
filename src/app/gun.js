import { calcIntermediateCoord } from "./vector";

class Gun {
    constructor(zone) {
        this.ctx = zone.ctx;
        this.zoneSize = zone.constructor.size;
        this.targetCoord = { x: this.zoneSize.width / 2, y: 0 };
        zone.canvas.addEventListener("mousemove", this.handleMousemove.bind(this));
    }

    handleMousemove(event) {
        this.targetCoord.x = event.pageX - event.target.offsetLeft;
        this.targetCoord.y = event.pageY - event.target.offsetTop;
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
        const barrelLength = this.zoneSize.height / 10;
        const tailBarrelCoord = {
            x: this.zoneSize.width / 2,
            y: this.zoneSize.height * 0.97,
        };
        const tipBarrelCoord = calcIntermediateCoord(
            tailBarrelCoord,
            this.targetCoord,
            barrelLength
        );
        const { ctx } = this;
        ctx.lineWidth = (this.zoneSize.width * 2) / 100;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailBarrelCoord.x, tailBarrelCoord.y);
        ctx.lineTo(tipBarrelCoord.x, tipBarrelCoord.y);
        ctx.stroke();
        ctx.closePath();
    };
}

export default Gun;
