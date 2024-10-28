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
            { breakpoint: 350, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 650, settings: { slidesToShow: 2, slidesToScroll: 2 }},
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function updateSliderPosition() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.1;
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
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex -= slidesToScroll;
        if (currentIndex < 0) {
            currentIndex = slides.length - (slides.length % slidesToScroll || slidesToScroll);
        }
        updateSliderPosition();
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
                updateSliderPosition();
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
    containerSelector:'.slider1-section .slides-container',
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
            { breakpoint: 350, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 650, settings: { slidesToShow: 2, slidesToScroll: 2 }},
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
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5;
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
    }

    function updateSliderPosition() {
        const wrapperWidth = sliderContainer.clientWidth;
        const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.1;
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
        updateSliderPosition(true);
    }

    function prevSlide() {
        currentIndex -= slidesToScroll;
        if (currentIndex < 0) {
            currentIndex = slides.length - (slides.length % slidesToScroll || slidesToScroll);
        }
        updateSliderPosition(true);
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
                updateSliderPosition();
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
            updateSliderPosition(true);
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
    containerSelector:'.slider2-section .products-container',
    dotsSelector:'.slider2-section #sliderdots',
    prevArrowSelector:'.slider2-section .arrow-left',
    nextArrowSelector:'.slider2-section .arrow-right',
    slidesToShowDefault: 1,
    slidesToScrollDefault: 1,
    autoplaySpeed: 3000
});