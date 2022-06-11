class Sky {
    constructor(zone) {
        this.sizeZone = zone.constructor.size;
        this.sky = document.createElement("div");
        this.sky.style.height = `${this.sizeZone.height}px`;
        this.sky.style.width = `${this.sizeZone.width}px`;
        this.sky.style.userSelect = "none";
        this.sky.classList.add("sky");
        zone.container.appendChild(this.sky);
        zone.container.addEventListener("resizeGame", this.#handleResizeGame);
    }

    #handleResizeGame = (event) => {
        this.sky.style.height = `${event.detail.height}px`;
        this.sky.style.width = `${event.detail.width}px`;
    };

    displayClouds(cloudsImgSrc) {
        cloudsImgSrc.map((cloudImgSrc, index) =>
            this.#createCloud(cloudImgSrc, index + 1)
        ); // index + 1 set an increasing speed for each clouds
    }

    #createCloud(cloudImgSrc, velocity) {
        const cloud = document.createElement("img");
        cloud.style = `--velocity: ${velocity}`;
        cloud.setAttribute("src", cloudImgSrc);
        this.sky.appendChild(cloud);
    }
}

export default Sky;
