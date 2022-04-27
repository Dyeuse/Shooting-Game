import Zone from "./zone";
import Gun from "./gun";
import ProjectilesControler from "./projectilesControler";
import Bomber from "./bomber";

const zone = new Zone(document.querySelector(".container"));
const gun = new Gun(zone);
const bomber = new Bomber(zone);
const projectilesControler = new ProjectilesControler(zone);

bomber.dropBombs();

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.zoneSize = Zone.size;
    gun.display();
    projectilesControler.display();
    requestAnimationFrame(draw);
})();
