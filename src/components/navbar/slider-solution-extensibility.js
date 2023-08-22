
"use strict";

document.addEventListener('DOMContentLoaded', () => {

  let prevIndex = 3,
      currIndex = 0,
      slidesList = [],
      slidesAmount,
      translationComplete = true,
      timer,
      selectBox;

  // Listen Event on selectBox class ="js-control-select"
  selectBox = document.querySelector(`#${'basicselect'}`);
  selectBox.addEventListener('change', toggleSlides);

  // Init sliding
  slidesList = Array.prototype.slice.call(document.querySelectorAll('.tab-link'), 0);
  slidesAmount = slidesList.length - 1;
  toggleSlides();                           // init first slide
  timer = setTimeout(carousel, 2000);       // start slides toggling

  // Listen Event on Tabs
  slidesList.forEach( el => {
    el.addEventListener('click', toggleSlides);
  });

  // Change transition state after toggle
  let link = document.querySelectorAll('a')
  link.forEach( el => {
    el.addEventListener('transitionend', transitionCompleted);
  });

  // Listen windowSize change to resize DIV container
  window.addEventListener("resize", cssGetSize);


  function toggleSlides(event) {
    let elCurr, targetCurr, slideCurr,
        elPrev, targetPrev, slidePrev;

    //Handle click on selectBox
    if (event && event.currentTarget.classList.contains('js-control-select')) {

      prevIndex = currIndex;
      currIndex = slidesList.findIndex( function(element) {
        if (element.dataset.target === event.currentTarget.value) {
          return true;
        }
        return false;
      })

       elCurr = slidesList[currIndex];
       clearTimeout(timer);
       timer = setTimeout(carousel, 3000);
       event.currentTarget.blur();
    }

    //Handle click on Tabs
    if (event && (translationComplete === true)
              && (!this.classList.contains('is-active'))) {

      elCurr = event.currentTarget;
      prevIndex = currIndex;
      currIndex = slidesList.indexOf(elCurr);

      clearTimeout(timer);
      timer = setTimeout(carousel, 3000);

    } else {
      elCurr = slidesList[currIndex];
      //translationComplete = false;
    }

    translationComplete = false;

    //Toggle slides block
    targetCurr = elCurr.dataset.target;
    slideCurr = document.querySelector(`#${targetCurr}`);

    elCurr.classList.add('is-active');
    slideCurr.classList.add('is-active');
    selectBox.options[currIndex].selected = true;

    elPrev = slidesList[prevIndex];
    targetPrev = elPrev.dataset.target;
    slidePrev = document.querySelector(`#${targetPrev}`);

    elPrev.classList.remove('is-active');
    slidePrev.classList.remove('is-active');

    // resize DIV container after every toggle slide
    // reason: slides have diff height
    cssGetSize();
  }

  // Auto toggling slides
  function carousel() {
    prevIndex = currIndex;
    currIndex++;

    if (currIndex > slidesAmount) {
      currIndex = 0;
    }

    toggleSlides();
    cssGetSize();
    timer = setTimeout(carousel, 5000);
  }

  function transitionCompleted() {
    translationComplete = true;
  }

  function cssGetSize() {
    let tabContentSpacer = document.querySelector('.tabs-content');
    tabContentSpacer.style.width = '';
    tabContentSpacer.style.heigth = '';

    let tabContentSize = document.querySelector('.tabs-container.is-active');
    let stylesComputed = getComputedStyle(tabContentSize);
    let heightSpacer = stylesComputed.height;

    tabContentSpacer = document.querySelector('.tabs-content');
    tabContentSpacer.style.height = heightSpacer;
  }
});
