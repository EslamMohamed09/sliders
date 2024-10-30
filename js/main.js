function initializeSlider(options) {
    const {
        containerSelector = '.slides-container',
        dotsSelector = '#sliderdots',
        prevArrowSelector = '.arrow-left',
        nextArrowSelector = '.arrow-right',
        slidesToShowDefault = 1,
        slidesToScrollDefault = 1,
        autoplaySpeed = 3000
    } = options;

    let currentIndex = 0;
    let slidesToShow = slidesToShowDefault;
    let slidesToScroll = slidesToScrollDefault;
    let slides;
    let sliderContainer = document.querySelector(containerSelector);
    let dotsWrapper = document.querySelector(dotsSelector);

    function setupSlider() {
        slides = sliderContainer.children;
        sliderContainer.style.display = 'flex';
        sliderContainer.style.overflow = 'hidden';
        sliderContainer.style.scrollBehavior = 'smooth';
        updateSlidesToShow();
    }

    function buildDots() {
        dotsWrapper.innerHTML = '';
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
        const dots = dotsWrapper.children;
        const activeDotIndex = Math.floor(currentIndex / slidesToScroll);
        Array.from(dots).forEach(dot => dot.classList.remove('active'));
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 355, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 650, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1300, settings: { slidesToShow: 5, slidesToScroll: 5 }}
        ];

        responsiveSettings.forEach(resp => {
            if (window.innerWidth >= resp.breakpoint) {
                slidesToShow = resp.settings.slidesToShow;
                slidesToScroll = resp.settings.slidesToScroll;
            }
        });
        updateSlidesToShow();
        buildDots();
    }

    function updateSlidesToShow() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 349;
        const mobileTinyScreen = window.innerWidth > 349 && window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth > 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
    
        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 0
                      : mobileTinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 10.2
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.2
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.8
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.7
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.1;
        
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 251;
        const mobileScreen1 = window.innerWidth < 260;
        const mobileScreen2 = window.innerWidth < 269;
        const mobileScreen3 = window.innerWidth < 271;
        const mobileScreen4 = window.innerWidth < 273;
        const mobileScreen5 = window.innerWidth < 277;
        const mobileScreen6 = window.innerWidth < 283;
        const mobileScreen7 = window.innerWidth < 287;
        const mobileScreen8 = window.innerWidth <= 290;
        const mobileScreen9 = window.innerWidth < 302;
        const mobileScreen10 = window.innerWidth < 309;
        const mobileScreen11 = window.innerWidth < 313;
        const mobileScree12 = window.innerWidth < 318;
        const mobileScree13 = window.innerWidth < 322;
        const mobileScreen14 = window.innerWidth < 324;
        const mobileScreen15 = window.innerWidth < 332;
        const mobileScreen16 = window.innerWidth < 337;
        const mobileScreen17 = window.innerWidth < 345;
        const mobileScreen18 = window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth >= 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
        const lMediumScreen = window.innerWidth > 1100 && window.innerWidth < 1150;

        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen1 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScreen2 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScreen3 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.3
                      : mobileScreen4 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.85
                      : mobileScreen5 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mobileScreen6 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen7 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : mobileScreen8 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen9 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.6
                      : mobileScreen10 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.25
                      : mobileScreen11 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScree12 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScree13 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.4
                      : mobileScreen14 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.25
                      : mobileScreen15 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen16 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.85
                      : mobileScreen17 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.11
                      : mobileScreen18 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.5
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.65
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : lMediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.2
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9;

        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        const scrollPosition = currentIndex * (slideWidth + gapSize);
    
        function animateScroll(start, end, duration) {
            let startTime = null;
    
            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, start, end - start, duration);
    
                sliderContainer.scrollLeft = run;
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
    
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
    
            requestAnimationFrame(animation);
        }
    
        animateScroll(sliderContainer.scrollLeft, scrollPosition, 600);
    
        updateDots();
    
        if (currentIndex >= slides.length) {
            currentIndex = 0;
            sliderContainer.scrollTo({ left: 0 });
        }
    }

    function nextSlide() {
        currentIndex += slidesToScroll;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        scrollToSlide();
    }

    function prevSlide() {
        currentIndex -= slidesToScroll;
        if (currentIndex < 0) {
            currentIndex = slides.length - (slides.length % slidesToScroll || slidesToScroll);
        }
        scrollToSlide();
    }

    function attachEvents() {
        const prevButton = document.querySelector(prevArrowSelector);
        const nextButton = document.querySelector(nextArrowSelector);

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        window.addEventListener('resize', setResponsive);

        Array.from(dotsWrapper.children).forEach(dot => {
            dot.addEventListener('click', e => {
                currentIndex = parseInt(e.target.dataset.index) * slidesToScroll;
                scrollToSlide();
            });
        });
    }

    function autoSlide() {
        setInterval(nextSlide, autoplaySpeed);
    }

    setupSlider();
    buildDots();
    setResponsive();
    attachEvents();
    // autoSlide();
}

