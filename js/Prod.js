function removeItems(){
document.querySelectorAll(".created").forEach( item =>
 { item.remove();
  
});
};
const swiper1 = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  observer: true,
  // If we need pagination
  pagination: {
     el: '.swiper-pagination',
   },

  // // Navigation arrows
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   }

  // // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

document.querySelectorAll(".act").forEach(El => El.addEventListener('click', () => {
  document.querySelector(".ContEmergenteSlider").style.display = "block";
}))

document.querySelector("#closer").addEventListener('click', () => {
    document.querySelector(".ContEmergenteSlider").style.display = "none";
    removeItems();
    
    swiper1.slideTo(0, 0);
    
});





 

