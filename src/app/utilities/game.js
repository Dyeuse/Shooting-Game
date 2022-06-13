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
        this.start.addEventListener("click", this.startGame);
        this.reset.addEventListener("click", this.resetGame);
        this.pause.addEventListener("click", this.pauseGame);
        document.addEventListener("visibilitychange", this.handleVisibilitychange);
    }

    startGame = () => {
        this.start.style.display = "none";
        this.reset.style.display = "inline-block";
        this.pause.style.display = "inline-block";
        this.draw();
        this.bomber.raid();
    };

    resetGame = () => {
        if (this.gameInPause) {
            this.#restart();
        }
        const event = new CustomEvent("resetRaid");
        this.bomber.canvas.dispatchEvent(event);
        this.bomber.raid();
    };

    pauseGame = () => {
        if (this.pause.innerHTML === "Pause") {
            this.#pause();
        } else {
            this.#restart();
        }
    };

    handleVisibilitychange = () => {
        if (document.visibilityState === "hidden") {
            this.#pause();
        }
    };

    draw = () => {
        if (!this.gameInPause) {
            const { width, height } = this.zone.constructor.size;
            this.zone.ctx.clearRect(0, 0, width, height);
            this.gun.displayGun();
            this.radar.displayRadar();
            this.radar.displayDashboard();
            this.drawID = requestAnimationFrame(this.draw);
        }
    };

    #restart() {
        this.gameInPause = false;
        this.pause.innerHTML = "Pause";
        const event = new CustomEvent("restartRaid");
        this.bomber.canvas.dispatchEvent(event);
        this.zone.canvas.style.pointerEvents = "auto";
        this.draw();
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
