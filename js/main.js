let index = 0;
let slides = document.querySelectorAll('.banner-slide-item');

function hideAllSlides(){
  slides.forEach(slide => {
    slide.style.display = "none";
  });
}

hideAllSlides();

if (index >= 0 && index < slides.length) {
    slides[index].style.display = "flex";
}

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