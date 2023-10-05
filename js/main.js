/* ===================================================================
 * Glint - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var clMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var clPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

            // get items
            $folioItems.each( function(i) {

                var $folio = $(this),
                    $thumbLink =  $folio.find('.thumb-link'),
                    $title = $folio.find('.item-folio__title'),
                    $caption = $folio.find('.item-folio__caption'),
                    $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                    $captionText = $.trim($caption.html()),
                    $href = $thumbLink.attr('href'),
                    $size = $thumbLink.data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
         
                var item = {
                    src  : $href,
                    w    : $width,
                    h    : $height
                }

                if ($caption.length > 0) {
                    item.title = $.trim($titleText + $captionText);
                }

                items.push(item);
            });

            // bind click event
            $folioItems.each(function(i) {

                $(this).on('click', function(e) {
                    e.preventDefault();
                    var options = {
                        index: i,
                        showHideOpacity: true
                    }

                    // initialize PhotoSwipe
                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });

            });

    };
    

   /* Stat Counter
    * ------------------------------------------------------ */
    var clStatCount = function() {
        
        var statSection = $(".about-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    }; 


   /* Masonry
    * ---------------------------------------------------- */ 
    var clMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var clSlickSlider = function() {

        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            //autoplay: true,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });

        $('.testimonials').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    
    };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Placeholder Plugin Settings
    * ------------------------------------------------------ */
    var clPlaceholder = function() {
        $('input, textarea, select').placeholder();  
    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    document.querySelectorAll(".itGral").forEach(El => El.addEventListener('mouseenter', () => { 
        var IDEl = El.id;
        var color =" ";
       

        switch (IDEl){
            case 'gastr':
                color= "#ec5f78d4";
                
            break

            case 'pack':
                color= "#23b9ced4";
                
            break
            
            case 'merch':
                color= "#96c11fd4";
                
            break

            case 'tex':
                color= "#f18931d4";
                
            break
            case 'marr':
                color= "#7f89c3d4";
                
            break
            case 'PE':
                color= "#ba71acd4";
                
            break
        }

    
        document.querySelector(":root").style.setProperty('--ItColor', color);

    }));


    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

    if (isMobile){
        
    const Quads = document.querySelectorAll(".superIt");
    let activeIndex = 0;

    function updateLights() {
        Quads.forEach((light, index) => {
            if (index === activeIndex) {
                light.classList.add('QuadActive');
            } else {
                light.classList.remove('QuadActive');
            }
        });

        activeIndex = (activeIndex + 1) % Quads.length;
        var color =" ";
        switch (activeIndex){
                case 0:
                    color= "#f18931";
                    
                break
    
                case 1:
                    color= "#ec5f78";
                    
                break
                
                case 2:
                    color= "#96c11f";
                    
                break
    
                case 3:
                    color= "#23b9ce";
                    
                break
                case 4:
                    color= "#7f89c3";
                    
                break
                case 5:
                    color= "#ba71ac";
                    
                break
            
        }
        document.querySelector(":root").style.setProperty('--ItColor', color);
    }

    // Configura el intervalo para cambiar las luces cada 1000 ms (1 segundo)
    setInterval(updateLights, 2000);
    }

   /* Contact Form
    * ------------------------------------------------------ */
    var clContactForm = function() {
        
        /* local validation */
        $('#contactForm').validate({
        
            /* submit via ajax */
            submitHandler: function(form) {
    
                var sLoader = $('.submit-loader');
    
                $.ajax({
    
                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function() { 
    
                        sLoader.slideDown("slow");
    
                    },
                    success: function(msg) {
    
                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }
    
                    },
                    error: function() {
    
                        sLoader.slideUp("slow"); 
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");
    
                    }
    
                });
            }
    
        });
    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };

    
   /* AjaxChimp
    * ------------------------------------------------------ */
    var clAjaxChimp = function() {
        
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        } 

    };

    
   /* Back to Top
    * ------------------------------------------------------ */
    var clBackToTop = function() {
        
        var pxShow  = 500,         // height on which the button will show
        fadeInTime  = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".go-top")
        
        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };

  
      
   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        clPreloader();
        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clContactForm();
        clAOS();
        clAjaxChimp();
        clBackToTop();

    })();


    function addItemSlider(URL){
        var contPrim= document.getElementById("spcSwiper");

        var slideItem= document.createElement("div");
        slideItem.className= "swiper-slide created";

        var styleItem= document.createElement("div");
        styleItem.className= "stylishItem";

        var nuevaImagen = document.createElement("img");
        nuevaImagen.src = URL;

        contPrim.appendChild(slideItem);
        slideItem.appendChild(styleItem);
        styleItem.appendChild(nuevaImagen);
    }

    document.querySelectorAll(".act").forEach(El => El.addEventListener('click', () => {
        document.querySelector(".ContEmergenteSlider").style.display = "block";

        var ProductClass= El.id;

        switch (ProductClass){

            //ARTE-PRODUCCION

            //Cartas de Menú
            case "OPERA":
                addItemSlider("./cartasmenu/lineaopera.jpg"); 
                addItemSlider("./cartasmenu/lo(2).jpg");
                addItemSlider("./cartasmenu/lo(3).jpg"); 
                addItemSlider("./cartasmenu/lo(1).jpg");   
               
            break;
            case "BLUES":
                addItemSlider("./cartasmenu/lineablues.jpg"); 
                addItemSlider("./cartasmenu/lb(2).jpg");
                addItemSlider("./cartasmenu/lb(3).jpg"); 
                addItemSlider("./cartasmenu/lb(1).jpg");   
            break
            case "SPECIAL":
                
                addItemSlider("./cartasmenu/especiales.jpg"); 
                addItemSlider("./cartasmenu/esp(2).jpg");
                addItemSlider("./cartasmenu/esp(3).jpg"); 
                addItemSlider("./cartasmenu/esp(1).jpg"); 
            break
            case "JAZZ":
                addItemSlider("./cartasmenu/lineajazz.jpg"); 
                addItemSlider("./cartasmenu/lj (2).jpg");
                addItemSlider("./cartasmenu/lj (3).jpg"); 
                addItemSlider("./cartasmenu/lj (1).jpg");  
            break
            case "TAP":
                addItemSlider("./cartasmenu/lineatap.jpg"); 
                addItemSlider("./cartasmenu/lt (2).jpg");
                addItemSlider("./cartasmenu/lt (3).jpg"); 
                addItemSlider("./cartasmenu/lt (1).jpg");  
            break

            //La mesa
            case "CUBRES":
                addItemSlider("./lamesa/cubresindividuales.jpg"); 
                addItemSlider("./lamesa/cubind (2).jpg");
                addItemSlider("./lamesa/cubind (3).jpg"); 
                addItemSlider("./lamesa/cubind (1).jpg"); 
            break
            case "BANDEJA":
                addItemSlider("./lamesa/bandeja.jpg"); 
                addItemSlider("./lamesa/b (2).jpg");
                addItemSlider("./lamesa/b (3).jpg"); 
                addItemSlider("./lamesa/b (1).jpg");
            break
            case "PORTAD":
                addItemSlider("./lamesa/portad.jpg"); 
                addItemSlider("./lamesa/portad (2).jpg");
                addItemSlider("./lamesa/portad (3).jpg"); 
                addItemSlider("./lamesa/portad (1).jpg");
            break
            case "PORTEL":
                addItemSlider("./lamesa/portaelementos.jpg"); 
                addItemSlider("./lamesa/portel (2).jpg");
                addItemSlider("./lamesa/portel (3).jpg"); 
                addItemSlider("./lamesa/portel (1).jpg");
            break
            case "ORO":
                addItemSlider("./lamesa/librodeoro.jpeg"); 
                addItemSlider("./lamesa/ldo (2).jpg");
                addItemSlider("./lamesa/ldo (3).jpg"); 
                addItemSlider("./lamesa/ldo (1).jpg");
            break
            case "CUERO":
                addItemSlider("./lamesa/mantelescuero.jpg"); 
                addItemSlider("./lamesa/mc (2).jpg");
                addItemSlider("./lamesa/mc (3).jpg"); 
                addItemSlider("./lamesa/mc (1).jpg");
            break

            case "TENT":
                addItemSlider("./lamesa/reservado.jpg"); 
                addItemSlider("./lamesa/res (2).jpg");
                addItemSlider("./lamesa/res (3).jpg"); 
                addItemSlider("./lamesa/res (1).jpg");
            break
            case "TELA":
                addItemSlider("./lamesa/mantelestela.jpg"); 
                addItemSlider("./lamesa/mt (2).jpg");
                addItemSlider("./lamesa/mt (3).jpg"); 
                addItemSlider("./lamesa/mt (1).jpg");
            break
            case "PORTEL":
                addItemSlider("./lamesa/portaelementos.jpg"); 
                addItemSlider("./lamesa/portel (2).jpg");
                addItemSlider("./lamesa/portel (3).jpg"); 
                addItemSlider("./lamesa/portel (1).jpg");
            break
            case "PAN":
                addItemSlider("./lamesa/paneras.jpg"); 
                addItemSlider("./lamesa/pan (2).jpg");
                addItemSlider("./lamesa/pan (3).jpg"); 
                addItemSlider("./lamesa/pan (1).jpeg");
            break
            case "VAJILLA":
                addItemSlider("./lamesa/vajillalogo.jpg"); 
                addItemSlider("./lamesa/vl (2).jpeg");
                addItemSlider("./lamesa/vl (3).jpg"); 
                addItemSlider("./lamesa/vl (1).jpg");
            break
            case "SERVILLETAS":
                addItemSlider("./lamesa/serv.jpg"); 
                addItemSlider("./lamesa/serv (2).jpg");
                addItemSlider("./lamesa/serv (1).png"); 
                addItemSlider("./lamesa/serv (1).jpg");
            break
            case "COPA":
                addItemSlider("./lamesa/copalogo.jpg"); 
                addItemSlider("./lamesa/cl (2).jpg");
                addItemSlider("./lamesa/cl (3).jpg"); 
                addItemSlider("./lamesa/cl (1).jpg");
            break
            case "PLATO":
                addItemSlider("./lamesa/plato.jpg"); 
                addItemSlider("./lamesa/pl (2).jpeg");
                addItemSlider("./lamesa/pl (3).jpg"); 
                addItemSlider("./lamesa/pl (1).jpeg");
            break

            //La Barra
            case "BRMS":
                addItemSlider("./labarra/barmat.jpg"); 
                addItemSlider("./labarra/brmts (2).jpg");
                addItemSlider("./labarra/brmts (3).jpg"); 
                addItemSlider("./labarra/brmts (1).jpg");
            break
            case "FRAP":
                addItemSlider("./labarra/frapera.jpg"); 
                addItemSlider("./labarra/fp (2).jpg");
                addItemSlider("./labarra/fp (3).jpg"); 
                addItemSlider("./labarra/fp (1).jpg");
            break

            //El personal
            case "DELANTALES":
                addItemSlider("./elpersonal/delantal.jpg"); 
                addItemSlider("./elpersonal/del (2).jpg");
                addItemSlider("./elpersonal/del (3).jpg"); 
                addItemSlider("./elpersonal/del (1).jpg");
            break
            case "BILL":
                addItemSlider("./elpersonal/billetera.jpg"); 
                addItemSlider("./elpersonal/bill (2).jpg");
                addItemSlider("./elpersonal/bill (3).jpg"); 
                addItemSlider("./elpersonal/bill (1).jpg");
            break
            case "PORTMOZ":
                addItemSlider("./elpersonal/portaelementos.jpg"); 
                addItemSlider("./elpersonal/pe (2).jpg");
                addItemSlider("./elpersonal/pe (3).jpg"); 
                addItemSlider("./elpersonal/pe (1).jpg");
            break


            //MERCHANDISING

            case "UNIC":

                addItemSlider("./merchandising/unico.jpg"); 
                addItemSlider("./merchandising/unic (2).jpg");
                addItemSlider("./merchandising/unic (3).jpg"); 
                addItemSlider("./merchandising/unic (1).jpg");
            break
            case "CLASIC":
                addItemSlider("./merchandising/clasico.jpg"); 
                addItemSlider("./merchandising/clasic (2).jpg");
                addItemSlider("./merchandising/clasic (3).jpg"); 
                addItemSlider("./merchandising/clasic (1).jpg");
            break

            //PACKAGING

            //Bolsas
            case "LIENZO":

                addItemSlider("./bolsas/lienzo.jpg"); 
                addItemSlider("./bolsas/lien (2).jpg");
                addItemSlider("./bolsas/lien (3).jpg"); 
                addItemSlider("./bolsas/lien (1).jpg");
            break
            case "BOLESP":
                addItemSlider("./bolsas/bolespecial.jpg"); 
                addItemSlider("./bolsas/bolesp (2).jpg");
                addItemSlider("./bolsas/bolesp (3).jpg"); 
                addItemSlider("./bolsas/bolesp (1).jpg");
            break


            //Cajas
            case "MADYCUER":
                addItemSlider("./cajas/mcuero.jpg"); 
                addItemSlider("./cajas/mc (2).jpg");
                addItemSlider("./cajas/mc (3).jpg"); 
                addItemSlider("./cajas/mc (1).jpg");
            break
            case "CARTPREM":
                addItemSlider("./cajas/cartonprem.jpg"); 
                addItemSlider("./cajas/cp (2).jpg");
                addItemSlider("./cajas/cp (3).jpg"); 
                addItemSlider("./cajas/cp (1).jpg");
            break


            //MARROQUINERIA

            case "MATE":
                addItemSlider("./marroquineria/materos.jpg"); 
                addItemSlider("./marroquineria/mate (2).jpg");
                addItemSlider("./marroquineria/mate (1).jpg");
            break
            case "MOCHILA":
                addItemSlider("./marroquineria/mochila.jpg"); 
                addItemSlider("./marroquineria/moch (2).jpg");
                addItemSlider("./marroquineria/moch (3).jpg"); 
                addItemSlider("./marroquineria/moch (1).jpg");
            break
            case "BOLSO":
                addItemSlider("./marroquineria/bolso.jpg"); 
                addItemSlider("./marroquineria/bol (2).jpg");
                addItemSlider("./marroquineria/bol (3).png"); 
                addItemSlider("./marroquineria/bol (1).jpg");
            break
            case "BOLSOBOTELLA":
                addItemSlider("./marroquineria/bolsobot.jpg"); 
                addItemSlider("./marroquineria/bolbot (2).jpg");
                addItemSlider("./marroquineria/bolbot (3).jpg"); 
                addItemSlider("./marroquineria/bolbot (1).jpg");
            break
            case "NECESER":
                addItemSlider("./marroquineria/neceser.jpg"); 
                addItemSlider("./marroquineria/nec (2).jpg");
                addItemSlider("./marroquineria/nec (3).jpg"); 
                addItemSlider("./marroquineria/nec (1).jpg");
            break
            case "RIÑO":
                addItemSlider("./marroquineria/riño.jpg"); 
            break


            //TEXTILES
            case "REME":
                addItemSlider("./textiles/remera.jpg"); 
                addItemSlider("./textiles/rem (2).jpg");
                addItemSlider("./textiles/rem (3).jpg"); 
                addItemSlider("./textiles/rem (1).jpg");
            break
            case "GORRA":
                addItemSlider("./textiles/gorras.jpg"); 
                addItemSlider("./textiles/gor (2).jpg");
                addItemSlider("./textiles/gor (3).jpg"); 
                addItemSlider("./textiles/gor (1).jpg");
            break
            case "CHOM":
                addItemSlider("./textiles/chomba.jpg"); 
                addItemSlider("./textiles/chom (2).jpg");
                addItemSlider("./textiles/chom (3).jpg"); 
                addItemSlider("./textiles/chom (1).jpg");
            break
            case "DELAN":
                addItemSlider("./textiles/delantales.jpg"); 
                addItemSlider("./textiles/del (2).jpg");
                addItemSlider("./textiles/del (3).jpg"); 
                addItemSlider("./textiles/del (1).jpg");
            break

            //PROYECTOS ESPECIALES
            case "CAJASMIR":
                addItemSlider("./pe/caja smir.jpg");
                addItemSlider("./pe/smir (1).jpg");
               
            break
            case "CAJAGOR":
                addItemSlider("./pe/gordon.jpg");
            break
            case "PACKSUS":
                addItemSlider("./pe/centurion.jpg");
                addItemSlider("./pe/ps (1).jpg");
                addItemSlider("./pe/ps (2).jpg");
                addItemSlider("./pe/ps (3).jpg");
            break
            case "LLCUER":
                addItemSlider("./pe/llavero cuero.jpg");
            break
            case "TYC":
                addItemSlider("./pe/telaycuero.jpg");
                addItemSlider("./pe/tyc (1).jpg");
                addItemSlider("./pe/tyc (2).jpg");
                
            break
            case "CANSMIR":
                addItemSlider("./pe/canasta smir.jpg");
            break
        }

        
        
    }));

    

      const swiper2=  new Swiper('.swiperMENU', {
       // Optional parameters
       direction: 'horizontal',
       loop: true,
       
       // If we need pagination
       pagination: {
         el: '.swiper-pagination2',
       },
     
       
       navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      });
         
   
        
})(jQuery);