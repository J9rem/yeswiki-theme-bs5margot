/*
 * This file is part of the YesWiki Theme bs5margot.
 * BUT IMPORTED from https://github.com/YesWiki/yeswiki-theme-margot
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var scrolldelta = 5;
var ywnavbar = $('#yw-topnav');
var navbarHeight = ywnavbar.outerHeight();
var minOffsetForHiding = 300;

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();
  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= scrolldelta)
    return;

  // If they scrolled down and are past the navbar, add class .nav - up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight && ywnavbar.hasClass('fixable') && st > minOffsetForHiding) {
    // Scroll Down
    ywnavbar.addClass('nav-up');
    ywnavbar.removeClass('nav-down');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      ywnavbar.addClass('nav-down');
      ywnavbar.removeClass('nav-up');
    }
  }

  lastScrollTop = st;
}
