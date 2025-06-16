const ALLOW_CAROUSEL_CYCLE = true;
const AUTOPLAY_TIME_IN_MILLISECONDS = 6000;

const carouselAutoplayIntervalMap = new Map();

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
            slideCarouselItemsToLeft(carousel, carouselContentHolder);
        });
        const carouselRightButton = document.createElement("button");
        carouselRightButton.classList.add("carousel-button");
        carouselRightButton.addEventListener("click", (e) => {
            slideCarouselItemsToRight(carousel, carouselContentHolder);
        });

        carousel.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                slideCarouselItemsToRight(carousel, carouselContentHolder);
            }
            else if (event.key === "ArrowLeft") {
                slideCarouselItemsToLeft(carousel, carouselContentHolder);
            }
        });

        const carouselContentAndButtons = document.createElement("div");
        carouselContentAndButtons.classList.add("carousel-content-and-buttons");
        carouselContentAndButtons.append(carouselLeftButton, carouselContentHolder, carouselRightButton);

        // TODO: Implement generateCarouselDotHolder and connect

        carousel.dataset.currentIndex = "0";
        hideAdjacentCarouselItems(carousel, carouselContentHolder);
        updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);

        carousel.addEventListener("transitionend", () => hideAdjacentCarouselItems(carousel, carouselContentHolder));

        carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
            slideCarouselItemsToRight(carousel, carouselContentHolder);
        }, AUTOPLAY_TIME_IN_MILLISECONDS));

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

function slideCarouselItemsToRight(carousel, carouselContentHolder) {
    resetCarouselAutoplay(carousel, carouselContentHolder);

    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getCurrentIndexPlusNumber(carousel, carouselContentHolder,1)].classList.remove("hidden");

    // Nested animation frames to assure css animates the transition properly.
    requestAnimationFrame( () => {
        updateCurrentIndex(carousel, carouselContentHolder, 1);
        requestAnimationFrame(() => {
            updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);
        });
    });
}

function slideCarouselItemsToLeft(carousel, carouselContentHolder) {
    resetCarouselAutoplay(carousel, carouselContentHolder);

    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getCurrentIndexPlusNumber(carousel, carouselContentHolder,-1)].classList.remove("hidden");

    requestAnimationFrame( () => {
        updateCurrentIndex(carousel, carouselContentHolder, -1);

        requestAnimationFrame(() => {
            updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);
        });
    });
}

function getCurrentIndexPlusNumber(carousel, carouselContentHolder, number) {
    const currentIndexNumber = parseInt(carousel.dataset.currentIndex);
    const totalAmountOfItems = carouselContentHolder.children.length;

    if (!ALLOW_CAROUSEL_CYCLE && (currentIndexNumber === 0 || currentIndexNumber === totalAmountOfItems - 1)) {
        return currentIndexNumber;
    }

    return ((currentIndexNumber + number + totalAmountOfItems) % totalAmountOfItems);
}

function updateCurrentIndex(carousel, carouselContentHolder, number) {
    carousel.dataset.currentIndex = getCurrentIndexPlusNumber(carousel, carouselContentHolder, number).toString();
}

function updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder){
    const currentIndex = parseInt(carousel.dataset.currentIndex);
    const rightItemIndex = getCurrentIndexPlusNumber(carousel, carouselContentHolder, 1);
    const leftItemIndex = getCurrentIndexPlusNumber(carousel, carouselContentHolder, -1);

    carouselContentHolder.children[rightItemIndex].style.left = "150%";
    carouselContentHolder.children[currentIndex].style.left = "50%";
    carouselContentHolder.children[leftItemIndex].style.left = "-50%";
}

function hideAdjacentCarouselItems(carousel, carouselContentHolder) {
    const rightItemIndex = getCurrentIndexPlusNumber(carousel, carouselContentHolder, 1);
    const currentItemIndex = getCurrentIndexPlusNumber(carousel, carouselContentHolder, 0);
    const leftItemIndex = getCurrentIndexPlusNumber(carousel,carouselContentHolder, -1);

    carouselContentHolder.children[rightItemIndex].classList.add("hidden");
    carouselContentHolder.children[currentItemIndex].classList.remove("hidden");
    carouselContentHolder.children[leftItemIndex].classList.add("hidden");
}

function resetCarouselAutoplay(carousel, carouselContentHolder) {
    clearInterval(carouselAutoplayIntervalMap.get(carousel));
    carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
        slideCarouselItemsToRight(carousel, carouselContentHolder);
    }, AUTOPLAY_TIME_IN_MILLISECONDS));
}

document.addEventListener('DOMContentLoaded', () => {
    generateCarousels();
});