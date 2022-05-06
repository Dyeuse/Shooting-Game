function manageResizing(zone) {
    window.addEventListener("resize", () => {
        const event = new CustomEvent("resizeGame", { detail: zone.constructor.size });
        zone.container.dispatchEvent(event);
    });
}

export default manageResizing;
