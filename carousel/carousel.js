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

        carousel.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                moveCarouselToRight(carousel, carouselContentHolder);
            }
            else if (event.key === "ArrowLeft") {
                moveCarouselToLeft(carousel, carouselContentHolder);
            }
        });


        const carouselContentAndButtons = document.createElement("div");
        carouselContentAndButtons.classList.add("carousel-content-and-buttons");
        carouselContentAndButtons.append(carouselLeftButton, carouselContentHolder, carouselRightButton);

        // TODO: Implement generateCarouselDotHolder and connect

        carousel.dataset.currentlyDisplaying = "0";
        carouselContentHolder.children[0].classList.remove("hidden");
        updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);

        carousel.addEventListener("transitionend", () => hideAdjacentCarouselItems(carousel, carouselContentHolder));

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
    carouselChildren[getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder,1)].classList.remove("hidden");

    updateCurrentlyDisplaying(carousel, carouselContentHolder, 1);
    updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);
}

function moveCarouselToLeft(carousel, carouselContentHolder) {
    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder,-1)].classList.remove("hidden");

    updateCurrentlyDisplaying(carousel, carouselContentHolder,-1);
    updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);
}

function getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, number) {
    return ((parseInt(carousel.dataset.currentlyDisplaying) + number + carouselContentHolder.children.length) % carouselContentHolder.children.length);
}

function updateCurrentlyDisplaying(carousel, carouselContentHolder, number) {
    carousel.dataset.currentlyDisplaying = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, number).toString();
}

function updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder){
    const currentlyDisplaying = parseInt(carousel.dataset.currentlyDisplaying);
    const rightItemIndex = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, 1);
    const leftItemIndex = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, -1);

    carouselContentHolder.children[rightItemIndex].left = "150%";
    carouselContentHolder.children[currentlyDisplaying].left = "50%";
    carouselContentHolder.children[leftItemIndex].left = "-50%";
}

function hideAdjacentCarouselItems(carousel) {
    const rightItemIndex = getIncrementOfCurrentlyDisplaying(carousel, 1);
    const leftItemIndex = getIncrementOfCurrentlyDisplaying(carousel, -1);

    carousel.children[rightItemIndex].classList.add("hidden");
    carousel.children[leftItemIndex].classList.add("hidden");
}

document.addEventListener('DOMContentLoaded', () => {
    generateCarousels();
});