const SUBMIT_FORM_URL = "https://us-west2-riverviewfarm.cloudfunctions.net/send-contact-email";

/* This is for preloader chicken animation */
//Giving preloader enough time to render
$(window).on("load",function(){
$('#status').delay(300).fadeOut(); 
$('#preloader').delay(300).fadeOut('slow');
$('body').delay(550).css({'overflow':'visible'});
});

/* This is for the sticky navbar */
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

$('#contact-form').on('submit', function(e){
  const data = $('#contact-form').serializeJSON();
  e.preventDefault();
  $.ajax({
    type: "POST",
    processData: false,
    url: SUBMIT_FORM_URL,
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(res) {
      $('#contact-form').trigger("reset");
      alert('Thank you! Your message has been successfully sent.');
    },
    error: function(error) {
      console.log(error.status);
      console.log(error.responseText);
      alert(`Oops! There was a problem sending your message. ${error.status}: ${error.responseText}`);
    }
  });
});