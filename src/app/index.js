import Zone from "./zone";
import Radar from "./radar";
import Bomber from "./bomber";
import Gun from "./gun";

const zone = new Zone(document.querySelector(".container"));
const radar = new Radar(zone);
const bomber = new Bomber(zone);
const gun = new Gun(zone);

bomber.dropBombs();

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.zoneSize = Zone.size;
    gun.display();
    radar.display();
    requestAnimationFrame(draw);
})();
