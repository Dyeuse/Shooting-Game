import Zone from "./zone";
import Gun from "./gun";
import ProjectilesControler from "./projectilesControler";

const zone = new Zone(document.querySelector(".container"));
const gun = new Gun(zone);
const projectilesControler = new ProjectilesControler(zone);

(function draw() {
    zone.ctx.clearRect(0, 0, Zone.size.width, Zone.size.height);
    gun.zoneSize = Zone.size;
    gun.display();
    projectilesControler.displayBullets();
    // console.log(Object.keys(projectilesControler.bulletsInZone).length);
    requestAnimationFrame(draw);
})();
