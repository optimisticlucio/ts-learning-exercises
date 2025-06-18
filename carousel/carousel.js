const ALLOW_CAROUSEL_CYCLE = true;
const AUTOPLAY_TIME_IN_MILLISECONDS = 6000;

const carouselAutoplayIntervalMap = new Map();

function createCarousel(carouselName, ...carouselItems) {
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    const carouselTitle = document.createElement("h1");
    carouselTitle.classList.add("carousel-title");
    carouselTitle.innerText = carouselName ?? "Carousel Title Missing";

    const carouselContentHolder = generateCarouselContentHolder(carouselItems);
    const carouselLeftButton = document.createElement("button");
    carouselLeftButton.classList.add("carousel-button");
    carouselLeftButton.addEventListener("click", (e) => {
        slideCarouselItemsToLeft(carousel);
    });
    const carouselRightButton = document.createElement("button");
    carouselRightButton.classList.add("carousel-button");
    carouselRightButton.addEventListener("click", (e) => {
        slideCarouselItemsToRight(carousel);
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            slideCarouselItemsToRight(carousel);
        }
        else if (event.key === "ArrowLeft") {
            slideCarouselItemsToLeft(carousel);
        }
    });

    const carouselContentAndButtons = document.createElement("div");
    carouselContentAndButtons.classList.add("carousel-content-and-buttons");
    carouselContentAndButtons.append(carouselLeftButton, carouselContentHolder, carouselRightButton);

    const carouselDotHolder = generateCarouselDotHolder(carouselItems.length);

    carousel.append(carouselTitle, carouselContentAndButtons, carouselDotHolder);

    carousel.dataset.currentIndex = "0";
    hideAdjacentCarouselItems(carousel);
    updateLocationOfAdjacentCarouselItems(carousel);
    updateCarouselDots(carousel);

    carousel.addEventListener("transitionend", () => hideAdjacentCarouselItems(carousel, carouselContentHolder));

    carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
        slideCarouselItemsToRight(carousel);
    }, AUTOPLAY_TIME_IN_MILLISECONDS));

    return carousel;
}

// Goes over all items with the carousel class and turns them to proper carousels.
function generateCarousels() {
    const carousels = Array.from(document.querySelectorAll('.carousel'));

    for (let carousel of carousels) {
        carousel.replaceWith(createCarousel(carousel.dataset.title, ...Array.from(carousel.children)));
    }
}

function generateCarouselContentHolder(carouselContents) {
    const carouselContentHolder = document.createElement("div");
    carouselContentHolder.classList.add("carousel-content-holder");
    carouselContentHolder.append(...carouselContents);

    carouselContents.forEach((carouselItem) => {
        carouselItem.classList.add("hidden");
    });

    return carouselContentHolder;
}

function generateCarouselDotHolder(amountOfDots) {
    const carouselDotHolder = document.createElement("div");
    carouselDotHolder.classList.add("carousel-dot-holder");

    const carouselDot = document.createElement("div");
    carouselDot.classList.add("carousel-dot");

    for (let i = 0; i < amountOfDots; i++) {
        carouselDotHolder.append(carouselDot.cloneNode());
    }

    return carouselDotHolder;
}

function updateCarouselDots(carousel) {
    const currentIndexNumber = parseInt(carousel.dataset.currentIndex);
    const carouselDotHolder = carousel.getElementsByClassName("carousel-dot-holder")[0];
    const carouselDots = Array.from(carouselDotHolder.children);
    carouselDots.forEach((carouselItem) => carouselItem.classList.remove("selected"));
    carouselDots[currentIndexNumber].classList.add("selected");
}

function slideCarouselItemsToRight(carousel) {
    resetCarouselAutoplay(carousel);

    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getCurrentIndexPlusNumber(carousel,1)].classList.remove("hidden");

    // Nested animation frames to assure css animates the transition properly.
    requestAnimationFrame( () => {
        updateCurrentIndex(carousel, 1);
        requestAnimationFrame(() => {
            updateLocationOfAdjacentCarouselItems(carousel);
            updateCarouselDots(carousel);
        });
    });
}

function slideCarouselItemsToLeft(carousel) {
    resetCarouselAutoplay(carousel);

    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getCurrentIndexPlusNumber(carousel,-1)].classList.remove("hidden");

    requestAnimationFrame( () => {
        updateCurrentIndex(carousel, -1);

        requestAnimationFrame(() => {
            updateLocationOfAdjacentCarouselItems(carousel);
            updateCarouselDots(carousel);
        });
    });
}

function getCurrentIndexPlusNumber(carousel, number) {
    const currentIndexNumber = parseInt(carousel.dataset.currentIndex);
    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    const totalAmountOfItems = carouselContentHolder.children.length;

    if (!ALLOW_CAROUSEL_CYCLE && (currentIndexNumber === 0 || currentIndexNumber === totalAmountOfItems - 1)) {
        return currentIndexNumber;
    }

    return ((currentIndexNumber + number + totalAmountOfItems) % totalAmountOfItems);
}

function updateCurrentIndex(carousel, number) {
    carousel.dataset.currentIndex = getCurrentIndexPlusNumber(carousel, number).toString();
}

function updateLocationOfAdjacentCarouselItems(carousel){
    const currentIndex = parseInt(carousel.dataset.currentIndex);
    const rightItemIndex = getCurrentIndexPlusNumber(carousel, 1);
    const leftItemIndex = getCurrentIndexPlusNumber(carousel, -1);

    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    carouselContentHolder.children[rightItemIndex].style.left = "150%";
    carouselContentHolder.children[currentIndex].style.left = "50%";
    carouselContentHolder.children[leftItemIndex].style.left = "-50%";
}

function hideAdjacentCarouselItems(carousel) {
    const rightItemIndex = getCurrentIndexPlusNumber(carousel, 1);
    const currentItemIndex = getCurrentIndexPlusNumber(carousel, 0);
    const leftItemIndex = getCurrentIndexPlusNumber(carousel, -1);

    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    carouselContentHolder.children[rightItemIndex].classList.add("hidden");
    carouselContentHolder.children[currentItemIndex].classList.remove("hidden");
    carouselContentHolder.children[leftItemIndex].classList.add("hidden");
}

function resetCarouselAutoplay(carousel) {
    clearInterval(carouselAutoplayIntervalMap.get(carousel));
    carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
        slideCarouselItemsToRight(carousel);
    }, AUTOPLAY_TIME_IN_MILLISECONDS));
}

document.addEventListener('DOMContentLoaded', () => {
    generateCarousels();
});