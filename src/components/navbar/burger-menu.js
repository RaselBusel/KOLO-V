"use strict";

document.addEventListener('DOMContentLoaded', () => {

  let state = 'desktop';
  let burgerSelectors = [
    '.menu-toggle',
    '.menu-close',
    '.sidenav-overlay',
    '.navbar-cta',
    '.nav-link'
  ]

  // Driver: Toggle burger state on breakpoint-lg
  sizeWindowHandle();

  function sizeWindowHandle() {
    let windoWithFull = window.innerWidth;

     if (windoWithFull <= 1008 && state === 'desktop' ) {
       addEventListeners();
       state = 'mobile';
     } else if (windoWithFull > 1008 && state === 'mobile' ) {
       delEventListeners();
       state = 'desktop';
     }

     return document.addEventListener("resize", sizeWindowHandle);
  }

  function addEventListeners() {
    burgerSelectors.forEach( e => {
      let navbarLinks = Array.prototype.slice.call(document.querySelectorAll(e), 0);
      navbarLinks.forEach(el => el.addEventListener('click', toggleContent));
    });
  }

  function delEventListeners() {
    burgerSelectors.forEach( e => {
      let navbarLinks = Array.prototype.slice.call(document.querySelectorAll(e), 0);
      navbarLinks.forEach(el => el.removeEventListener('click', toggleContent));
    });
  }

  function toggleContent(e) {
    let sideNavMenu = document.querySelector('.navbar-wrap');
    let bodyScroll = document.querySelector('body');

    e.preventDefault();

    if (sideNavMenu.getAttribute('aria-hidden') === 'true') {
        sideNavMenu.setAttribute('aria-hidden', 'false');
        bodyScroll.style.overflow = 'hidden';
        bodyScroll.style.marginRight = '16px';
    } else {
        sideNavMenu.setAttribute('aria-hidden', 'true');
        bodyScroll.style.overflow = '';
        bodyScroll.style.marginRight = '';
    }
  }
});
