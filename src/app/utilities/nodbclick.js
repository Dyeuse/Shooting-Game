function preventDbClick(container) {
    container.addEventListener("mousedown", (event) => {
        if (event.detail > 1) {
            event.preventDefault();
        }
    });
}

export default preventDbClick;
