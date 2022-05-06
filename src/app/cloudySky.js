class CloudySky {
    constructor(zone, cloudsImgSrc) {
        this.zone = zone;
        this.sizeZone = this.zone.constructor.size;
        this.sky = document.createElement("div");
        this.sky.style.height = `${this.sizeZone.height}px`;
        this.sky.style.width = `${this.sizeZone.width}px`;
        this.sky.classList.add("sky");
        this.zone.container.appendChild(this.sky);
        this.zone.container.addEventListener(
            "resizeGame",
            this.#handleResizeGame.bind(this)
        );

        cloudsImgSrc.map((cloudImgSrc, velocity) =>
            this.#createCloud(cloudImgSrc, velocity + 1)
        );
    }

    #createCloud(cloudImgSrc, velocity) {
        const cloud = document.createElement("img");
        cloud.style = `--i: ${velocity}`;
        cloud.setAttribute("src", cloudImgSrc);
        this.sky.appendChild(cloud);
    }

    #handleResizeGame(event) {
        this.sky.style.height = `${event.detail.height}px`;
        this.sky.style.width = `${event.detail.width}px`;
    }
}

export default CloudySky;
