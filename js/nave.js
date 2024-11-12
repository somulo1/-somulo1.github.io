(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Closes responsive menu when scrolling
    $(window).scroll(function() {
      if ($('.navbar-collapse').hasClass('show')) {
        $('.navbar-collapse').collapse('hide');
      }
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#sideNav'
    });
    
   // Disable right-click
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    
    // Disable keyboard shortcuts for inspect tools and copying (e.g., Ctrl+Shift+I, Ctrl+C, Ctrl+U, F12)
    document.addEventListener('keydown', function (e) {
      // List of key combinations to prevent
      if (
          e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 'v' || e.key === 's' || e.key === 'p' || e.key === 'a') || // Ctrl + U/C/V/S/P/A
          (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'j')) || // Ctrl + Shift + I/J
          (e.key === 'F12') // F12 for DevTools
      ) {
          e.preventDefault();
      }
    });
    
    // Prevent text selection and copying
    document.addEventListener('selectstart', function (e) {
      e.preventDefault();
    });
    
    document.addEventListener('copy', function (e) {
      e.preventDefault();
    });
    
    // Disable dragging images or other elements
    document.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
    
  })(jQuery); // End of use strict