initializeSlider({
    containerSelector:'.slider1-section .slider-container',
    dotsSelector:'.slider1-section #sliderdots',
    prevArrowSelector:'.slider1-section .arrow-left',
    nextArrowSelector:'.slider1-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


function initializeSlider2(options) {
    const {
        containerSelector = '.slides-container',
        dotsSelector = '#sliderdots',
        prevArrowSelector = '.arrow-left',
        nextArrowSelector = '.arrow-right',
        slidesToShowDefault = 1,
        slidesToScrollDefault = 1,
        autoplaySpeed = 3000
    } = options;

    let currentIndex = 0;
    let slidesToShow = slidesToShowDefault;
    let slidesToScroll = slidesToScrollDefault;
    let slides;
    let sliderContainer = document.querySelector(containerSelector);
    let dotsWrapper = document.querySelector(dotsSelector);
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    function setupSlider() {
        slides = sliderContainer.children;
        sliderContainer.style.display = 'flex';
        sliderContainer.style.overflow = 'hidden';
        updateSlidesToShow();
    }

    function buildDots() {
        dotsWrapper.innerHTML = '';
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
        const dots = dotsWrapper.children;
        const activeDotIndex = Math.floor(currentIndex / slidesToScroll);
        Array.from(dots).forEach(dot => dot.classList.remove('active'));
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 355, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 650, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1300, settings: { slidesToShow: 5, slidesToScroll: 5 }}
        ];

        responsiveSettings.forEach(resp => {
            if (window.innerWidth >= resp.breakpoint) {
                slidesToShow = resp.settings.slidesToShow;
                slidesToScroll = resp.settings.slidesToScroll;
            }
        });
        updateSlidesToShow();
        buildDots();
    }

    function updateSlidesToShow() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 349;
        const mobileTinyScreen = window.innerWidth > 349 && window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth > 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
    
        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 0
                      : mobileTinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 10.2
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.2
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.8
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.7
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.1;

        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 251;
        const mobileScreen1 = window.innerWidth < 260;
        const mobileScreen2 = window.innerWidth < 269;
        const mobileScreen3 = window.innerWidth < 271;
        const mobileScreen4 = window.innerWidth < 273;
        const mobileScreen5 = window.innerWidth < 277;
        const mobileScreen6 = window.innerWidth < 283;
        const mobileScreen7 = window.innerWidth < 287;
        const mobileScreen8 = window.innerWidth <= 290;
        const mobileScreen9 = window.innerWidth < 302;
        const mobileScreen10 = window.innerWidth < 309;
        const mobileScreen11 = window.innerWidth < 313;
        const mobileScree12 = window.innerWidth < 318;
        const mobileScree13 = window.innerWidth < 322;
        const mobileScreen14 = window.innerWidth < 324;
        const mobileScreen15 = window.innerWidth < 332;
        const mobileScreen16 = window.innerWidth < 337;
        const mobileScreen17 = window.innerWidth < 345;
        const mobileScreen18 = window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth >= 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
        const lMediumScreen = window.innerWidth > 1100 && window.innerWidth < 1150;

        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen1 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScreen2 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScreen3 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.3
                      : mobileScreen4 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.85
                      : mobileScreen5 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mobileScreen6 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen7 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : mobileScreen8 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen9 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.6
                      : mobileScreen10 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.25
                      : mobileScreen11 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScree12 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScree13 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.4
                      : mobileScreen14 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.25
                      : mobileScreen15 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen16 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.85
                      : mobileScreen17 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.11
                      : mobileScreen18 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.5
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.65
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : lMediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.2
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9;

        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        const scrollPosition = currentIndex * (slideWidth + gapSize);
    
        function animateScroll(start, end, duration) {
            let startTime = null;
    
            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, start, end - start, duration);
    
                sliderContainer.scrollLeft = run;
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
    
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
    
            requestAnimationFrame(animation);
        }
    
        animateScroll(sliderContainer.scrollLeft, scrollPosition, 600);
    
        updateDots();
    
        if (currentIndex >= slides.length) {
            currentIndex = 0;
            sliderContainer.scrollTo({ left: 0 });
        }
    }

    function nextSlide() {
        currentIndex += slidesToScroll;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        scrollToSlide(true);
    }

    function prevSlide() {
        currentIndex -= slidesToScroll;
        if (currentIndex < 0) {
            currentIndex = slides.length - (slides.length % slidesToScroll || slidesToScroll);
        }
        scrollToSlide(true);
    }

    function attachEvents() {
        const prevButton = document.querySelector(prevArrowSelector);
        const nextButton = document.querySelector(nextArrowSelector);

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        window.addEventListener('resize', setResponsive);

        Array.from(dotsWrapper.children).forEach(dot => {
            dot.addEventListener('click', e => {
                currentIndex = parseInt(e.target.dataset.index) * slidesToScroll;
                scrollToSlide();
            });
        });

        // Flexible dragging
        sliderContainer.addEventListener('mousedown', startDrag);
        sliderContainer.addEventListener('mousemove', duringDrag);
        sliderContainer.addEventListener('mouseup', endDrag);
        sliderContainer.addEventListener('mouseleave', endDrag); // ends drag if mouse leaves
    }

    function startDrag(e) {
        isDragging = true;
        startX = e.clientX;
        scrollStart = sliderContainer.scrollLeft;
    }

    function duringDrag(e) {
        if (!isDragging) return;
        const currentX = e.clientX;
        const dragDistance = currentX - startX;
        sliderContainer.scrollLeft = scrollStart - dragDistance;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        const wrapperWidth = sliderContainer.clientWidth;
        const slideWidth = wrapperWidth / slidesToShow;
        const scrollLeft = sliderContainer.scrollLeft;

        // Snap to nearest slide after drag
        if (Math.abs(scrollLeft - currentIndex * slideWidth) > slideWidth / 2) {
            if (scrollLeft > currentIndex * slideWidth) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            scrollToSlide(true);
        }
    }

    function autoSlide() {
        setInterval(nextSlide, autoplaySpeed);
    }

    setupSlider();
    buildDots();
    setResponsive();
    attachEvents();
    // autoSlide();
}

