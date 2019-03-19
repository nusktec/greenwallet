
$(document).ready(function (){

    'use strict';
/*  
  -----------------------------------------
  ----------| NAVIGATION |-----------------
  -----------------------------------------
  */
      var win = $(window);
            

      win.on("scroll", function () {
      var wScrollTop  = $(window).scrollTop();    
        
        if (wScrollTop > 10) {
            $("#pageHeader").addClass("shrink");
        } else {
            $("#pageHeader").removeClass("shrink");
        }
    });

     // Bootstrap Scroll Spy //
       
    $("body").scrollspy({
        target: ".navbar-collapse",
        offset: 70
    });
    
     // Collapse navigation on click on nav anchor in Mobile //
       
    $(".nav a").on('click', function () {
        $("#myNavbar").removeClass("in").addClass("collapse");
    });

     // navbar Scroll //
     
    $(".navbar-nav li a, .navbar-brand, .button a").on("click", function (e) {
        var anchor = $(this);
        $("html, body").stop().animate({
            
            scrollTop: $(anchor.attr("href")).offset().top - 60
        }, 1000);
        e.preventDefault();
    });
  
   $(".sidebar-menu ul li a, .side .a-btn").on("click", function (e) {
        var anchor = $(this);
        $("html, body").stop().animate({
            
            scrollTop: $(anchor.attr("href")).offset().top
        }, 1000);
        e.preventDefault();
    });
    
    $('.sidebar-menu .fa-times').on('click', function () {
        $('.sidebar-menu').addClass('hide-menu');
        $('.toggle-menu .fa').removeClass('hide-toggle');
    });
    
    $('.toggle-menu .fa').on('click', function () {
        $('.sidebar-menu').removeClass('hide-menu');
        $(this).addClass('hide-toggle');
    });
   /*-------------------------------------
      Counter
    -------------------------------------*/

    $('.counter').counterUp({
      delay: 10,
      time: 800
    });
      $("#testimonial-slider").owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 800,
      paginationSpeed: 800,
      smartSpeed: 500,
      autoplay: true,
      singleItem: true,
      dots: true,
      loop: true,
      responsive:{
        0:{
          items:1
        },
        680:{
          items:1
        },
        1000:{
          items:2
        }
      }
    });
      $("#portfolio-slider").owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 800,
      navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      paginationSpeed: 800,
      smartSpeed: 500,
      autoplay: false,
      singleItem: true,
      nav:true,
      dots: false,
      loop: true,
      responsive:{
        0:{
          items:1
        },
        680:{
          items:2
        },
        1000:{
          items:3
        }
      }
    });

      $("#client-caro").owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 800,
      paginationSpeed: 800,
      smartSpeed: 500,
      autoplay: true,
      singleItem: true,
      dots:false,
      loop: true,
      responsive:{
        0:{
          items:2
        },
        380:{
          items:3
        },
        680:{
          items:4
        },
        1000:{
          items:6
        }
      }
    });

      $("#gallery-owl").owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 800,
      navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      paginationSpeed: 800,
      smartSpeed: 500,
      autoplay: false,
      singleItem: true,
      nav:true,
      dots: false,
      loop: true,
      responsive:{
        0:{
          items:1
        },
        680:{
          items:1
        },
        1000:{
          items:2
        }
      }
    });

   //Protfolio popup
    $('.portfolio-gallery-set').magnificPopup({
     type: 'image',
        gallery:{
    enabled:true
    }

    });

   //Protfolio popup
    $('.project-popup').magnificPopup({
     type: 'image',
        gallery:{
    enabled:true
    }

    });
    //Type js for text animation 
    var element = $(".element");
    $(function() {
      element.typed({
        strings: ["We help you buy food directly from farmers and local food producers...", "That means time/energy/cost savings, convenience", "and access to fresh and quality food (no adulteration), increased productivity, good health/nutrition and prosperity...", "Buying locally produced food means increased prosperity, both individually and nationally."],
        typeSpeed: 100,
        loop: true,
      });
    });
     $(window).on('load', function() {
           $("#preloader").fadeOut(300);
        });
});
      
   /*-------------------------------------
      Google Map
    -------------------------------------*/       
      var marker;

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: {lat: 22.362561, lng: 91.819757}
        });
        
        marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: 22.362561, lng: 91.819757}
        });
        marker.addListener('click', toggleBounce);
      }

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      $(window).on('load', function() {
           $("#preloader").fadeOut(300);
     });
