class Bomb {
    explosionStep = 0;

    bombID = Date.now();

    impact = false;

    constructor(bomber, position) {
        this.zone = bomber.zone;
        this.canvas = bomber.canvas;
        this.ctx = bomber.ctx;
        this.zoneSize = bomber.zoneSize;
        this.unity = this.zoneSize.width / 100;
        this.position = position;
    }

    get detonatorPosition() {
        return {
            x: this.position.x,
            y: this.position.y + this.unity * 15,
        };
    }

    display() {
        if (this.explosionStep < 5) {
            const { ctx, unity } = this;
            const { x, y } = this.position;
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
    }

    move() {
        if (this.zone.constructor.isOutOfZone(this.detonatorPosition)) {
            this.explosionStep += 1;
            this.explose();
        } else {
            this.position.y += 1;
        }
    }

    explose() {
        const { ctx } = this;
        const step = this.explosionStep;
        let k = 0;
        let color = "#000";
        if (step <= 5) {
            color = "#F00";
            k = 25;
        } else if (step <= 10) {
            color = "#F33";
            k = 15;
        } else if (step <= 15) {
            color = "#F63";
            k = 10;
        } else if (step <= 25) {
            color = "#F66";
            k = 6;
        } else {
            const event = new CustomEvent("isOutOfZone", {
                detail: { type: "bomb", id: this.bombID },
            });
            this.canvas.dispatchEvent(event);
        }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(
            this.position.x,
            this.position.y + this.zoneSize.height / 15,
            this.zoneSize.width / k,
            Math.PI * 4,
            0,
            false
        );
        ctx.fill();
        ctx.closePath();
    }
}

export default Bomb;
