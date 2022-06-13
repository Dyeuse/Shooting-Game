function startGame(bomber) {
    const go = document.querySelector("#go");
    const reset = document.querySelector("#reset");
    const pause = document.querySelector("#pause");

    go.addEventListener("click", () => {
        go.style.display = "none";
        reset.style.display = "inline-block";
        pause.style.display = "inline-block";
        bomber.raid();
    });

    reset.addEventListener("click", () => {
        pause.innerHTML = "Pause";
        clearTimeout(bomber.raidInProgress);
        const event = new CustomEvent("resetRaid");
        bomber.canvas.dispatchEvent(event);
        bomber.raid();
    });

    pause.addEventListener("click", () => {
        pause.innerHTML = pause.innerHTML === "Play" ? "Pause" : "Play";
        const event = new CustomEvent("toggleRaid");
        bomber.canvas.dispatchEvent(event);
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            pause.innerHTML = "Play";
            const event = new CustomEvent("suspendRaid");
            bomber.canvas.dispatchEvent(event);
        }
    });
}

export default startGame;
