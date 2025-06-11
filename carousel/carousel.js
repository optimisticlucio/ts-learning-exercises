// Goes over all items with the carousel class and turns them to proper carousels.
function generateCarousels() {
    const carousels = Array.from(document.querySelectorAll('.carousel'));

    for (let carousel of carousels) {
        const carouselTitle = document.createElement("h1");
        carouselTitle.classList.add("carousel-title");
        carouselTitle.innerText = carousel.dataset.title ?? "Carousel Title Missing";

        const carouselContentHolder = generateCarouselContentHolder(Array.from(carousel.children));
        const carouselLeftButton = document.createElement("button");
        carouselLeftButton.classList.add("carousel-button");
        carouselLeftButton.addEventListener("click", (e) => {
            moveCarouselToLeft(carousel, carouselContentHolder);
        });
        const carouselRightButton = document.createElement("button");
        carouselRightButton.classList.add("carousel-button");
        carouselRightButton.addEventListener("click", (e) => {
            moveCarouselToRight(carousel, carouselContentHolder);
        });

        const carouselContentAndButtons = document.createElement("div");
        carouselContentAndButtons.classList.add("carousel-content-and-buttons");
        carouselContentAndButtons.append(carouselLeftButton, carouselContentHolder, carouselRightButton);

        // TODO: Implement generateCarouselDotHolder and connect

        carousel.dataset.currentlyDisplaying = "0";
        carouselContentHolder.children[0].classList.remove("hidden");

        carousel.append(carouselTitle, carouselContentAndButtons)
    }
}

function generateCarouselContentHolder(carouselContents) {
    const carouselContentHolder = document.createElement("div");
    carouselContentHolder.classList.add("carousel-content-holder");
    carouselContentHolder.append(...carouselContents);

    carouselContents.forEach((carouselItem) => {
       // TODO
        carouselItem.classList.add("hidden");
    });

    return carouselContentHolder;
}

function generateCarouselDotHolder(amountOfDots) {
    // TODO: implement
}

function moveCarouselToRight(carousel, carouselContentHolder) {
    const carouselChildren = carouselContentHolder.children;
    carouselChildren[carousel.dataset.currentlyDisplaying].classList.add("hidden");
    carousel.dataset.currentlyDisplaying = ((parseInt(carousel.dataset.currentlyDisplaying) + 1 + carouselChildren.length) % carouselChildren.length).toString();
    carouselChildren[carousel.dataset.currentlyDisplaying].classList.remove("hidden");
}

function moveCarouselToLeft(carousel, carouselContentHolder) {
    const carouselChildren = carouselContentHolder.children;
    carouselChildren[carousel.dataset.currentlyDisplaying].classList.add("hidden");
    carousel.dataset.currentlyDisplaying = ((parseInt(carousel.dataset.currentlyDisplaying) - 1 + carouselChildren.length) % carouselChildren.length).toString();
    carouselChildren[carousel.dataset.currentlyDisplaying].classList.remove("hidden");
}

document.addEventListener('DOMContentLoaded', () => {
    generateCarousels();
});