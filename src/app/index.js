import Zone from "./zone";
import Radar from "./radar";
import Bomber from "./bomber";
import Gun from "./gun";
import Sky from "./sky";
import cloudsPaths from "./utilities/cloudsPaths";
import propagateResizing from "./utilities/resizing";
import preventDbClick from "./utilities/nodbclick";
import Game from "./utilities/game";

const score = document.querySelector(".score");
const container = document.querySelector(".container");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const pause = document.querySelector("#pause");
const buttons = { start, reset, pause };

const zone = new Zone(container);
const radar = new Radar(zone, score);
const bomber = new Bomber(zone);
const gun = new Gun(zone);
const sky = new Sky(zone);

propagateResizing(zone);
sky.displayClouds(cloudsPaths);
preventDbClick(container);

(function newGame() {
    return new Game(zone, radar, bomber, gun, buttons);
})();
