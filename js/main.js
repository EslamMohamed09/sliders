let currentIndex = 0;
let slidesToShow = 1;
let slidesToScroll = 1;
let slides;
let sliderContainer;
let dotsWrapper;

function setupSlider(carouselContainer) {
    sliderContainer = document.querySelector(carouselContainer);
    slides = sliderContainer.children;
    sliderContainer.style.display = 'flex';
    sliderContainer.style.overflow = 'hidden';
    sliderContainer.style.scrollBehavior = 'smooth';
    updateSlidesToShow();
}

function calculateGapSize() {
    const tinyScreen = window.innerWidth < 400;
    const smallScreen = window.innerWidth > 400 && window.innerWidth < 500;
    const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
    const tabScreen = window.innerWidth > 650 && window.innerWidth < 1000;
    const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;

    return tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.7
         : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3
         : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.9
         : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.8
         : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.7
         : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.4;
}

function buildDots(dotsSelector) {
    dotsWrapper = document.querySelector(dotsSelector);
    dotsWrapper.innerHTML = '';

    // Calculate the number of dots based on the number of scrollable positions
    const totalDots = Math.ceil(slides.length / slidesToScroll);

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dotsWrapper.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    if (dotsWrapper) {
        const dots = dotsWrapper.children;
        const activeDotIndex = Math.floor(currentIndex / slidesToScroll);
        Array.from(dots).forEach(dot => dot.classList.remove('active'));
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }
}

function setResponsive(responsiveSettings) {
    responsiveSettings.forEach((resp) => {
        if (window.innerWidth >= resp.breakpoint) {
            slidesToShow = resp.settings.slidesToShow;
            slidesToScroll = resp.settings.slidesToScroll;
        }
    });
    updateSlidesToShow();
    buildDots('#featureddots'); // Rebuild dots based on new settings
}

function updateSlidesToShow() {
    const wrapperWidth = sliderContainer.clientWidth;

    const gapSize =  calculateGapSize();
    const slideWidth = Math.floor((wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow); // Adjust for the gap between slides
    
    for (let i = 0; i < slides.length; i++) {
         slides[i].style.flex = `0 0 ${slideWidth}px`;
         slides[i].style.maxWidth = `${slideWidth}px`;
    }
}

function updateDots() {
    if (dotsWrapper) {
        const dots = dotsWrapper.children;
        const activeDotIndex = Math.floor(currentIndex / slidesToScroll);
        Array.from(dots).forEach(dot => dot.classList.remove('active'));
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }
}

function updateSliderPosition() {
    const wrapperWidth = sliderContainer.clientWidth;

    // Calculate the gap size using the existing logic
    const gapSize = calculateGapSize();
    const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
    const scrollPosition = currentIndex * (slideWidth + gapSize); // Account for gap

    sliderContainer.scrollTo({ // Scroll to the calculated position
        left: scrollPosition,
        behavior: 'smooth'
    });

    updateDots();

    // Check if currentIndex exceeds the number of slides
    if (currentIndex >= slides.length) { 
        currentIndex = 0; // Reset to the first slide
        sliderContainer.scrollTo({ left: 0 });
    }
}


function nextSlide() {
    currentIndex += slidesToScroll;
    if (currentIndex >= slides.length) {
        currentIndex = 0; // Loop back to the first slide
    }
    updateSliderPosition();
    updateDots();
}

function prevSlide() {
    currentIndex -= slidesToScroll;
    if (currentIndex < 0) {
        currentIndex = 0; // Reset to the first slide if going back from the first set
    }
    updateSliderPosition();
    updateDots(); // Ensure the correct dot is active
}

function updateSliderPosition() {
    const wrapperWidth = sliderContainer.clientWidth;
    const gapSize = calculateGapSize();
    const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
    const scrollPosition = currentIndex * (slideWidth + gapSize); // Account for gap

    sliderContainer.scrollTo({ // Scroll to the calculated position
        left: scrollPosition,
        behavior: 'smooth'
    });

    updateDots(); // Update the active dot

    if (currentIndex >= slides.length) {
        currentIndex = 0; // Loop back to the first slide
        sliderContainer.scrollTo({ left: 0 });
    }
}

function attachEvents(prevArrowSelector, nextArrowSelector) {
    const prevButton = document.querySelector(prevArrowSelector);
    const nextButton = document.querySelector(nextArrowSelector);

    prevButton.addEventListener('click', prevSlide);

    nextButton.addEventListener('click', nextSlide);

    window.addEventListener('resize', () => setResponsive(responsiveSettings));

    if (dotsWrapper) {
        Array.from(dotsWrapper.children).forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.dataset.index) * slidesToScroll;
                updateSliderPosition();
            });
        });
    }
}

function autoSlide(autoplaySpeed) {
    setInterval(nextSlide, autoplaySpeed || 3000);
}

const responsiveSettings = [
    {
        breakpoint: 10,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 350,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        }
    },
    {
        breakpoint: 650,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
        }
    },
    {
        breakpoint: 1100,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
        }
    },
    {
        breakpoint: 1300,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
        }
    }
];

const productName = document.querySelectorAll(".product-name");

productName.forEach((proName) => { 
    proName.textContent = proName.textContent.split(" ").slice(0,3).join(" ");
});


// Usage:
setupSlider('.slides-container');
buildDots('#featureddots');

setResponsive(responsiveSettings);
attachEvents('.arrow-left', '.arrow-right');