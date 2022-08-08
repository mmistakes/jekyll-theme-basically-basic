---
---

/*!
 * Basically Basic Jekyll Theme 1.4.5
 * Copyright 2017-2018 Michael Rose - mademistakes | @mmistakes
 * Free for personal and commercial use under the MIT license
 * https://github.com/mmistakes/jekyll-theme-basically-basic/blob/master/LICENSE
*/

var menuItems = document.querySelectorAll('#sidebar li');

// Get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';

// Animate sidebar menu items
function animateMenuItems() {
  for (var i = 0; i < menuItems.length; i++) {
    var item = menuItems[i];
    // Stagger transition with transitionDelay
    item.style[transitionProp + 'Delay'] = (i * 75) + 'ms';
    item.classList.toggle('is--moved');
  }
};

var myWrapper = document.querySelector('.wrapper');
var myMenu = document.querySelector('.sidebar');
var myToggle = document.querySelector('.toggle');
var myInitialContent = document.querySelector('.initial-content');
var mySearchContent = document.querySelector('.search-content');
var mySearchToggle = document.querySelector('.search-toggle');

// Toggle sidebar visibility
function toggleClassMenu() {
  myMenu.classList.add('is--animatable');
  if (!myMenu.classList.contains('is--visible')) {
    myMenu.classList.add('is--visible');
    myToggle.classList.add('open');
    myWrapper.classList.add('is--pushed');
  } else {
    myMenu.classList.remove('is--visible');
    myToggle.classList.remove('open');
    myWrapper.classList.remove('is--pushed');
  }
}

// Animation smoother
function OnTransitionEnd() {
  myMenu.classList.remove('is--animatable');
}

myMenu.addEventListener('transitionend', OnTransitionEnd, false);
myToggle.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
myMenu.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
if (mySearchToggle) {
  mySearchToggle.addEventListener('click', function () {
    toggleClassSearch();
  }, false);
}

// Toggle search input and content visibility
function toggleClassSearch() {
  mySearchContent.classList.toggle('is--visible');
  myInitialContent.classList.toggle('is--hidden');
  setTimeout(function () {
    document.querySelector('.search-content input').focus();
  }, 400);

  if (mySearchContent.classList.contains('is--visible'))
    document.querySelector('.search-toggle').children[0].children[1].setAttribute('d', 'M 11.839844 0.691406 C 12.738281 -0.226562 14.207031 -0.230469 15.113281 0.679688 C 16.019531 1.589844 16.023438 3.074219 15.121094 3.988281 L 11.164062 8 L 15.125 12.019531 C 16.019531 12.929688 16.007812 14.398438 15.097656 15.308594 C 14.191406 16.214844 12.726562 16.210938 11.835938 15.304688 L 7.898438 11.3125 L 3.957031 15.308594 C 3.054688 16.226562 1.589844 16.230469 0.683594 15.320312 C -0.222656 14.410156 -0.226562 12.925781 0.671875 12.011719 L 4.632812 8 L 0.667969 3.980469 C -0.226562 3.070312 -0.210938 1.601562 0.695312 0.691406 C 1.605469 -0.214844 3.066406 -0.210938 3.960938 0.695312 L 7.894531 4.6875 Z M 11.839844 0.691406')
  else
    document.querySelector('.search-toggle').children[0].children[1].setAttribute('d', 'M15.5,13.12L13.19,10.8a1.69,1.69,0,0,0-1.28-.55l-0.06-.06A6.5,6.5,0,0,0,5.77,0,6.5,6.5,0,0,0,2.46,11.59a6.47,6.47,0,0,0,7.74.26l0.05,0.05a1.65,1.65,0,0,0,.5,1.24l2.38,2.38A1.68,1.68,0,0,0,15.5,13.12ZM6.4,2A4.41,4.41,0,1,1,2,6.4,4.43,4.43,0,0,1,6.4,2Z" transform="translate(-.01)')
}
