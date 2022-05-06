import Zone from "./zone";
import Radar from "./radar";
import Bomber from "./bomber";
import Gun from "./gun";
import CloudySky from "./cloudySky";
import manageResizing from "./resizing";

const container = document.querySelector(".container");
const zone = new Zone(container);
const radar = new Radar(zone);
const bomber = new Bomber(zone);
const gun = new Gun(zone);
const cloudySky = new CloudySky(zone, [
    "media/cloud1.png",
    "media/cloud2.png",
    "media/cloud3.png",
    "media/cloud4.png",
    "media/cloud5.png",
    "media/cloud1.png",
    "media/cloud2.png",
    "media/cloud3.png",
    "media/cloud4.png",
    "media/cloud5.png",
]);

manageResizing(zone);

bomber.dropBombs();

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.display();
    radar.display();
    requestAnimationFrame(draw);
})();
