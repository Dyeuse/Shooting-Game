import Zone from "./zone";
import Radar from "./radar";
import Bomber from "./bomber";
import Gun from "./gun";
import Sky from "./sky";
import pathsClouds from "./pathsClouds";
import manageResizing from "./resizing";

const container = document.querySelector(".container");
const zone = new Zone(container);
const radar = new Radar(zone);
const bomber = new Bomber(zone);
const gun = new Gun(zone);
const sky = new Sky(zone);

manageResizing(zone);
sky.displayClouds(pathsClouds);
bomber.raid();

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.display();
    radar.display();
    requestAnimationFrame(draw);
})();
