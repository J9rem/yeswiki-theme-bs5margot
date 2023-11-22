document.addEventListener('DOMContentLoaded', function(event) {
    $("#yw-topnav .navbar-collapse") .attr("id","navbarSupportedContent")
   /* $("#navbarSupportedContent .navbar-nav").addClass("nav  justify-content-center mb-md-0")*/
    $("#navbarSupportedContent .navbar-nav > li").addClass("nav-item")
    $("#navbarSupportedContent .navbar-nav > li > a").addClass("nav-link")
    $(".dropdown-toggle").attr("data-bs-toggle","dropdown") .attr("role","button") .attr("aria-expanded","false")
    $(".dropdown-menu > li > a").addClass("dropdown-item")
    
    
});