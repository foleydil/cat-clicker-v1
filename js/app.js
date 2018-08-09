/*** GLOBAL VARIABLES ***/

let clickCount = 0;

/*** FUNCTION DECLARATIONS ***/

function init() {
  // Add click listener to image, increment clickCount and update counter on click
  const catPic = document.querySelector('#catImage');
  const counter = document.querySelector('.counter');
  catPic.addEventListener('click', function() {
    clickCount += 1;
    counter.innerHTML = "Click Count: " + clickCount.toLocaleString();
  });
}

/*** CODE RUNS ON PROGRAM LOAD ***/

init();
