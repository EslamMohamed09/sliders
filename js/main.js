function oldDotsSlider(options) {
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
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
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

oldDotsSlider({
    containerSelector:'.slider1-section .slider-wrapper',
    dotsSelector:'.slider1-section #sliderdots',
    prevArrowSelector:'.slider1-section .arrow-left',
    nextArrowSelector:'.slider1-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


function dotsSlider(options) {
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
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
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

dotsSlider({
    containerSelector:'.slider2-section .slider-wrapper',
    dotsSelector:'.slider2-section #sliderdots',
    prevArrowSelector:'.slider2-section .arrow-left',
    nextArrowSelector:'.slider2-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


function dragSliderFiveItems(options) {
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

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 560, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 720, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1000, settings: { slidesToShow: 5, slidesToScroll: 5 }},
            { breakpoint: 1400, settings: { slidesToShow: 6, slidesToScroll: 6 }},
            { breakpoint: 1600, settings: { slidesToShow: 7, slidesToScroll: 7 }}
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
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
    setResponsive();
    attachEvents();
    // autoSlide();
}

dragSliderFiveItems({
    containerSelector:'.slider4-section .slider-wrapper',
    dotsSelector:'.slider4-section #sliderdots',
    prevArrowSelector:'.slider4-section .arrow-left',
    nextArrowSelector:'.slider4-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


function dragSliderSixItems(options) {
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

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 560, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 720, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1000, settings: { slidesToShow: 5, slidesToScroll: 5 }},
            { breakpoint: 1300, settings: { slidesToShow: 6, slidesToScroll: 6 }},
            { breakpoint: 1600, settings: { slidesToShow: 7, slidesToScroll: 7 }}
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;
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
    setResponsive();
    attachEvents();
    // autoSlide();
}

dragSliderSixItems({
    containerSelector:'.slider3-section .slider-wrapper',
    dotsSelector:'.slider3-section #sliderdots',
    prevArrowSelector:'.slider3-section .arrow-left',
    nextArrowSelector:'.slider3-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


function scrollSlider(options) {
    const {
        containerSelector = '.slider-wrapper',
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
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
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

scrollSlider({
    containerSelector: '.slider5-section .slider-wrapper',
    prevArrowSelector: '.slider5-section .arrow-left',
    nextArrowSelector: '.slider5-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
});

scrollSlider({
    containerSelector: '.slider6-section .slider-wrapper',
    prevArrowSelector: '.slider6-section .arrow-left',
    nextArrowSelector: '.slider6-section .arrow-right',
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
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
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
            }, index * 70); // Staggered rotation
        });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
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
    containerSelector:'.slider9-section .slider-wrapper',
    dotsSelector:'.slider9-section #sliderdots',
    prevArrowSelector:'.slider9-section .arrow-left',
    nextArrowSelector:'.slider9-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});


const categoriesColors = [
    "var(--transparent-green3)",  // 1st color
    "var(--transparent-yellow2)", // 2nd color
    "var(--transparent-yellow)",  // 3rd color
    "var(--transparent-orange1)", // 4th color
    "var(--transparent-green4)",  // 5th color
    "var(--transparent-blue)",    // 6th color
    "var(--transparent-violet)",  // 7th color
    "var(--transparent-olive)",   // 8th color
    "var(--transparent-orange)"   // 9th color
];

document.querySelectorAll('.slider-wrapper').forEach(sliderWrapper => {
   const categoryItems = sliderWrapper.querySelectorAll('.category-item .image');

   categoryItems.forEach((item, index) => {
     item.style.backgroundColor = categoriesColors[index % categoriesColors.length];
   });
});

/*** REMOVE BACKGROUND ***/
function removeBackground(imgElement, targetColor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const originalImage = new Image();
  originalImage.src = imgElement.src;

  originalImage.onload = function () {
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert target color to RGBA format
    const targetRGBA = hexToRGBA(targetColor);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // Check if the pixel color matches the target color
      if (red === targetRGBA.r &&
          green === targetRGBA.g &&
          blue === targetRGBA.b
      ) {
        data[i + 3] = 0; // Set alpha channel to 0 (transparent)
      }
    }

    // Update the canvas with modified image data
    ctx.putImageData(imageData, 0, 0);

    // Replace the original image with the processed image
    imgElement.src = canvas.toDataURL();
  };
}

function hexToRGBA(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

const productImages = document.querySelectorAll('.image img');
productImages.forEach(function (img) {
  const clonedImage = img.cloneNode();
  removeBackground(clonedImage, '#ffffff');
  img.parentNode.replaceChild(clonedImage, img);
});


const productName = document.querySelectorAll(".product-name");

productName.forEach((proName) => { 
    proName.textContent = proName.textContent.split(" ").slice(0,3).join(" ");
});