import Zone from "./zone";

const zone = new Zone(document.querySelector(".container"));

(function draw() {
    zone.ctx.clearRect(0, 0, zone.size.width, zone.size.height);
    requestAnimationFrame(draw);
})();
