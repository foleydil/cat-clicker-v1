/*** GLOBAL VARIABLES ***/

let cat1ClickCount = 0;
let cat2ClickCount = 0;

/*** FUNCTION DECLARATIONS ***/

function init() {
  // Add click listener to image, increment clickCount and update counter on click
  const cat1Pic = document.querySelector('#cat1Image');
  const cat1Counter = document.querySelector('#cat1-counter');
  cat1Pic.addEventListener('click', function() {
    cat1ClickCount += 1;
    cat1Counter.innerHTML = "Click Count: " + cat1ClickCount.toLocaleString();
  }, false);

  // Add click listener to image, increment clickCount and update counter on click
  const cat2Pic = document.querySelector('#cat2Image');
  const cat2Counter = document.querySelector('#cat2-counter');
  cat2Pic.addEventListener('click', function() {
    cat2ClickCount += 1;
    cat2Counter.innerHTML = "Click Count: " + cat2ClickCount.toLocaleString();
  }, false);
}

/*** CODE RUNS ON PROGRAM LOAD ***/

init();
