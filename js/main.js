/*** MOBILE HEADER ***/
if(document.getElementById("open-mHeader") && document.getElementById("main-header")){
   const mobileHBtn = document.getElementById("open-mHeader");
   const mainHeader = document.getElementById("main-header");
   mobileHBtn.onclick = () => mainHeader.classList.toggle("mobile-header");
}

let index = 0;
let slides = document.querySelectorAll('.banner-slide-item');

function hideAllSlides(){
  slides.forEach(slide => {
    slide.style.display = "none";
  });
}

hideAllSlides();

if (index >= 0 && index < slides.length) {slides[index].style.display = "flex";}

function prevB(){
  index = (index - 1 + slides.length) % slides.length;
  hideAllSlides();
  slides[index].style.display = "flex";
}

function nextB(){
  index = (index + 1) % slides.length;
  hideAllSlides();
  slides[index].style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function() { // create divs according to class name
  const productItems = Array.from(document.querySelectorAll('.offers-section .col-right .inner-col .product-item'));
  const groupedProducts = {};

  // Group products by their class names
  productItems.forEach(productItem => {
    const className = productItem.classList[1]; // Assumes 'product-item 20%' format
    if (!groupedProducts[className]) {
        groupedProducts[className] = [];
    }
    groupedProducts[className].push(productItem);
  });
   
  for (const [className, products] of Object.entries(groupedProducts)) { // Create the offersblock and items divs
    if (products.length > 8) {
        const offersBlock = document.createElement('div');
        offersBlock.className = `offersblock offersblock${className.replace('%', '')}`;

        let itemsBlock = document.createElement('div');
            itemsBlock.className = 'items';
        let itemCount = 0;

        products.forEach((product, index) => {
          itemsBlock.appendChild(product);
          itemCount++;
  
          if (itemCount === 8 || index === products.length - 1) {
            offersBlock.appendChild(itemsBlock);
            itemsBlock = document.createElement('div');
            itemsBlock.className = 'items';
            itemCount = 0;
          }
        });

        document.querySelector(".offers-section .col-right .inner-col").appendChild(offersBlock);
    } else {
      // If the products are less than or equal to 8, you can handle them separately if needed
      // Here, we assume they don't need to be wrapped in items div
      const offersBlock = document.createElement('div');
      offersBlock.className = `offersblock offersblock${className.replace('%', '')}`;

      products.forEach(product => {
        offersBlock.appendChild(product);
      });

      document.body.appendChild(offersBlock);
    }
  }
});

function truncateWords(title, wordsCount){
   return title.split(' ').slice(0,wordsCount).join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.offers-section .product-item h4').forEach(h4 => {
    h4.textContent = truncateWords(h4.textContent, 3);
  });
});

$(document).ready(function(){

  function sliderWithFilterTabs(tabs, blocks, secondClassBlock){

    $(tabs).first().addClass('active');
    $(blocks).hide();
    $(blocks).first().show();

    $(tabs).click(function() {
      var offerClass = secondClassBlock + $(this).attr('class').replace('%', '');
      $(tabs).removeClass('active');
      $(this).addClass('active');
      $(blocks).hide().removeClass('active');
      $(offerClass).show().addClass('active');
    });

    $(blocks).each(function() {
      $(this).addClass('owl-carousel');
      $(this).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots:false,
        items: 1
      });
    });
    
  }

  sliderWithFilterTabs('.offers-section .col-left .tabs li', '.offers-section .col-left .inner-col > div', '.offersblock');

  sliderWithFilterTabs('.offers-section .col-right .tabs li', '.offers-section .col-right .inner-col > div', '.offersblock');

  $('.brand-slider').owlCarousel({
    loop:true,
    nav:false,
    dots:false,
    items:5,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        400:{
            items:2
        },
        550:{
            items:3
        },
        700:{
            items:4
        },
        1000:{
            items:5
        }
    }
  });

});

document.getElementById("current-year").textContent = new Date().getFullYear();

/**************
  SINGLE PAGE
**************/
const smallImage = document.querySelectorAll('#single-page .col-left .small-images .small-image img');
const bigImage = document.querySelector('#single-page .col-left .big-image img');
const lens = document.querySelector('#single-page .col-left .big-image .lens');
const magnifierImage = document.querySelector('#single-page .col-right .content .magnifier-img');

if(smallImage && bigImage){

for(let i=0; i<smallImage.length; i++){
   smallImage[i].onclick = function(){
     bigImage.src = smallImage[i].src;
   }
}

function magnify(bigImage){
  lens.addEventListener('mousemove', moveLens);
  bigImage.addEventListener('mousemove', moveLens);
  bigImage.addEventListener('mouseout', leaveLens);
}

function moveLens(e){
  let x, y, cx, cy;

  const bigImageRect = bigImage.getBoundingClientRect();

  x = e.pageX - bigImageRect.left - lens.offsetWidth / 2;
  y = e.pageY - bigImageRect.top - lens.offsetHeight / 2;

  let max_xpos = bigImageRect.width - lens.offsetWidth;
  let max_ypos = bigImageRect.height - lens.offsetHeight;

  if(x > max_xpos) x = max_xpos;
  if(x < 0) x = 0;

  if(y > max_ypos) y = max_ypos;
  if(y < 0) y = 0;

  lens.style.cssText = `top:${y}px;left:${x}px`;

  cx = magnifierImage.offsetWidth / lens.offsetWidth;
  cy = magnifierImage.offsetHeight / lens.offsetHeight;

  magnifierImage.style.backgroundImage = `url('${bigImage.src}')`;
  magnifierImage.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
  magnifierImage.style.backgroundSize = `${bigImageRect.width * cx}px ${bigImageRect.height * cy}px`;
  magnifierImage.style.backgroundRepeat = `no-repeat`;

  lens.classList.add('active');
  magnifierImage.classList.add('active');

}

function leaveLens(){
  lens.classList.remove('active');
  magnifierImage.classList.remove('active');
}

magnify(bigImage, magnifierImage);

}