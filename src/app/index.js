import Zone from "./zone";
import Radar from "./radar";
import Bomber from "./bomber";
import Gun from "./gun";
import Sky from "./sky";
import pathsClouds from "./utilities/pathsClouds";
import propagateResizing from "./utilities/resizing";

const container = document.querySelector(".container");
const start = document.querySelector("button");
const zone = new Zone(container);
const radar = new Radar(zone);
const bomber = new Bomber(zone);
const gun = new Gun(zone);
const sky = new Sky(zone);

propagateResizing(zone);
sky.displayClouds(pathsClouds);

start.addEventListener("click", () => {
    if (bomber.raidInProgress) {
        clearTimeout(bomber.raidInProgress);
        radar.bulletsInZone = {};
        radar.bombsInZone = {};
        radar.droppedBombs = 0;
        radar.interceptedBombs = 0;
    }
    bomber.raid();
});

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.displayGun();
    radar.displayRadar();
    radar.displayDashboard();
    requestAnimationFrame(draw);
})();
