/*
 * This file is part of the YesWiki Theme bs5margot.
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
document.addEventListener('DOMContentLoaded', function() {

  // configure topnav with new classes
  $("#yw-topnav .navbar-collapse").attr("id","navbarSupportedContent")
  $("#navbarSupportedContent .navbar-nav > li").addClass("nav-item")
  $("#navbarSupportedContent .navbar-nav > li > a").addClass("nav-link")

  // manage dropdown 
  $(".dropdown-toggle").attr("data-bs-toggle","dropdown").attr("role","button").attr("aria-expanded","false")
  $(".dropdown-menu > li > a").addClass("dropdown-item")

  const convertingAddingClass= {
    '.collapse.in': 'show'
  }
  Object.entries(convertingAddingClass)
    .forEach(([origin,newValue])=>{
      document.querySelectorAll(origin).forEach((e)=>{
        e.classList.add(newValue)
      })
    })
  const convertingAttrs = {
    'data-toggle': {
      criteron: 'collapse',
      newname: 'data-bs-toggle'
    },
    'data-parent': {
      newname: 'data-bs-parent'
    },
    'data-target': {
      newname: 'data-bs-target'
    }
  }
  Object.entries(convertingAttrs)
    .forEach(([origin,data])=>{
        document.querySelectorAll(`[${origin}${data?.criteron?.length > 0 ? `="${data.criteron}"` : ''}]`).forEach((e)=>{
          e.setAttribute(
            data.newname,
            data?.newcriteron
              ?? data?.criteron
              ?? e.getAttribute(origin)
          )
      })
    })
})
