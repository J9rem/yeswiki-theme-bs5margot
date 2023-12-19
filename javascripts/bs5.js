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

  // only one level
  $('#yw-topnav div > ul.nav.navbar-nav > li > ul.dropdown-menu').each(function(){
    const firstSiblingLink = $(this).siblings('a').first()
    const href = firstSiblingLink?.attr('href') ?? ''
    if (firstSiblingLink?.length > 0){
      if (!(href?.length > 0) || href === '#'){
        const firstLink = $(this).find('li > a[href^="http"]').first()
        const firstHref = firstLink?.attr('href') ?? ''
        if (firstHref?.length > 0){
          firstSiblingLink.attr('href',firstHref)
        }
      }
      firstSiblingLink.removeAttr('data-bs-toggle')
      firstSiblingLink.removeAttr('data-toggle')
      firstSiblingLink.removeClass('dropdown-toggle')
      firstSiblingLink.parent().removeClass('dropdown')
    }
  })

  // manage dropdown 
  $(".dropdown-toggle").attr("data-bs-toggle","dropdown").attr("role","button").attr("aria-expanded","false")
  $(".dropdown-menu > li > a").addClass("dropdown-item")

  // sidebar button
  $(".theme-sidebar > a,.theme-sidebar > .include > a").each(function(){
    const txt = $(this).text()
    const formattedTxt = txt.length > 0 ? `<span>${txt}</span>` : ''
    const icon = $(this).find('i').first()
    const formattedIcon = icon.length === 0 ? `<i class="fas fa-link"></i>` : icon
    $(this).html('')
    $(this).append(formattedTxt)
    $(this).append(formattedIcon)
  })

  const convertingAddingClass= {
    '.collapse.in': 'show',
    // '.panel-group': 'accordion',
    // '.panel-group > .panel': 'accordion-item',
    // '.panel-group > .panel > .panel-heading': ['accordion-header','accordion-button'],
    // '.panel-group > .panel > .panel-collapse': 'accordion-collapse',
    // '.panel-group > .panel > .panel-collapse > .panel-body': 'accordion-body',
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
      criteron: ['collapse','tab'],
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
        const query = 
          (
            Array.isArray(data?.criteron)
            ? data.criteron
            : ([data?.criteron ?? ''])
          ).map((crit)=>`[${origin}${crit?.length > 0 ? `="${crit}"` : ''}]`)
          .join(',')
        document.querySelectorAll(query).forEach((e)=>{
          if (data?.remove !== true){
            e.setAttribute(
              data.newname,
              data?.newcriteron
                ?? e.getAttribute(origin)
            )
          }
          if (data?.remove === true || data?.replace === true){
            e.removeAttribute(origin)
          }
      })
    })
})
