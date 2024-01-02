/*
 * This file is part of the YesWiki Theme bs5margot.
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * create and execute a function to mak the code private
 */
(function(){
  /**
   * create a function modifiying the DOM to maintain compatibility oh HTML Bootstrap3 with 
   * html bootstrap 5
   */

  /**
   * set helpers
   */
  const getTopNav = () => {
    return document.getElementById('yw-topnav')
  }

  const getSiblings = (nodeElement,query) => {
    return nodeElement?.parentNode?.querySelectorAll(query) ?? null
  }

  const addClassAlias = (correspondances) => {
    Object.entries(correspondances)
    .forEach(([origin,newValue])=>{
      document.querySelectorAll(origin).forEach((e)=>{
        const vals = Array.isArray(newValue) ? newValue : [newValue]
        vals.forEach((v)=>{
          e.classList.add(v)
        })
      })
    })
  }

  const convertAttr = (params)=>{
    Object.entries(params)
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
  }

  /**
   * configure Top Nav
   */
  const configureTopNav = () => {
    const topNav = getTopNav()
    const navbarCollapse = topNav.querySelector('.navbar-collapse:not(#navbarSupportedContent)')
    navbarCollapse?.setAttribute('id','navbarSupportedContent')

    navbarCollapse?.querySelectorAll('.navbar-nav > li:not(.nav-item)')?.forEach((item) => {
      item.classList.add('nav-item')
    })

    navbarCollapse?.querySelectorAll('.navbar-nav > li > a:not(.nav-link)')?.forEach((item) => {
      item.classList.add('nav-link')
    })
  }

  const setOnlyOneLevel = () => {
    const topNav = getTopNav()
    const topNavDropdownMenus = topNav.querySelectorAll('div > ul.nav.navbar-nav > li > ul.dropdown-menu')
    topNavDropdownMenus?.forEach((item) => {
        const siblingLinks = getSiblings(item,'a')
        const firstSiblingLink = siblingLinks?.[0] ?? null
        const href = firstSiblingLink?.getAttribute('href') ?? ''
        if (firstSiblingLink && !firstSiblingLink?.classList?.contains('already-dropdown-updated')){
          firstSiblingLink.classList.add('already-dropdown-updated')
          if (!(href?.length > 0) || href === '#'){
            const links = item?.querySelectorAll('li > a[href^="http"]') ?? null
            const firstLink = links?.[0] ?? null
            const firstHref = firstLink?.getAttribute('href') ?? ''
            if (firstHref?.length > 0){
              firstSiblingLink.setAttribute('href',firstHref)
            }
          }
          if (firstSiblingLink?.hasAttribute('data-bs-toggle')){
            firstSiblingLink.removeAttribute('data-toggle')
          }
          if (firstSiblingLink?.hasAttribute('data-bs-toggle')){
            firstSiblingLink.removeAttribute('data-toggle')
          }
          if (firstSiblingLink?.classList?.contains('dropdown-toggle')){
            firstSiblingLink.classList.remove('dropdown-toggle')
          }
          if (firstSiblingLink?.parentNode?.classList?.contains('dropdown')){
            firstSiblingLink.parentNode.classList.remove('dropdown')
          }
        }
      }
    )
  }

  /**
   * dropdown
   */
  const manageDropDown = () => {
    document.querySelectorAll('.dropdown-toggle:not([data-bs-toggle=dropdown])')?.forEach((item) => {
        item.setAttribute("data-bs-toggle","dropdown")
        item.setAttribute("role","button")
        item.setAttribute("aria-expanded","false")
      }
    )
    document.querySelectorAll('.dropdown-menu > li > a:not(.dropdown-item)').forEach((item) => {
        item?.classList?.add("dropdown-item")
      }
    )
  }

  /**
   * manage sidebar buttons
   */
  const manageSidebarbutton = () => {
    document.querySelectorAll('.theme-sidebar > a:not(.sidebar-updated),.theme-sidebar > .include > a:not(.sidebar-updated)')?.forEach((item) => {
        item?.classList.add('sidebar-updated')
        const txt = item?.innerText ?? ''
        const icon = item?.querySelector('i') ?? null

        // clean
        while (item.hasChildNodes()) {
          item.removeChild(item.firstChild);
        }
        if (txt.length > 0){
          const spanChild = document.createElement('span')
          spanChild.appendChild(
            document.createTextNode(txt)
          )
          item.appendChild(spanChild)
        }
        const formattedIcon = icon ?? document.createElement('i')
        if (!icon){
          formattedIcon.classList.add('fas')
          formattedIcon.classList.add('fa-link')
        }
        item.appendChild(formattedIcon)
      }
    )
  }

  /**
   * manage modals closing alias
   */
  const manageModalsClosing = () => {
    document.addEventListener('click',(event)=>{
      const target = event.target
      if (target?.classList.contains('close')
        && target?.hasAttribute('data-dismiss')
        && target?.getAttribute('data-dismiss') === 'modal'){
        event.preventDefault()
        event.stopPropagation()
        target.removeAttribute('data-dismiss')
        target.setAttribute('data-bs-dismiss','modal')
        target.dispatchEvent(new MouseEvent('click'))
      }
    })
  }

  /**
   * main process
   */
  const mainFunc = (firstCall = false) => {
    if (firstCall === true){
      manageModalsClosing()
      manageSidebarbutton()
    }
    configureTopNav()
    setOnlyOneLevel()
    manageDropDown()

    addClassAlias({
      '.collapse.in': 'show',
      // '.panel-group': 'accordion',
      // '.panel-group > .panel': 'accordion-item',
      // '.panel-group > .panel > .panel-heading': ['accordion-header','accordion-button'],
      // '.panel-group > .panel > .panel-collapse': 'accordion-collapse',
      // '.panel-group > .panel > .panel-collapse > .panel-body': 'accordion-body',
    })

    convertAttr({
      'data-toggle': {
        criteron: ['collapse','tab','modal'],
        newname: 'data-bs-toggle',
        replace: true
      },
      'data-dismiss': {
        criteron: ['modal'],
        newname: 'data-bs-dismiss',
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
    })
  }

  // run once after DOMContentLoaded (after bootstrap if missing things)
  document.addEventListener('DOMContentLoaded', mainFunc)

  // run once now (before bootsrap)
  mainFunc(true)

})()
