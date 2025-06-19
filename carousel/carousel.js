const carouselAutoplayIntervalMap = new Map();

/*
    CarouselOptions may include:
        - allowCycle = Boolean. Default is true. Whether the carousel can loop over items or not.
        - showDots = Boolean. Default is true. Whether the dots are visible.
        - buttonStyle = String. Additional style to give each button.
        - carouselStyle = String. Additional style to give the carousel as a whole.
        - autoplayTimeInMs = Number. Default is 6000. The time for each carousel to autoplay in ms.
 */
function createCarousel(carouselName, carouselItems, carouselOptions) {
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    if (!carouselOptions) {
        carouselOptions = {}; // To not have to check for undefined all the time.
    }

    if ("carouselStyle" in carouselOptions &&
        typeof carouselOptions.carouselStyle === "string") {
        carousel.style = carouselOptions.carouselStyle;
    }

    const carouselTitle = document.createElement("h1");
    carouselTitle.classList.add("carousel-title");
    carouselTitle.innerText = carouselName ?? "Carousel Title Missing";

    if ("allowCycle" in carouselOptions &&
        typeof carouselOptions.allowCycle === "boolean" &&
        carouselOptions.allowCycle === false) {
        carousel.dataset.allowCycle = "false";
    }
    else {
        carousel.dataset.allowCycle = "true";
    }

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

    if ("buttonStyle" in carouselOptions &&
        typeof carouselOptions.buttonStyle === "string") {
        carouselRightButton.style = carouselOptions.buttonStyle;
        carouselLeftButton.style = carouselOptions.buttonStyle;
    }

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

    if ("showDots" in carouselOptions &&
        typeof carouselOptions.showDots === "boolean" &&
        carouselOptions.showDots === false) {
        carouselDotHolder.style.display = "none";
    }

    carousel.append(carouselTitle, carouselContentAndButtons, carouselDotHolder);

    carousel.dataset.currentIndex = "0";
    hideAdjacentCarouselItems(carousel);
    updateLocationOfAdjacentCarouselItems(carousel);
    updateCarouselDots(carousel);

    carousel.addEventListener("transitionend", () => hideAdjacentCarouselItems(carousel, carouselContentHolder));

    if ("autoplayTimeInMs" in carouselOptions &&
        typeof carouselOptions.autoplayTimeInMs === "number") {
        carousel.dataset.autoplayTimeInMs = carouselOptions.autoplayTimeInMs;
    }
    else {
        carousel.dataset.autoplayTimeInMs = "6000";
    }

    resetCarouselAutoplay(carousel);

    return carousel;
}

// Goes over all items with the carousel class and turns them to proper carousels.
function generateCarousels() {
    const carousels = Array.from(document.querySelectorAll('.carousel'));

    for (let carousel of carousels) {
        carousel.replaceWith(createCarousel(carousel.dataset.title, Array.from(carousel.children)));
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

function getCurrentIndexPlusNumber(carousel, number, checkAllowCycle = true) {
    const currentIndexNumber = parseInt(carousel.dataset.currentIndex);
    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    const totalAmountOfItems = carouselContentHolder.children.length;

    const ALLOW_CAROUSEL_CYCLE = carousel.dataset.allowCycle === "true";

    if (checkAllowCycle && !ALLOW_CAROUSEL_CYCLE &&
        (currentIndexNumber + number < 0 || currentIndexNumber + number > totalAmountOfItems)   ) {
        return currentIndexNumber;
    }

    return ((currentIndexNumber + number + totalAmountOfItems) % totalAmountOfItems);
}

function updateCurrentIndex(carousel, number) {
    carousel.dataset.currentIndex = getCurrentIndexPlusNumber(carousel, number).toString();
}

function updateLocationOfAdjacentCarouselItems(carousel){
    const currentIndex = parseInt(carousel.dataset.currentIndex);
    const rightItemIndex = getCurrentIndexPlusNumber(carousel, 1, false);
    const leftItemIndex = getCurrentIndexPlusNumber(carousel, -1, false);

    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    carouselContentHolder.children[rightItemIndex].style.left = "150%";
    carouselContentHolder.children[currentIndex].style.left = "50%";
    carouselContentHolder.children[leftItemIndex].style.left = "-50%";
}

function hideAdjacentCarouselItems(carousel) {
    const rightItemIndex = getCurrentIndexPlusNumber(carousel, 1, false);
    const currentItemIndex = getCurrentIndexPlusNumber(carousel, 0, false);
    const leftItemIndex = getCurrentIndexPlusNumber(carousel, -1, false);

    const carouselContentHolder = carousel.getElementsByClassName("carousel-content-holder")[0];
    carouselContentHolder.children[rightItemIndex].classList.add("hidden");
    carouselContentHolder.children[currentItemIndex].classList.remove("hidden");
    carouselContentHolder.children[leftItemIndex].classList.add("hidden");
}

function resetCarouselAutoplay(carousel) {
    clearInterval(carouselAutoplayIntervalMap.get(carousel));

    let autoplayTime = parseInt(carousel.dataset.autoplayTimeInMs);

    carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
        slideCarouselItemsToRight(carousel);
    }, autoplayTime));
}

document.addEventListener('DOMContentLoaded', () => {
    generateCarousels();
});