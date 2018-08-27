/*** GLOBAL VARIABLES ***/

//array of all cat names, pictures, and credits
const catList = [
  ['Dankey Kang', 'res/mario-cat.jpg', 'theverybesttop10.com'],
  ['Princess Zorldo', 'res/pikachu-cat.jpg', 'nowhereelse.com'],
  ['Paper Throw Man', 'res/tomb-raider-cat.jpg', 'prnewsonline.com'],
  ['Lirnda Kraft','res/pirate-cat.jpg','amazon.com'],
  ['Kronkos','res/vampire-cat.jpg','amazon.com']
];

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
