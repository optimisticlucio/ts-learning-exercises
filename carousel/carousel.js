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
        hideAdjacentCarouselItems(carousel, carouselContentHolder);
        updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);

        carousel.addEventListener("transitionend", () => hideAdjacentCarouselItems(carousel, carouselContentHolder));

        carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
            moveCarouselToRight(carousel, carouselContentHolder);
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

function moveCarouselToRight(carousel, carouselContentHolder) {
    resetCarouselAutoplay(carousel, carouselContentHolder);

    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder,1)].classList.remove("hidden");

    // Nested animation frames to assure css animates the transition properly.
    requestAnimationFrame( () => {
        updateCurrentlyDisplaying(carousel, carouselContentHolder, 1);
        requestAnimationFrame(() => {
            updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);
        });
    });
}

function moveCarouselToLeft(carousel, carouselContentHolder) {
    resetCarouselAutoplay(carousel, carouselContentHolder);

    const carouselChildren = carouselContentHolder.children;
    carouselChildren[getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder,-1)].classList.remove("hidden");

    requestAnimationFrame( () => {
        updateCurrentlyDisplaying(carousel, carouselContentHolder, -1);

        requestAnimationFrame(() => {
            updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder);
        });
    });
}

function getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, number) {
    const currentIndexNumber = parseInt(carousel.dataset.currentlyDisplaying);
    const totalAmountOfItems = carouselContentHolder.children.length;

    if (!ALLOW_CAROUSEL_CYCLE && (currentIndexNumber === 0 || currentIndexNumber === totalAmountOfItems - 1)) {
        return currentIndexNumber;
    }

    return ((currentIndexNumber + number + totalAmountOfItems) % totalAmountOfItems);
}

function updateCurrentlyDisplaying(carousel, carouselContentHolder, number) {
    carousel.dataset.currentlyDisplaying = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, number).toString();
}

function updateLocationOfAdjacentCarouselItems(carousel, carouselContentHolder){
    const currentlyDisplaying = parseInt(carousel.dataset.currentlyDisplaying);
    const rightItemIndex = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, 1);
    const leftItemIndex = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, -1);

    carouselContentHolder.children[rightItemIndex].style.left = "150%";
    carouselContentHolder.children[currentlyDisplaying].style.left = "50%";
    carouselContentHolder.children[leftItemIndex].style.left = "-50%";
}

function hideAdjacentCarouselItems(carousel, carouselContentHolder) {
    const rightItemIndex = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, 1);
    const currentItemIndex = getIncrementOfCurrentlyDisplaying(carousel, carouselContentHolder, 0);
    const leftItemIndex = getIncrementOfCurrentlyDisplaying(carousel,carouselContentHolder, -1);

    carouselContentHolder.children[rightItemIndex].classList.add("hidden");
    carouselContentHolder.children[currentItemIndex].classList.remove("hidden");
    carouselContentHolder.children[leftItemIndex].classList.add("hidden");
}

function resetCarouselAutoplay(carousel, carouselContentHolder) {
    clearInterval(carouselAutoplayIntervalMap.get(carousel));
    carouselAutoplayIntervalMap.set(carousel, setInterval(() => {
        moveCarouselToRight(carousel, carouselContentHolder);
    }, AUTOPLAY_TIME_IN_MILLISECONDS));
}

document.addEventListener('DOMContentLoaded', () => {
    generateCarousels();
});