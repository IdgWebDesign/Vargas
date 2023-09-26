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


    document.getElementById("close").addEventListener('click', () => {

        $('.popON').addClass("popOFF");
    
    
    
    
    
       });
    
      
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


    document.querySelectorAll(".act").forEach(El => El.addEventListener('click', () => {
        document.querySelector(".ContEmergenteSlider").style.display = "block";

        var ProductClass= El.id;
        var URL1= " ";
        var URL2= " ";
        var URL3= " ";
        var URL4= " ";

        switch (ProductClass){

            //ARTE-PRODUCCION

            //Cartas de Menú
            case "OPERA":  
                URL1="./cartasmenu/lineaopera.jpg";
                URL2="./cartasmenu/lo(2).jpg";
                URL3="./cartasmenu/lo(3).jpg";
                URL4="./cartasmenu/lo(1).jpg";
            break;
            case "BLUES":
                URL1="./cartasmenu/lineablues.jpg";
                URL2="./cartasmenu/lb(2).jpg";
                URL3="./cartasmenu/lb(3).jpg  ";
                URL4="./cartasmenu/lb(1).jpg ";
            break
            case "SPECIAL":
                URL1="./cartasmenu/especiales.jpg";
                URL2="./cartasmenu/esp(2).jpg";
                URL3="./cartasmenu/esp(3).jpg";
                URL4="./cartasmenu/esp(1).jpg";
            break
            case "JAZZ":
                URL1="./cartasmenu/lineajazz.jpg";
                URL2="./cartasmenu/lj (2).jpg";
                URL3="./cartasmenu/lj (3).jpg";
                URL4="./cartasmenu/lj (1).jpg ";
            break
            case "TAP":
                URL1="./cartasmenu/lineatap.jpg";
                URL2="./cartasmenu/lt (2).jpg";
                URL3="./cartasmenu/lt (3).jpg";
                URL4="./cartasmenu/lt (1).jpg ";
            break

            //La mesa
            case "CUBRES":
                URL1="./lamesa/cubresindividuales.jpg";
                URL2="./lamesa/cubind (1).jpg";
                URL3="./lamesa/cubind (2).jpg";
                URL4="./lamesa/cubind (3).jpg";
            break
            case "BANDEJA":
                URL1="./lamesa/bandeja.jpg";
                URL2="./lamesa/b (1).jpg";
                URL3="./lamesa/b (2).jpg";
                URL4="./lamesa/b (3).jpg";
            break
            case "PORTAD":
                URL1=" ./lamesa/portad.jpg";
                URL2="./lamesa/portad (1).jpg";
                URL3="./lamesa/portad (2).jpg";
                URL4="./lamesa/portad (3).jpg";
            break
            case "PORTEL":
                URL1="./lamesa/portaelementos.jpg";
                URL2="./lamesa/portel (1).jpg";
                URL3="./lamesa/portel (2).jpg";
                URL4="./lamesa/portel (3).jpg";
            break
            case "ORO":
                URL1="./lamesa/librodeoro.jpeg";
                URL2="./lamesa/ldo (1).jpg";
                URL3="./lamesa/ldo (2).jpg";
                URL4="./lamesa/ldo (3).jpg";
            break
            case "CUERO":
                URL1="./lamesa/mantelescuero.jpg";
                URL2="./lamesa/mc (1).jpg";
                URL3="./lamesa/mc (2).jpg";
                URL4="./lamesa/mc (3).jpg";
            break

            case "TENT":
                URL1="./lamesa/reservado.jpg";
                URL2="./lamesa/res (1).jpg";
                URL3="./lamesa/res (2).png";
                URL4="./lamesa/res (3).jpg";
            break
            case "TELA":
                URL1="./lamesa/mantelestela.jpg";
                URL2="./lamesa/mt (1).jpg";
                URL3="./lamesa/mt (2).jpg";
                URL4="./lamesa/mt (3).jpg";
            break
            case "PORTEL":
                URL1="./lamesa/portaelementos.jpg";
                URL2="./lamesa/portel (1).jpg";
                URL3="./lamesa/portel (2).jpg";
                URL4="./lamesa/portel (3).jpg";
            break
            case "PAN":
                URL1="./lamesa/paneras.jpg";
                URL2="./lamesa/pan (1).jpeg";
                URL3="./lamesa/pan (2).jpg";
                URL4="./lamesa/pan (3).jpg";
            break
            case "VAJILLA":
                URL1="./lamesa/vajillalogo.jpg";
                URL2="./lamesa/vl (1).jpeg";
                URL3="./lamesa/vl (2).jpeg";
                URL4="./lamesa/vl (3).jpeg";
            break
            case "SERVILLETAS":
                URL1="./lamesa/serv.jpg";
                URL2="./lamesa/serv (1).jpg";
                URL3="./lamesa/serv (1).png";
                URL4="./lamesa/serv (2).jpg";
            break
            case "COPA":
                URL1="./lamesa/copalogo.jpg";
                URL2="./lamesa/cl (1).jpg";
                URL3="./lamesa/cl (2).jpg";
                URL4="";
            break

            //La Barra
            case "BRMS":
                URL1="./labarra/barmat.jpg";
                URL2="./labarra/brmts (1).jpg";
                URL3="./labarra/brmts (2).jpg";
                URL4="./labarra/brmts (3).jpg";
            break
            case "FRAP":
                URL1="./labarra/frapera.jpg";
                URL2="./labarra/fp (1).jpg";
                URL3="./labarra/fp (2).jpg";
                URL4="./labarra/fp (3).jpg";
            break

            //El personal
            case "DELANTALES":
                URL1="./elpersonal/delantal.jpg";
                URL2="./elpersonal/del (1).jpg";
                URL3="";
                URL4="";
            break
            case "BILL":
                URL1="./elpersonal/billetera.jpg";
                URL2="./elpersonal/bill (1).jpg";
                URL3="./elpersonal/bill (2).jpg";
                URL4="./elpersonal/bill (3).jpg";
            break
            case "PORTMOZ":
                URL1="./elpersonal/portaelementos.jpg";
                URL2="./elpersonal/pe (1).jpg";
                URL3="./elpersonal/pe (2).jpg";
                URL4="./elpersonal/pe (3).jpg";
            break


            //MERCHANDISING

            case "UNIC":
                URL1="./merchandising/unico.jpg";
                URL2="./merchandising/unic (1).jpg";
                URL3="./merchandising/unic (2).jpg";
                URL4="./merchandising/unic (3).jpg";
            break

            //PACKAGING

            //Bolsas
            case "LIENZO":
                URL1="./bolsas/lienzo.jpg";
                URL2="./bolsas/lien (1).jpg";
                URL3="./bolsas/lien (2).jpg";
                URL4="./bolsas/lien (3).jpg";
            break
            case "BOLESP":
                URL1="./bolsas/bolespecial.jpg";
                URL2="./bolsas/bolesp (1).jpg";
                URL3="./bolsas/bolesp (2).jpg";
                URL4="./bolsas/bolesp (3).jpg";
            break


            //Cajas
            case "MADYCUER":
                URL1="";
                URL2="./cajas/mc (1).jpg";
                URL3="./cajas/mc (2).jpg";
                URL4="./cajas/mc (3).jpg";
            break
            case "CARTPREM":
                URL1="./cajas/cartonprem.jpg";
                URL2="./cajas/cp (1).jpg";
                URL3="./cajas/cp (2).jpg";
                URL4="./cajas/cp (3).jpg";
            break


            //MARROQUINERIA

            case "MATE":
                URL1="./marroquineria/materos.jpg";
                URL2="./marroquineria/mat (1).jpg";
                URL3="./marroquineria/mat (2).jpg";
                URL4="./marroquineria/mat (3).jpg";
            break
            case "MOCHILA":
                URL1="";
                URL2="./marroquineria/moch (1).jpg";
                URL3="./marroquineria/moch (2).jpg";
                URL4="./marroquineria/moch (3).jpg";
            break
            case "BOLSO":
                URL1="./marroquineria/bolso.jpg";
                URL2="./marroquineria/bol (1).jpg";
                URL3="./marroquineria/bol (2).jpg";
                URL4="";
            break
            case "BOLSOBOTELLA":
                URL1="./marroquineria/bolsobot.jpg";
                URL2="./marroquineria/bolbot (1).jpg";
                URL3="./marroquineria/bolbot (2).jpg";
                URL4="./marroquineria/bolbot (3).jpg";
            break
            case "NECESER":
                URL1="./marroquineria/neceser.jpg";
                URL2="./marroquineria/nec (1).jpg";
                URL3="./marroquineria/nec (2).jpg";
                URL4="./marroquineria/nec (3).jpg";
            break


            //TEXTILES
            case "REME":
                URL1="./textiles/remera.jpg";
                URL2="./textiles/rem (1).jpg";
                URL3="./textiles/rem (2).jpg";
                URL4="./textiles/rem (3).jpg";
            break
            case "GORRA":
                URL1="";
                URL2="./textiles/gor (1).jpg";
                URL3="./textiles/gor (2).jpg";
                URL4="";
            break
            case "CHOM":
                URL1="./textiles/chomba.jpg";
                URL2="./textiles/chom (1).jpg";
                URL3="./textiles/chom (2).jpg";
                URL4="";
            break

            //PROYECTOS ESPECIALES
            case "CAJASMIR":
                URL1="pe/caja smir.jpg";
            break
            case "CAJAGOR":
                URL1="pe/gordon.jpg";
            break
            case "PACKSUS":
                URL1="pe/centurion.jpg";
            break
            case "LLCUER":
                URL1="pe/llavero cuero.jpg";
            break
            case "TYC":
                URL1="pe/telaycuero.jpg";
            break
            case "CANSMIR":
                URL1="pe/canasta smir.jpg";
            break
        }

        document.getElementById("E1").src=URL1;
        document.getElementById("E2").src=URL2;
        document.getElementById("E3").src=URL3;
        document.getElementById("E4").src=URL4;
    }));

    

      const swiper2=  new Swiper('.swiperMENU', {
       // Optional parameters
       direction: 'horizontal',
       loop: true,
       
       // If we need pagination
       pagination: {
         el: '.swiper-pagination2',
       },
     
       // Navigation arrows
       navigation: {
         nextEl: '.swiper-button-next2',
         prevEl: '.swiper-button-prev2',
       },
     
       // And if we need scrollbar
       scrollbar: {
         el: '.swiper-scrollbar2',
       },
      });
         
   
        
})(jQuery);