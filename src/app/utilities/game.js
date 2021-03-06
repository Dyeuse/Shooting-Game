class Game {
    gameInPause = false;

    drawID = 0;

    constructor(zone, radar, bomber, gun, buttons) {
        this.zone = zone;
        this.radar = radar;
        this.bomber = bomber;
        this.gun = gun;
        this.start = buttons.start;
        this.reset = buttons.reset;
        this.pause = buttons.pause;
        this.zone.canvas.style.pointerEvents = "none";
        this.start.addEventListener("click", this.#startGame);
        this.reset.addEventListener("click", this.#resetGame);
        this.pause.addEventListener("click", this.#pauseGame);
        document.addEventListener("visibilitychange", this.#handleVisibilitychange);
        this.zone.canvas.addEventListener("endOfTheRaid", this.#handleEndOfTheRaid);
    }

    #startGame = () => {
        this.start.style.display = "none";
        this.reset.style.display = "inline-block";
        this.pause.style.display = "inline-block";
        this.zone.canvas.style.pointerEvents = "auto";
        const event = new CustomEvent("startOfTheRaid");
        this.bomber.canvas.dispatchEvent(event);
        this.#draw();
        this.bomber.raid();
    };

    #resetGame = () => {
        if (this.gameInPause) {
            this.#restart();
        }
        const event = new CustomEvent("resetRaid");
        this.bomber.canvas.dispatchEvent(event);
        this.bomber.raid();
    };

    #pauseGame = () => {
        if (this.pause.innerHTML === "Pause") {
            this.#pause();
        } else {
            this.#restart();
        }
    };

    #handleVisibilitychange = () => {
        if (
            document.visibilityState === "hidden" &&
            this.start.style.display === "none"
        ) {
            this.#pause();
        }
    };

    #handleEndOfTheRaid = () => {
        const idIterval = setInterval(() => {
            if (Object.keys(this.radar.bombsInZone).length === 0) {
                this.#resetData();
                clearInterval(idIterval);
            }
        }, 100);
    };

    #draw = () => {
        if (!this.gameInPause) {
            const { width, height } = this.zone.constructor.size;
            this.zone.ctx.clearRect(0, 0, width, height);
            this.gun.displayGun();
            this.radar.displayRadar();
            this.drawID = requestAnimationFrame(this.#draw);
        }
    };

    #resetData() {
        setTimeout(() => {
            this.gameInPause = false;
            this.pause.innerHTML = "Pause";
            this.start.style.display = "inline-block";
            this.reset.style.display = "none";
            this.pause.style.display = "none";
            this.zone.canvas.style.pointerEvents = "none";
            cancelAnimationFrame(this.drawID);
        }, 1500);
    }

    #restart() {
        this.gameInPause = false;
        this.pause.innerHTML = "Pause";
        const event = new CustomEvent("restartRaid");
        this.bomber.canvas.dispatchEvent(event);
        this.zone.canvas.style.pointerEvents = "auto";
        this.#draw();
    }

    #pause() {
        cancelAnimationFrame(this.drawID);
        this.gameInPause = true;
        this.pause.innerHTML = "Play";
        const event = new CustomEvent("suspendRaid");
        this.bomber.canvas.dispatchEvent(event);
        this.zone.canvas.style.pointerEvents = "none";
    }
}

export default Game;