initializeSlider2({
    containerSelector:'.slider2-section .slider-container',
    dotsSelector:'.slider2-section #sliderdots',
    prevArrowSelector:'.slider2-section .arrow-left',
    nextArrowSelector:'.slider2-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


function initializeSlider3(options) {
    const {
        containerSelector = '.slider-container',
        prevArrowSelector = '.arrow-left',
        nextArrowSelector = '.arrow-right',
        slidesToShowDefault = 1,
        slidesToScrollDefault = 1,
    } = options;

    let currentIndex = 0;
    let slidesToShow = slidesToShowDefault;
    let slidesToScroll = slidesToScrollDefault;
    const sliderContainer = document.querySelector(containerSelector);
    const slides = Array.from(sliderContainer.children);
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    function setupSlider() {
        sliderContainer.style.scrollBehavior = 'smooth';
        updateSlidesToShow();
    }

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 355, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 650, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1300, settings: { slidesToShow: 5, slidesToScroll: 5 }}
        ];

        responsiveSettings.forEach(resp => {
            if (window.innerWidth >= resp.breakpoint) {
                slidesToShow = resp.settings.slidesToShow;
                slidesToScroll = resp.settings.slidesToScroll;
            }
        });
        updateSlidesToShow();
    }

    function updateSlidesToShow() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 350;
        const tinyScreen = window.innerWidth > 350 && window.innerWidth < 400;
        const smallScreen = window.innerWidth > 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth > 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
    
        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 1
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.2
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.8
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.7
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.1;


        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 251;
        const mobileScreen1 = window.innerWidth < 260;
        const mobileScreen2 = window.innerWidth < 269;
        const mobileScreen3 = window.innerWidth < 271;
        const mobileScreen4 = window.innerWidth < 273;
        const mobileScreen5 = window.innerWidth < 277;
        const mobileScreen6 = window.innerWidth < 283;
        const mobileScreen7 = window.innerWidth < 287;
        const mobileScreen8 = window.innerWidth <= 290;
        const mobileScreen9 = window.innerWidth < 302;
        const mobileScreen10 = window.innerWidth < 309;
        const mobileScreen11 = window.innerWidth < 313;
        const mobileScree12 = window.innerWidth < 318;
        const mobileScree13 = window.innerWidth < 322;
        const mobileScreen14 = window.innerWidth < 324;
        const mobileScreen15 = window.innerWidth < 332;
        const mobileScreen16 = window.innerWidth < 337;
        const mobileScreen17 = window.innerWidth < 345;
        const mobileScreen18 = window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth >= 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
        const lMediumScreen = window.innerWidth > 1100 && window.innerWidth < 1150;

        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen1 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScreen2 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScreen3 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.3
                      : mobileScreen4 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.85
                      : mobileScreen5 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mobileScreen6 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen7 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : mobileScreen8 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen9 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.6
                      : mobileScreen10 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.25
                      : mobileScreen11 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScree12 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScree13 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.4
                      : mobileScreen14 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.25
                      : mobileScreen15 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen16 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.85
                      : mobileScreen17 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.11
                      : mobileScreen18 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.5
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.65
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : lMediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.2
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9;

        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        const scrollPosition = currentIndex * (slideWidth + gapSize);
    
        function animateScroll(start, end, duration) {
            let startTime = null;
    
            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, start, end - start, duration);
    
                sliderContainer.scrollLeft = run;
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
    
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
    
            requestAnimationFrame(animation);
        }
    
        animateScroll(sliderContainer.scrollLeft, scrollPosition, 600);
    }

    function nextSlide() {
        currentIndex = (currentIndex + slidesToScroll) % slides.length;
        scrollToSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - slidesToScroll + slides.length) % slides.length;
        scrollToSlide();
    }

    function attachEvents() {
        const prevButton = document.querySelector(prevArrowSelector);
        const nextButton = document.querySelector(nextArrowSelector);

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        window.addEventListener('resize', setResponsive);

        // Dragging for mobile and desktop
        sliderContainer.addEventListener('mousedown', startDrag);
        sliderContainer.addEventListener('mousemove', duringDrag);
        sliderContainer.addEventListener('mouseup', endDrag);
        sliderContainer.addEventListener('mouseleave', endDrag);

        // Update currentIndex based on scrollbar position
        sliderContainer.addEventListener('scroll', () => {
            const wrapperWidth = sliderContainer.clientWidth;
            const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.1;
            const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;

            currentIndex = Math.round(sliderContainer.scrollLeft / (slideWidth + gapSize));
        });
        
    }

    function startDrag(e) {
        isDragging = true;
        startX = e.clientX;
        scrollStart = sliderContainer.scrollLeft;
    }

    function duringDrag(e) {
        if (!isDragging) return;
        const currentX = e.clientX;
        const dragDistance = currentX - startX;
        sliderContainer.scrollLeft = scrollStart - dragDistance;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        scrollToSlide();
    }

    setupSlider();
    setResponsive();
    attachEvents();
}

