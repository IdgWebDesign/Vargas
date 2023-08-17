document.querySelector("#closer").addEventListener('click', () => {
    document.querySelector(".ContEmergenteSlider").style.display = "none";
    document.getElementById("E1").src=" ";
    document.getElementById("E2").src=" ";
    document.getElementById("E3").src=" ";
    document.getElementById("E4").src=" ";

});
const swiper1 = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });