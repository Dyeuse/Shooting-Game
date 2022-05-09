class Bomb {
    bombID = Date.now();

    intercepted = false;

    explosionStep = 0;

    constructor(zone, position, velocity) {
        Object.assign(this, zone);
        this.zone = zone;
        this.position = position;
        this.velocity = velocity;
        this.unity = zone.constructor.size.width / 100;
        this.container.addEventListener("resizeGame", this.handleResizeGame);
    }

    handleResizeGame = (event) => {
        this.unity = event.detail.width / 100;
    };

    get detonatorPosition() {
        return {
            x: this.position.x,
            y: this.position.y + this.unity * 15,
        };
    }

    displayBomb() {
        if (this.explosionStep < 5) {
            this.#drawWings();
            this.#drawTail();
            this.#drawBody();
            this.#drawSymbol();
        }
    }

    displayExplosion() {
        const {
            ctx,
            unity,
            explosionStep: step,
            position: { x, y },
        } = this;
        let k = 0;
        let color = "#000";
        if (step <= 5) {
            color = "#F00";
            k = 6;
        } else if (step <= 10) {
            color = "#F33";
            k = 10;
        } else if (step <= 15) {
            color = "#F63";
            k = 15;
        } else if (step <= 25) {
            color = "#F66";
            k = 25;
        } else {
            this.#isDestroyed();
        }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y + unity * 15, unity * k, Math.PI * 4, 0, false);
        ctx.fill();
        ctx.closePath();
    }

    moveBomb() {
        if (
            this.intercepted ||
            this.zone.constructor.isOutOfZone(this.detonatorPosition)
        ) {
            this.explosionStep += 1;
            this.displayExplosion();
        } else {
            this.position.y += this.velocity;
        }
    }

    #drawWings() {
        const {
            ctx,
            unity,
            position: { x, y },
        } = this;
        ctx.beginPath();
        ctx.fillStyle = "#403D39";
        ctx.moveTo(x, y + 6 * unity);
        ctx.lineTo(x - 3 * unity, y + 5 * unity);
        ctx.lineTo(x - 3 * unity, y);
        ctx.lineTo(x, y + 3 * unity);
        ctx.lineTo(x + 3 * unity, y);
        ctx.lineTo(x + 3 * unity, y + 5 * unity);
        ctx.lineTo(x, y + 6 * unity);
        ctx.fill();
        ctx.closePath();
    }

    #drawTail() {
        const {
            ctx,
            unity,
            position: { x, y },
        } = this;
        ctx.beginPath();
        ctx.strokeStyle = "#252422";
        ctx.lineWidth = unity;
        ctx.moveTo(x, y + unity);
        ctx.lineTo(x, y + 10 * unity);
        ctx.stroke();
        ctx.closePath();
    }

    #drawBody() {
        const {
            ctx,
            unity,
            position: { x, y },
        } = this;
        ctx.beginPath();
        ctx.fillStyle = "#403D39";
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

    #drawSymbol() {
        const {
            ctx,
            unity,
            position: { x, y },
        } = this;
        ctx.beginPath();
        ctx.strokeStyle = "#CCC5B9";
        ctx.moveTo(x + 1.5 * unity, y + 10 * unity);
        ctx.lineTo(x - 1.5 * unity, y + 12 * unity);
        ctx.moveTo(x + 1.5 * unity, y + 13 * unity);
        ctx.lineTo(x - 1.5 * unity, y + 15 * unity);
        ctx.stroke();
        ctx.closePath();
    }

    #isDestroyed() {
        const event = new CustomEvent("isOutOfZone", {
            detail: { type: "bomb", id: this.bombID },
        });
        this.canvas.dispatchEvent(event);
    }
}

export default Bomb;
