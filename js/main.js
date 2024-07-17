let index = 0;
let slides = document.querySelectorAll('.banner-slide-item');

function hideAllSlides(){
  slides.forEach(slide => {
    slide.style.display = "none";
  });
}

hideAllSlides();

if (index >= 0 && index < slides.length) {slides[index].style.display = "flex";}

function prev(){
  index = (index - 1 + slides.length) % slides.length;
  hideAllSlides();
  slides[index].style.display = "flex";
}

function next(){
  index = (index + 1) % slides.length;
  hideAllSlides();
  slides[index].style.display = "flex";
}

// filter with tabs
function filterWithTabs(tabButtons, cartItems){
  tabButtons = Array.isArray(tabButtons) ? tabButtons : Array.from(tabButtons);
  cartItems = Array.isArray(cartItems) ? cartItems : Array.from(cartItems);

  function hideAllItems(){
     cartItems.forEach(cartItem => {
        cartItem.style.display = "none";
     });
  }

  function showItemsWithClass(itemClass){
     cartItems.forEach(cartItem => {
        if (cartItem.classList.contains(itemClass)){
            cartItem.style.display = "block";
        }
     });
  }

  let firstClassTab = tabButtons[0].classList[0];

  tabButtons[0].classList.add("btnactive");
  hideAllItems();
  showItemsWithClass(firstClassTab);

  tabButtons.forEach(tabButton => {
     tabButton.addEventListener("click", function () {
       tabButtons.forEach(tab => tab.classList.remove("btnactive"));
       this.classList.add("btnactive");

       hideAllItems();
       showItemsWithClass(this.classList[0]);
     });
  });

}

filterWithTabs($(".offers-section .col-left .tabs-area li"), $(".offers-section .col-left .inner-col .product-item"));
filterWithTabs($(".offers-section .col-right .tabs-area li"), $(".offers-section .col-right .inner-col .product-item"));

function truncateWords(title, wordsCount){
   return title.split(' ').slice(0,wordsCount).join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.offers-section .product-item h4').forEach(h4 => {
    h4.textContent = truncateWords(h4.textContent, 3);
  });
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