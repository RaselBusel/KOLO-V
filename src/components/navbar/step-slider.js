"use strict";


document.addEventListener('DOMContentLoaded', () => {
  //let sectionMargin = 20;
  //let marginPos;      //TODO ---------------
  let buffer = 0;
  let scrollDelta;                              //  Show Scrolling direction (Up/Down)
  let section = document.querySelector('.section-complexity-slider');     //Section full
  let sectionMainTrack = document.querySelector('.section-complexity-slider .content-wrapper');                             // Track wrapper (img + track + list)
  let winPos;
  let currentPos;
  let isViewPortFull = false;                   // ViewportFull show full section height
  let isOnTrack = false;                        // Keep first income to track
  let points = document.querySelectorAll('.stop-point');    // Array of all DIV steps
  let thumb = document.querySelector('.draggable');         // Drag pointer ZONE step
  let thumbBtn = document.querySelector('.thumb-indicator');// Drag pointer Btn step
  let currentActive = 0;                                 // Active step position on track
  let trackLength = points.length - 1;                      // Number of all steps
  let isCurrentActiveChanged = false;
  //let mouseWheelTick = 0;                                   // Summary mouse wheel turns


  let slidesData =
  [
    {
      slideNumber: "0",
      id: "Manufacturers",
      featureList:
      [
        "Produce items",
        "Send to local distributors and warehouses",
        "See transparent logistics chain",
      ],
      imgSrc: "../../assets/images/fac16689_579.jpg",
    },
    {
      slideNumber: "1",
      id: "Logistics",
      featureList:
      [
        "On-time pickup and delivery of items from point-to-point",
        "Intelligence detects and prevents shipments delays",
        "Fast choosing the optimal route, time, vehicles",
      ],
      imgSrc: "../../assets/images/logist-3799679_101.jpg",
    },
    {
      slideNumber: "2",
      id: "Warehouses",
      featureList:
      [
        "Store and manage whole inventory from various manufactures",
        "AI in action to handle errors",
        "Customize workflows",
        "Push items to suppliers across the region",
      ],
      imgSrc: "../../assets/images/whole3799679_101.jpg",
    },
    {
      slideNumber: "3",
      id: "Suppliers and Resellers ",
      featureList:
      [
        "Make inventory decisions in place, in-demand",
        "Build store score, unique history",
        "Sell the right-quality rating-based items to your consumers",
      ],
      imgSrc: "../../assets/images/supplir1054503_23.jpg",
    },
    {
      slideNumber: "4",
      id: "Customers",
      featureList:
      [
        "Easily buy original products with our embedded Al",
        "No need for an investigation origin before",
        "Have fun with your own shopping experience",
      ],
      imgSrc: "../../assets/images/people131978-A-38.jpg",
    },
  ]

  // Block scroll if Slider on view
  //window.addEventListener("wheel", blockInView, {passive: false});    // ADD case ++
  // Block scroll works but key events function like wheel scroll
  window.addEventListener("scroll",  blockInView, {passive: false});

  // Handle DIV Block stop / start scrolling
  function blockInView (event) {
    // Y-center view position
    winPos = window.scrollY + document.documentElement.clientHeight / 2;

    if (section.offsetHeight <= document.documentElement.clientHeight) {
      currentPos = section.offsetTop + section.offsetHeight / 2;
      isViewPortFull = true;
    }
    else if (section.offsetHeight > document.documentElement.clientHeight) {
      currentPos = section.offsetTop + sectionMainTrack.offsetTop + sectionMainTrack.offsetHeight / 2;
    }

    // Logger
    //winPos >= currentPos ? console.log('InView') : console.log('false');


    // Set catch ZONE for win center position
    if  ((winPos >= (currentPos - 10)) && (winPos <= (currentPos + 10)) ) {   // &&

      window.addEventListener('scroll', handleScroll, false);
      //window.addEventListener('wheel', onMouseScroll, false);

      window.addEventListener('scroll', handleEvent, false);
      window.addEventListener('mousewheel', handleEvent, false);
      window.addEventListener('touchmove', handleEvent, false);
    }

    if (Math.abs(buffer) > 250) {

      let currentWinScrollPos = window.scrollY;
      //window.removeEventListener("wheel", blockInView, {passive: false});
      window.removeEventListener('scroll', handleScroll, false);
      //window.removeEventListener('wheel', onMouseScroll, false);

      window.removeEventListener('scroll', handleEvent, false);
      window.removeEventListener('mousewheel', handleEvent, false);
      window.removeEventListener('touchmove', handleEvent, false);



      if (event.wheelDelta || scrollDelta > 0) {
        window.scrollTo(0, currentWinScrollPos - 12);
      } else  {                                         //if (event.wheelDelta < 0)
        window.scrollTo(0, currentWinScrollPos + 12);
      }
      buffer = 0;
    }
  }


  let scrollPosLast;
  let scrollPosCurr;
  let timerId;

  function handleScroll(e) {
    //console.log(e);
    //if (e.wheelDelta) console.log(`MouseScroll`);
    //if (e.code) console.log(`KeyBoardPress`);

    if (scrollPosLast) {
      scrollPosCurr = window.scrollY;
      throttleScroll(scrollPosCurr, 1300);
    }

    if (isViewPortFull) {
      section.scrollIntoView({block: "center"});
    } else {
      sectionMainTrack.scrollIntoView({block: "center"});
    }

    scrollPosLast = window.scrollY;
  };


  function throttleScroll(scrollPosCurr, delay) {

    if (timerId) {
      return;
    }

    if (scrollPosCurr > scrollPosLast && isOnTrack) {
      console.log("down throttlescroll")

      currentActive++;
      isCurrentActiveChanged = true;

      // If last step GO DOWN out track
      if (currentActive > trackLength) {
        currentActive = trackLength;
        buffer = 260;
        scrollDelta = -1;
        isOnTrack = false;
        return;
      }

      toggleActiveState(isCurrentActiveChanged);
    }
    else if (scrollPosCurr < scrollPosLast && isOnTrack) {
      console.log("up throttlescroll")

      currentActive--;
      isCurrentActiveChanged = true;

      // If first step GO UP out track
      if (currentActive < 0) {
        currentActive = 0;
        buffer = 260;
        scrollDelta = 1;
        isOnTrack = false;
        return;
      }

      toggleActiveState(isCurrentActiveChanged);
    }

    timerId  =  setTimeout(function () {
      console.log("throttleScroll FIRED")
      //console.log(scrollPosCurr);
      //console.log(scrollPosLast);
      isOnTrack = true;
      timerId  =  undefined;
    }, delay);
  }



  // Disables scrolling by mouse wheel and touch move
  function handleEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  };


  //  Toggle track points UP and Down
  function onMouseScroll(event) {
    console.log('On Mouse Scroll');
    //console.log(event.wheelDelta);
    mouseWheelTick += event.wheelDelta;

    if (mouseWheelTick > 250) {

      currentActive--;
      isCurrentActiveChanged = true;
      mouseWheelTick = 0;

      if (currentActive < 0) {
        currentActive = 0;
        buffer = 260;
        return;
      }

      toggleActiveState(isCurrentActiveChanged);
    }

    if (mouseWheelTick < (-250)) {

      currentActive++;
      isCurrentActiveChanged = true;
      mouseWheelTick = 0;

      if (currentActive > trackLength) {
        currentActive = trackLength;
        buffer = 260;
        return;
      }

      toggleActiveState(isCurrentActiveChanged);
    }
  }

  //
  //  KeyBoard events handle
  //window.addEventListener("scroll",  handleScrollBar, {passive: false});
  //window.addEventListener("keydown",  handleKeyPress, {passive: false});

  // Handle keyPress, ScrollBar, ArrowScrollPress
  function handleKeyPress(e) {
    //console.log(window.pageYOffset);
    console.log(e.code);
    //e = e || window.event;

    if (e.key == 'ArrowUp') {      //'38'
        // up arrow
        console.log('up arrow');
    }
    else if (e.keyCode == '40') {
        // down arrow
        console.log('down arrow');
    }
    else if (e.key == '37') {
       // left arrow
       console.log('left arrow');
    }
    else if (e.key == '39') {
       // right arrow
       console.log('right arrow');
    }
  }

  //
  // Move Pointer to Next / Prev position + change Img, List-items
  function toggleActiveState(isCurrIndx) {

    points.forEach((point, index) => {
      if (index <= currentActive) point.classList.add('is-active');
      else point.classList.remove('is-active');
    });

    //TODO  width - 20px
    let progress = document.querySelector('.progress-bar');
    progress.style.height =
    ((currentActive ) / (trackLength)) * 100 + "%";

    moveThumb();
    isCurrIndx ? thumbAnimate() : false;
    isCurrentActiveChanged = false;
    listRendering(isCurrIndx);
  }

  //
  // Touch / Mouse hand Move Pointer - indicator-button move
  let track = document.querySelector('.progress-pill');             // Track only
  let trackMouseTrigger = (track.clientHeight - 18) / trackLength;  //18px = dot width

  thumb.addEventListener('mousedown', function(event) {

    event.preventDefault();
    thumb.ondragstart = function() {
      return false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      calcMouseCoord(event);
      toggleActiveState(isCurrentActiveChanged);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

  });

  //
  // Move Pointer after mouse click
  track.addEventListener('click', onMouseClickInTrack);

  function onMouseClickInTrack(event) {
    let scrollToPosition;                         //  Top scroll position

    calcMouseCoord(event);
    toggleActiveState(isCurrentActiveChanged);

    // Viewport > Section size
    if ( section.offsetHeight <= document.documentElement.clientHeight) {
      scrollToPosition = section.offsetTop + section.offsetHeight / 2 - document.documentElement.clientHeight / 2;
    }
    // Viewport < Section size
    else {
      scrollToPosition = section.offsetTop + sectionMainTrack.offsetTop + sectionMainTrack.offsetHeight / 2 - document.documentElement.clientHeight / 2;
    }

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  }

  //
  // Calculate Mouse Coordinates on click / move
  function calcMouseCoord(event) {

    // Click distance from top of track
    let newTop = event.clientY - track.getBoundingClientRect().top;

    if (newTop <= 0) {
      newTop = -7;               // -21 // -7 (old number) 14px border around thumbButton
    }

    let bottomEdge = track.offsetHeight - thumbBtn.offsetHeight;
    if (newTop > bottomEdge) {
      newTop = bottomEdge;            // + 14; + 14px border around thumbButton
    }

    let newCurrentActive = Math.round( newTop / trackMouseTrigger);
    newCurrentActive !== currentActive ?
    (isCurrentActiveChanged = true, currentActive = newCurrentActive) : false;
  }

  //
  //
  function moveThumb() {
    let newThumbPos = trackMouseTrigger * currentActive;
    thumb.style.top = (newThumbPos - 21) + 'px';                // 7
  }

  //
  //
  function thumbAnimate() {
    thumbBtn.style.visibility = 'hidden';

    thumbBtn.animate(
      [
        // keyframes
        { transform: "scale(.5)",
          visibility: "hidden"
        },
        { transform: "scale(1)",
          visibility: "visible"
        },
      ],
      {
        // timing options
        duration: 250,
        iterations: 1,
        delay: 100,
      }
    ).onfinish = () => {
        thumbBtn.style.visibility = 'visible';
        //console.log("Animation ended");
        //endingUI.style.pointerEvents = "auto";
      };
  }

  //
  // Resize track height after Change Viewport
  window.addEventListener("resize", trackReSize);

  function trackReSize(event) {
    //console.log('trackReSize');
    trackMouseTrigger = (track.clientHeight - 18) / trackLength;
    moveThumb();
  }

  //
  // Render list-wrapper + img-wrapper --> insert in aSide of track
  function listRendering(isCurrIndx) {
    let img = section.querySelector('.img-wrap img');
    let list = section.querySelector('.list-container');
    let listchildNodes = Array.from(list.children);
    let dataObj = slidesData[currentActive];

    if (dataObj.slideNumber != currentActive) return;
    if (!isCurrIndx) return;

    // clear old list
    listchildNodes.forEach(el => {
      el.remove();
    });

    // create new list Header
    let textSpan = document.createElement("span");
    textSpan.innerHTML = dataObj.id;   //`${}`;
    list.append(textSpan);

    let ul = document.createElement("ul");

    // create new list items
    dataObj.featureList.forEach (el => {
      let li = document.createElement('li');
      li.innerHTML = el;
      ul.appendChild(li);
    });

    list.append(ul);
    listAnimate(list);

    img.setAttribute('src', `${dataObj.imgSrc}`);
    imgAnimate(img);
  }

  // Animation list items rightSide of track
  function listAnimate(list) {

    list.animate(
      [
        // keyframes
        { transform: "translateX(-3%)",
          visibility: "hidden"
        },
        { transform: "translateX(0)",
          visibility: "visible"
        },
      ],
      {
        // timing options
        duration: 400,
        iterations: 1,
        //delay: 100,
      }
    )
  }

  //
  // Animation img leftSide of track
  function imgAnimate(img) {
    img.animate(
      [
        {opacity: "0"},
        {opacity: "0.15"},
        {opacity: "0.25"},
        {opacity: "1"},
      ],
      {
        duration: 400,
        iterations: 1,
      }
    )
  }

  //---------------------------------------

  function handleScrollBar(e) {
    //console.log(e.type);
    //console.log(this.scrollY);
    //let currentWinScrollPos = window.scrollY;


    window.addEventListener('scroll', function(event) {

      event.preventDefault();
      event.stopPropagation();
      console.log("event.scrollDelta: = " + event);


    }, false);



    /*
    let lastWinScrolPos = window.pageYOffset;

    if (window.pageYOffset > lastWinScrolPos) {
      console.log('down');
    }
    else {
      console.log('up');
    }
    */
  }

  function  handleScrollBarTest(e) {
    //window.addEventListener('scroll', handleEvent, false);
    //console.log('up');
    console.log(e.wheelDelta);
  }



  //  DOM Loaded End
})
