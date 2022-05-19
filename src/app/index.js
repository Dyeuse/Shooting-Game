import Zone from "./zone";
import Radar from "./radar";
import Bomber from "./bomber";
import Gun from "./gun";
import Sky from "./sky";
import cloudsPaths from "./utilities/cloudsPaths";
import propagateResizing from "./utilities/resizing";
import startGame from "./utilities/startGame";

const container = document.querySelector(".container");
const zone = new Zone(container);
const radar = new Radar(zone);
const bomber = new Bomber(zone);
const gun = new Gun(zone);
const sky = new Sky(zone);

propagateResizing(zone);
sky.displayClouds(cloudsPaths);
startGame(bomber);

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.displayGun();
    radar.displayRadar();
    radar.displayDashboard();
    requestAnimationFrame(draw);
})();
