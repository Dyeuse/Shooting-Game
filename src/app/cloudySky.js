class CloudySky {
    constructor(zone, cloudsImgSrc) {
        this.zone = zone;
        this.sizeZone = this.zone.constructor.size;
        this.sky = document.createElement("div");
        this.sky.style.height = `${this.sizeZone.height}px`;
        this.sky.style.width = `${this.sizeZone.width}px`;
        this.sky.classList.add("sky");
        this.zone.container.appendChild(this.sky);

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
}

/* function createCloudySky(cloudsImgSrc, zone) {
    const createSky = () => {
        const sky = document.createElement("div");
        sky.style.height = `${zone.constructor.size.height}px`;
        sky.style.width = `${zone.constructor.size.width}px`;
        sky.classList.add("sky");
        zone.container.appendChild(sky);
        return sky;
    };

    const createCloud = (cloudImgSrc, velocity, sky) => {
        const cloud = document.createElement("img");
        cloud.style = `--i: ${velocity}`;
        cloud.setAttribute("src", cloudImgSrc);
        sky.appendChild(cloud); // cloud.onload = () =>
        return cloud;
    };

    const sky = createSky();

    cloudsImgSrc.map((src, index) => createCloud(src, index + 1, sky));
} */

export default CloudySky;
