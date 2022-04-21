import Zone from "./zone";
import Gun from "./gun";

const zone = new Zone(document.querySelector(".container"));
const gun = new Gun(zone);

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.zoneSize = Zone.size;
    gun.display();
    requestAnimationFrame(draw);
})();
