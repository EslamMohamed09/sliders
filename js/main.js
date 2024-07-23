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

// filter with tabs
// function filterWithTabs(tabButtons, cartItems){
//   tabButtons = Array.isArray(tabButtons) ? tabButtons : Array.from(tabButtons);
//   cartItems = Array.isArray(cartItems) ? cartItems : Array.from(cartItems);

//   offersBlock = document.querySelectorAll(".col-right .inner-col > div");

//   function hideAllItems(){
//      cartItems.forEach(cartItem => {
//         cartItem.style.display = "none";
//      });
//   }

//   function showItemsWithClass(itemClass){
//      cartItems.forEach(cartItem => {
//         if (cartItem.classList.contains(itemClass)){
//             cartItem.style.display = "block";
//         }
//      });
//   }

//   let firstClassTab = tabButtons[0].classList[0];

//   tabButtons[0].classList.add("btnactive");
//   hideAllItems();
//   showItemsWithClass(firstClassTab);

//   tabButtons.forEach(tabButton => {
//      tabButton.addEventListener("click", function () {
//        tabButtons.forEach(tab => tab.classList.remove("btnactive"));
//        this.classList.add("btnactive");

//        hideAllItems();
//        showItemsWithClass(this.classList[0]);
//      });
//   });

// }

// filterWithTabs($(".offers-section .col-left .tabs-area li"), $(".offers-section .col-left .inner-col .product-item"));
// filterWithTabs($(".offers-section .col-right .tabs-area li"), $(".offers-section .col-right .inner-col .product-item"));



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

    $(tabs).click(function() {
      var offerClass = secondClassBlock + $(this).attr('class').replace('%', '');
      $(tabs).removeClass('active');
      $(this).addClass('active');
      $(blocks).hide().removeClass('active');
      $(offerClass).show().addClass('active');
    });
  }

  sliderWithFilterTabs('.offers-section .col-left .tabs li', '.offers-section .col-left .inner-col > div', '.offersblock');

  sliderWithFilterTabs('.offers-section .col-right .tabs li', '.offers-section .col-right .inner-col > div', '.offersblock');

});


document.addEventListener("DOMContentLoaded", function() { // create divs according to class name
  const productItems = Array.from(document.querySelectorAll('.product-item'));
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

      document.body.appendChild(offersBlock);
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