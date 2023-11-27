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

  /* label devient badge */
    $(".label-default").removeClass("label").removeClass("label-default").addClass("badge text-bg-dark")
    $(".label-primary").removeClass("label").removeClass("label-primary").addClass("badge text-bg-primary")
    $(".label-secondary-1").removeClass("label").removeClass("label-secondary-1").addClass("badge text-bg-secondary-1")
    $(".label-secondary-2").removeClass("label").removeClass("label-secondary-2").addClass("badge text-bg-secondary-2")
    $(".label-success").removeClass("label").removeClass("label-success").addClass("badge text-bg-success")
    $(".label-info").removeClass("label").removeClass("label-info").addClass("badge text-bg-info")
    $(".label-warning").removeClass("label").removeClass("label-warning").addClass("badge text-bg-warning")
    $(".label-danger").removeClass("label").removeClass("label-danger").addClass("badge text-bg-danger")

  const convertingAddingClass= {
    '.collapse.in': 'show',
    '.panel-group': 'accordion',
    '.panel-group > .panel': 'accordion-item',
    '.panel-group > .panel > .panel-heading': ['accordion-header','accordion-button'],
    '.panel-group > .panel > .panel-collapse': 'accordion-collapse',
    '.panel-group > .panel > .panel-collapse > .panel-body': 'accordion-body',
  }
  Object.entries(convertingAddingClass)
    .forEach(([origin,newValue])=>{
      document.querySelectorAll(origin).forEach((e)=>{
        const vals = Array.isArray(newValue) ? newValue : [newValue]
        vals.forEach((v)=>{
          e.classList.add(v)
        })
      })
    })
  const convertingAttrs = {
    'data-toggle': {
      criteron: 'collapse',
      newname: 'data-bs-toggle',
      replace: true
    },
    'data-parent': {
      newname: 'data-bs-parent',
      replace: true
    },
    'data-target': {
      newname: 'data-bs-target',
      replace: true
    }
  }
  Object.entries(convertingAttrs)
    .forEach(([origin,data])=>{
        document.querySelectorAll(`[${origin}${data?.criteron?.length > 0 ? `="${data.criteron}"` : ''}]`).forEach((e)=>{
          if (data?.remove !== true){
            e.setAttribute(
              data.newname,
              data?.newcriteron
                ?? data?.criteron
                ?? e.getAttribute(origin)
            )
          }
          if (data?.remove === true || data?.replace === true){
            e.removeAttribute(origin)
          }
      })
    })
});