initializeSlider3({
    containerSelector: '.slider3-section .slider-container',
    prevArrowSelector: '.slider3-section .arrow-left',
    nextArrowSelector: '.slider3-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
});


function rotationalSlider(options) {
    const {
        containerSelector = '.slides-container',
        dotsSelector = '#sliderdots',
        prevArrowSelector = '.arrow-left',
        nextArrowSelector = '.arrow-right',
        slidesToShowDefault = 1,
        slidesToScrollDefault = 1,
        autoplaySpeed = 3000
    } = options;

    let currentIndex = 0;
    let slidesToShow = slidesToShowDefault;
    let slidesToScroll = slidesToScrollDefault;
    let slides;
    let sliderContainer = document.querySelector(containerSelector);
    let dotsWrapper = document.querySelector(dotsSelector);

    function setupSlider() {
        slides = Array.from(sliderContainer.children);
        sliderContainer.style.display = 'flex';
        sliderContainer.style.overflow = 'hidden';
        updateSlidesToShow();
        buildDots();
    }

    function buildDots() {
        dotsWrapper.innerHTML = '';
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
        const dots = dotsWrapper.children;
        const activeDotIndex = Math.floor(currentIndex / slidesToScroll);
        Array.from(dots).forEach(dot => dot.classList.remove('active'));
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 355, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 650, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1300, settings: { slidesToShow: 5, slidesToScroll: 5 }}
        ];

        responsiveSettings.forEach(resp => {
            if (window.innerWidth >= resp.breakpoint) {
                slidesToShow = resp.settings.slidesToShow;
                slidesToScroll = resp.settings.slidesToScroll;
            }
        });
        updateSlidesToShow();
        buildDots();
    }

    function updateSlidesToShow() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 349;
        const mobileTinyScreen = window.innerWidth > 349 && window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth > 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
    
        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 0
                      : mobileTinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 10.2
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.2
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.8
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.7
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.1;

        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
            slide.style.transition = 'transform 0.6s ease';
        });
    }

    function addRotationEffect() {
        const visibleSlides = slides.slice(currentIndex, currentIndex + slidesToShow);
        slides.forEach(slide => slide.style.transform = 'rotateX(0deg)'); // Reset all slides
        visibleSlides.forEach((slide, index) => {
            setTimeout(() => {
                slide.style.transform = 'rotateX(360deg)';
            }, index * 100); // Staggered rotation
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;

        const mobileScreen = window.innerWidth < 251;
        const mobileScreen1 = window.innerWidth < 260;
        const mobileScreen2 = window.innerWidth < 269;
        const mobileScreen3 = window.innerWidth < 271;
        const mobileScreen4 = window.innerWidth < 273;
        const mobileScreen5 = window.innerWidth < 277;
        const mobileScreen6 = window.innerWidth < 283;
        const mobileScreen7 = window.innerWidth < 287;
        const mobileScreen8 = window.innerWidth <= 290;
        const mobileScreen9 = window.innerWidth < 302;
        const mobileScreen10 = window.innerWidth < 309;
        const mobileScreen11 = window.innerWidth < 313;
        const mobileScree12 = window.innerWidth < 318;
        const mobileScree13 = window.innerWidth < 322;
        const mobileScreen14 = window.innerWidth < 324;
        const mobileScreen15 = window.innerWidth < 332;
        const mobileScreen16 = window.innerWidth < 337;
        const mobileScreen17 = window.innerWidth < 345;
        const mobileScreen18 = window.innerWidth < 351;
        const tinyScreen = window.innerWidth > 351 && window.innerWidth < 400;
        const smallScreen = window.innerWidth >= 400 && window.innerWidth < 500;
        const bigSmallScreen = window.innerWidth >= 500 && window.innerWidth < 650;
        const tabScreen = window.innerWidth >= 650 && window.innerWidth < 1000;
        const mediumScreen = window.innerWidth > 1000 && window.innerWidth < 1100;
        const lMediumScreen = window.innerWidth > 1100 && window.innerWidth < 1150;

        const gapSize = mobileScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen1 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScreen2 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScreen3 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.3
                      : mobileScreen4 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.85
                      : mobileScreen5 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mobileScreen6 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen7 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : mobileScreen8 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.15
                      : mobileScreen9 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.6
                      : mobileScreen10 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.25
                      : mobileScreen11 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.55
                      : mobileScree12 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2
                      : mobileScree13 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.4
                      : mobileScreen14 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.25
                      : mobileScreen15 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.8
                      : mobileScreen16 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.85
                      : mobileScreen17 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -2.11
                      : mobileScreen18 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.5
                      : tinyScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.65
                      : smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.7
                      : bigSmallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.8
                      : tabScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -1.1
                      : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9
                      : lMediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.2
                      : parseFloat(getComputedStyle(document.documentElement).fontSize) * -0.9;

        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        const scrollPosition = currentIndex * (slideWidth + gapSize);
    
        sliderContainer.scrollLeft = scrollPosition;
        updateDots();
        addRotationEffect();
    }

    function nextSlide() {
        currentIndex = (currentIndex + slidesToScroll) % slides.length;
        scrollToSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - slidesToScroll + slides.length) % slides.length;
        scrollToSlide();
    }

    function attachEvents() {
        const prevButton = document.querySelector(prevArrowSelector);
        const nextButton = document.querySelector(nextArrowSelector);

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        window.addEventListener('resize', setResponsive);

        Array.from(dotsWrapper.children).forEach(dot => {
            dot.addEventListener('click', e => {
                currentIndex = parseInt(e.target.dataset.index) * slidesToScroll;
                scrollToSlide();
            });
        });
    }

    setupSlider();
    setResponsive();
    attachEvents();
}

rotationalSlider({
    containerSelector:'.slider4-section .slider-container',
    dotsSelector:'.slider4-section #sliderdots',
    prevArrowSelector:'.slider4-section .arrow-left',
    nextArrowSelector:'.slider4-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});





const productName = document.querySelectorAll(".product-name");

productName.forEach((proName) => { 
    proName.textContent = proName.textContent.split(" ").slice(0,3).join(" ");
});