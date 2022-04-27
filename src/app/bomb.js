class Bomb {
    explosionStape = 0;

    constructor(bomber, position) {
        this.zone = bomber.zone;
        this.canvas = bomber.canvas;
        this.ctx = bomber.ctx;
        this.zoneSize = bomber.zoneSize;
        this.position = position;
        this.bombID = Date.now();
        this.position = position;
        this.intercepted = false;
        this.impact = false;
    }

    display() {
        const { ctx } = this;
        const { x, y } = this.position;
        const unity = this.zoneSize.width / 100;
        ctx.fillStyle = "#444";
        ctx.strokeStyle = "#222";
        ctx.lineWidth = unity;
        ctx.beginPath();
        ctx.moveTo(x, y + 6 * unity);
        ctx.lineTo(x - 3 * unity, y + 5 * unity);
        ctx.lineTo(x - 3 * unity, y);
        ctx.lineTo(x, y + 3 * unity);
        ctx.lineTo(x + 3 * unity, y);
        ctx.lineTo(x + 3 * unity, y + 5 * unity);
        ctx.lineTo(x, y + 6 * unity);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(x, y + unity);
        ctx.lineTo(x, y + 10 * unity);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(
            x,
            y + 12.5 * unity,
            unity * 3.5,
            unity * 6,
            0,
            0,
            Math.PI * 2,
            false
        );
        ctx.fill();
        ctx.closePath();
    }

    move() {
        if (this.zone.constructor.isOutOfZone(this.position)) {
            const event = new CustomEvent("isOutOfZone", {
                detail: { type: "bomb", id: this.bombID },
            });
            this.canvas.dispatchEvent(event);
        } else {
            this.position.y += 1;
        }
    }
}

export default Bomb;
