---
---

/*!
 * Basically Basic Jekyll Theme 1.1.3
 * Copyright 2017 Michael Rose - mademistakes | @mmistakes
 * Free for personal and commercial use under the MIT license
 * https://github.com/mmistakes/jekyll-basically-theme/blob/master/LICENSE.md
*/

// Animate sidebar menu items
var menuItems = document.querySelectorAll('#sidebar li');

// Get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ?
    'transition' : 'WebkitTransition';

function animateMenuItems() {
  for ( var i=0; i < menuItems.length; i++ ) {
    var item = menuItems[i];
    // Stagger transition with transitionDelay
    item.style[ transitionProp + 'Delay' ] = ( i * 75 ) + 'ms';
    item.classList.toggle('is--moved');
  }
};

// Toggle sidebar visibility
function toggleClassMenu() {
  myMenu.classList.add('is--animatable');
  if(!myMenu.classList.contains('is--visible')) {
    myMenu.classList.add('is--visible');
    myToggle.classList.add('open');
    myWrapper.classList.add('is--pushed');
  } else {
    myMenu.classList.remove('is--visible');
    myToggle.classList.remove('open');
    myWrapper.classList.remove('is--pushed');
  }
}

function OnTransitionEnd() {
  myMenu.classList.remove('is--animatable');
}

var myWrapper = document.querySelector('.wrapper');
var myMenu = document.querySelector('.sidebar');
var myToggle = document.querySelector('.toggle');
myMenu.addEventListener('transitionend', OnTransitionEnd, false);
myToggle.addEventListener('click', function() {
  toggleClassMenu();
  animateMenuItems();
}, false);
myMenu.addEventListener('click', function() {
  toggleClassMenu();
  animateMenuItems();
}, false);
