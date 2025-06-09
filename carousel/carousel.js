// Goes over all items with the carousel class and turns them to proper carousels.
function generateCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    for (let carousel of carousels) {
        const carouselTitle = document.createElement("h1");
        carouselTitle.classList.add("carousel-title");
        carouselTitle.innerText = carousel.dataset.title ?? "Carousel Title Missing";

        const carouselContentHolder = generateCarouselContentHolder(carousel.children)

        const carouselContentAndButtons = document.createElement("div");
        carouselContentAndButtons.classList.add("carousel-content-and-buttons");
        carouselContentAndButtons.append(carouselContentHolder);

        // TODO: Add dots

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


generateCarousels();