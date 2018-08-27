/*** GLOBAL VARIABLES ***/

//array of all cat names, pictures, and credits
const catData = [
  ['Dankey Kang', 'res/mario-cat.jpg', 'theverybesttop10.com'],
  ['Princess Zorldo', 'res/pikachu-cat.jpg', 'nowhereelse.com'],
  ['Paper Throw Man', 'res/tomb-raider-cat.jpg', 'prnewsonline.com'],
  ['Lirnda Kraft','res/pirate-cat.jpg','amazon.com'],
  ['Krantos','res/vampire-cat.jpg','amazon.com']
];

//list of cat objects
let catList = []

/** CLASS DECLARATIONS **/

class Cat {
  constructor(name, picture, source) {
    this.name = name;
    this.picture = picture;
    this.source = source;
    this.clicks = 0;
  }
}

/*** FUNCTION DECLARATIONS ***/

//create list of cats based on an array of cat data
function buildCatList(data) {
  for (c of catData) {
    var catObject = new Cat(c[0], c[1], c[2]);
    catList.push(catObject);
  }
}

function buildNav() {
  const navList = document.querySelector('#nav-list');
  index = 0;

  for (cat of catList) {
    let listItem = document.createElement("li");
    listItem.innerHTML = cat.name;
    listItem.classList.add("nav-item");
    navList.appendChild(listItem);

    //add click listener to each cat name, to update viewing area when clicked
    listItem.addEventListener('click', (function(indexCopy){
      return function() {
        console.log(indexCopy);
      };
    })(index));
    index++;
  };
}

// function init() {
//   // Add click listener to image, increment clickCount and update counter on click
//   const cat1Pic = document.querySelector('#cat1Image');
//   const cat1Counter = document.querySelector('#cat1-counter');
//   cat1Pic.addEventListener('click', function() {
//     cat1ClickCount += 1;
//     cat1Counter.innerHTML = "Click Count: " + cat1ClickCount.toLocaleString();
//   }, false);
//
//   // Add click listener to image, increment clickCount and update counter on click
//   const cat2Pic = document.querySelector('#cat2Image');
//   const cat2Counter = document.querySelector('#cat2-counter');
//   cat2Pic.addEventListener('click', function() {
//     cat2ClickCount += 1;
//     cat2Counter.innerHTML = "Click Count: " + cat2ClickCount.toLocaleString();
//   }, false);
// }

/*** CODE RUNS ON PROGRAM LOAD ***/

//init();

buildCatList(catData);
buildNav();
