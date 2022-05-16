function startGame(bomber) {
    const start = document.querySelector("button");

    start.addEventListener("click", () => {
        if (bomber.raidInProgress) {
            clearTimeout(bomber.raidInProgress);
            const event = new CustomEvent("resetRadar");
            bomber.canvas.dispatchEvent(event);
        }
        bomber.raid();
    });
}

export default startGame;
