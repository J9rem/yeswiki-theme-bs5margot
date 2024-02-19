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

  const convertData = (params)=>{
    Object.entries(params)
    .forEach(([origin,data])=>{
        const query = 
          (
            Array.isArray(data?.criteron)
            ? data.criteron
            : ([data?.criteron ?? ''])
          ).map((crit)=>`[data-${origin}${crit?.length > 0 ? `="${crit}"` : ''}]`)
          .join(',')
        document.querySelectorAll(query).forEach((e)=>{
          const oldName = `data-${origin}`
          const newName = `data-${data.newname}`
          const oldDatasetName = prepareForDatasetName(origin)
          const newDatasetName = prepareForDatasetName(data.newname)
          if (data?.remove !== true){
            const newValue = data?.newcriteron
              ?? e.getAttribute(oldName)
            e.setAttribute(newName,newValue)
            e.dataset[newDatasetName] = newValue
            if (origin === 'parent'){
              defineAlsoParentForPanel(e,newName,newValue,newDatasetName)
            }
          }
          if (data?.remove === true || data?.replace === true){
            e.removeAttribute(oldName)
            if (oldDatasetName in e.dataset){
              delete e.dataset[oldDatasetName]
            }
          }
      })
    })
  }

  const defineAlsoParentForPanel = (e,newName,newValue,newDatasetName) => {
    const href = e?.getAttribute('href') ?? ''
    if (href?.length > 1 && href.slice(0,1) === '#'){
      const panel = e?.parentNode?.querySelector(href)
      if (panel && !panel.hasAttribute(newName)){
        panel.setAttribute(newName,newValue)
        panel.dataset[newDatasetName] = newValue
      }
    }
  }

  const prepareForDatasetName = (datasetName) => {
    return datasetName.split('-').map((v,k)=>{
      const sanitizedV = v.toLowerCase()
      return k === 0 
        ? sanitizedV 
        : sanitizedV.slice(0,1).toUpperCase()+sanitizedV.slice(1)
    }).join('')
  }
  const configureTopNav = () => {

  /**
   * configure Top Nav
   */
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

  const addLinkToFirstChildIfText = (link,menu) => {
    const href = link?.getAttribute('href') ?? ''
    if (link && (!(href?.length > 0) || href === '#')){
      const links = menu?.querySelectorAll('li > a[href^="http"]') ?? null
      const firstLink = links?.[0] ?? null
      const firstHref = firstLink?.getAttribute('href') ?? ''
      if (firstHref?.length > 0){
        link.setAttribute('href',firstHref)
      }
    }

  }

  const cleanDropdownActionsOneLink = (link) => {
    ['data-bs-toggle','data-toggle'].forEach((attrName)=>{
      if (link?.hasAttribute(attrName)){
        link.removeAttribute(attrName)
      }
    })
    if (link?.classList?.contains('dropdown-toggle')){
      link.classList.remove('dropdown-toggle')
    }
    if (link?.parentNode?.classList?.contains('dropdown')){
      link.parentNode.classList.remove('dropdown')
    }
  }

  const createBtnGroup = ()=>{
    const btn = document.createElement('div')
    btn.classList.add('btn-group')
    return btn
  }
  const createDropdownBtn = ()=>{
    const btn = document.createElement('a')
    btn.classList.add('dropdown-toggle')
    btn.classList.add('dropdown-toggle-split')
    btn.setAttribute('data-bs-toggle','dropdown')
    btn.setAttribute('aria-expanded','false')
    btn.setAttribute('href','#')
    const span = document.createElement('span')
    span.classList.add('visually-hidden')
    span.innerText = 'Afficher le menu'
    btn.appendChild(span)
    return btn
  }

  const hideOtherLevels = (menu) => {
    menu?.querySelectorAll(':scope > li > ul')?.forEach((subMenu)=>{
      const firstLink = subMenu.parentNode.querySelector(':scope > a')
      addLinkToFirstChildIfText(firstLink,subMenu)
      cleanDropdownActionsOneLink(firstLink)
      subMenu.remove()
    })
  }

  const pushAfterANewDropdownButton = (link,menu) => {
    const btnGroup = createBtnGroup()
    link.insertAdjacentElement('beforebegin',btnGroup)
    btnGroup.appendChild(link)
    btnGroup.appendChild(createDropdownBtn())
    btnGroup.appendChild(menu)
    hideOtherLevels(menu)
  }

  const setFirstLevelSplitted = () => {
    const topNav = getTopNav()
    const topNavDropdownMenus = topNav.querySelectorAll('div > ul.nav.navbar-nav > li > ul.dropdown-menu')
    topNavDropdownMenus?.forEach((item) => {
        const siblingLinks = getSiblings(item,'a')
        const firstSiblingLink = siblingLinks?.[0] ?? null
        if (firstSiblingLink && !firstSiblingLink?.classList?.contains('already-dropdown-updated')){
          firstSiblingLink.classList.add('already-dropdown-updated')
          addLinkToFirstChildIfText(firstSiblingLink,item)
          cleanDropdownActionsOneLink(firstSiblingLink)
          pushAfterANewDropdownButton(firstSiblingLink,item)
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
   * tabs
   */
  const showATab = (href,tabContent) => {
    const base = $(tabContent).prev()
    const tabContentLink = $(base).find(`[href="${href}"]`)
    const tabContentItem = $(tabContent).find(href)
    if (tabContentLink?.length > 0 && tabContentItem?.length > 0){
      $(base).find('.active').removeClass('active')
      $(tabContentLink).addClass('active')
      $(tabContent).find('.active').removeClass('active')
      $(tabContent).find('.show').removeClass('show')
      $(tabContentItem).addClass('active')
      $(tabContentItem).addClass('show')
    }
    // manage iframe case
    if (window.location != parent.parent.location) {
      $('html, body').animate({ scrollTop: $(base).offset().top }, 500)
      try {
        $(base).get(0).scrollIntoView()
        window.parent.scrollBy(0,-80)
      } catch (error) {
      }
    } else {
      $('html, body').animate({ scrollTop: $(base).offset().top - 80 }, 500)
    }
  }
  const eventForTabNavigationButtons = (event) => {
    const target = event.target
    const tabContent = $(target).closest('.tab-content')
    const href = target?.hasAttribute('href') ? target?.getAttribute('href') : ''
    if (href?.length > 0){
      showATab(href,tabContent)
    }
  }
  const setUpdateLocationEvent = (element) => {
    $(element).on('show.bs.tab', function() {
      const stateObject = { url: $(this).attr('href') }

      if (window.location.hash && stateObject.url !== window.location.hash) {
        window.history.pushState(
          stateObject,
          document.title,
          window.location.pathname
            + window.location.search
            + $(this).attr('href')
        )
      } else {
        window.history.replaceState(
          stateObject,
          document.title,
          window.location.pathname
            + window.location.search
            + $(this).attr('href')
        )
      }
    })
  }
  const manageTabs = (firstCall) => {
    document.querySelectorAll('ul.nav[role=tablist] > li[role=presentation].active > a[role=tab]')?.forEach((item) => {
        item?.classList?.add('active')
      }
    )
    document.querySelectorAll('ul.nav[role=tablist] > li[role=presentation] > a[role=tab]')?.forEach((item) => {
        item?.classList?.add('nav-link')
      }
    )
    document.querySelectorAll('ul.nav[role=tablist] > li[role=presentation]')?.forEach((item) => {
        item?.classList?.add("nav-item")
        if (item?.classList?.contains('active')){
          item.classList.remove('active')
        }
      }
    )
    document.querySelectorAll('.tab-content [data-toggle="tab"]')?.forEach((item) => {
        if (firstCall){
          item?.addEventListener('click',eventForTabNavigationButtons)
        }
        item.removeAttribute('role')
        item.removeAttribute('data-toggle')
      }
    )
    
    if (firstCall){
      document.querySelectorAll('.nav-item > a.nav-link')?.forEach((item) => {
          setUpdateLocationEvent(item)
          const href = item?.hasAttribute('href') ? item?.getAttribute('href') : ''
          if (href.length > 0
            && window?.location?.hash?.length > 0
            && href === window.location.hash){
            const base = $(item).closest('.nav')
            showATab(href,$(base).next())
          }
        }
      )
    }
    
  }

  /**
   * manage sidebar buttons
   */
  const appendItemsToNavBarLinks = (items) => {
    const topNav = getTopNav()
    const navbarCollapse = topNav.querySelector('.navbar-collapse')
    if (navbarCollapse && items?.length > 0){
      const newBlock = document.createElement('ul')
      newBlock.classList.add('copy-of-sidebar')
      newBlock.classList.add('nav')
      newBlock.classList.add('navbar-nav')
      items?.forEach((item)=>{
        const li = document.createElement('li')
        li.classList.add('nav-item')
        item.classList?.remove('btn')
        item.classList?.remove('btn-default')
        item.classList?.remove('btn-primary')
        item.classList?.add('nav-link')
        li.append(item)
        newBlock.append(li)
      })
      navbarCollapse.append(newBlock)
    }
  }

  const manageSidebarbutton = () => {
    const sideBarItems = []
    document.querySelectorAll('.theme-sidebar > a:not(.sidebar-updated),.theme-sidebar > .include > a:not(.sidebar-updated)')?.forEach((item) => {
        item?.classList.add('sidebar-updated')
        const txt = (item?.textContent ?? item?.innerText ?? '')?.trim() ?? ''
        const icon = item?.querySelector('i') ?? null

        sideBarItems.push(item.cloneNode(true))

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
    appendItemsToNavBarLinks(sideBarItems)
  }

  /**
   * manage modals closing alias
   */
  const manageModalsClosing = () => {
    document.addEventListener('click',(event)=>{
      const target = event.target
      if ((
          target?.classList.contains('close')
          || target?.classList.contains('no-header-btn-close')
        )
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
    setFirstLevelSplitted()
    manageDropDown()
    manageTabs(firstCall)

    addClassAlias({
      '.collapse.in:not(.show)': 'show',
      // '.panel-group': 'accordion',
      // '.panel-group > .panel': 'accordion-item',
      // '.panel-group > .panel > .panel-heading': ['accordion-header','accordion-button'],
      // '.panel-group > .panel > .panel-collapse': 'accordion-collapse',
      // '.panel-group > .panel > .panel-collapse > .panel-body': 'accordion-body',
      
      // alias for glyphicon
      'i.glyphicon.glyphicon-chevron-right': ['fa','fa-chevron-right'],
      'i.glyphicon.glyphicon-chevron-left': ['fa','fa-chevron-left'],
      'i.glyphicon.glyphicon-book': ['fas','fa-file-pdf']
    })

    convertData({
      'toggle': {
        criteron: ['collapse','tab','modal'],
        newname: 'bs-toggle',
        replace: true
      },
      'dismiss': {
        criteron: ['modal'],
        newname: 'bs-dismiss',
        replace: true
      },
      'parent': {
        newname: 'bs-parent',
        replace: true
      },
      'target': {
        newname: 'bs-target',
        replace: true
      }
    })
  }

  // run once after DOMContentLoaded (after bootstrap if missing things)
  document.addEventListener('DOMContentLoaded', mainFunc)

  // run once now (before bootsrap)
  mainFunc(true)

})()
