/*** GLOBAL VARIABLES ***/

//array of all cat names, pictures([img source file, alt text]), and credits
const catData = [
  ['Dankey Kang', ['res/mario-cat.jpg', 'Cat in a Super Mario costume'], 'theverybesttop10.com'],
  ['Princess Zorldo', ['res/pikachu-cat.jpg', 'Cat painted like Pikachu'], 'nowhereelse.com'],
  ['Paper Throw Man', ['res/tomb-raider-cat.jpg', 'Cat jumping and shooting two pistols'], 'prnewsonline.com'],
  ['Lirnda Kraft',['res/pirate-cat.jpg', 'Cat dressed like a pirate'], 'amazon.com'],
  ['Krantos',['res/vampire-cat.jpg', 'Cat in a Vampire costume'], 'amazon.com']
];

//list of cat objects
let catList = []

/** CLASS DECLARATIONS **/

class Cat {
  constructor(name, image, source) {
    this.name = name;
    this.image = image;
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

//create navbar with names of each cat in catList
function buildNav() {
  const navList = document.querySelector('.nav-list');
  index = 0;

  for (cat of catList) {
    let listItem = document.createElement("li");
    listItem.innerHTML = cat.name;
    listItem.classList.add("nav-item");
    navList.appendChild(listItem);

    //add click listener to each cat name, to update viewing area when clicked
    listItem.addEventListener('click', (function(indexCopy){
      return function() {
        renderCat(indexCopy);
      };
    })(index));
    index++;
  };
}

//update viewing area
function renderCat(index) {
  const currentCat = catList[index];

  //update cat name
  const nameHTML = document.querySelector('.cat-name');
  nameHTML.innerHTML = currentCat.name;

  //update click counter
  const counterHTML = document.querySelector('.counter');
  counterHTML.innerHTML = 'Click count: ' + currentCat.clicks.toLocaleString();

  //update image
  const imageHtml = document.querySelector('img');
  imageHtml.src = currentCat.image[0];
  imageHtml.alt = currentCat.image[1];

  //update image credit
  const imageSource = document.querySelector('figcaption');
  imageSource.innerHTML = 'Image thanks to ' + currentCat.source;

}

// function init() {
//   // Add click listener to image, increment clickCount and update counter on click
//   const cat1Pic = document.querySelector('#cat1Image');
//   const cat1Counter = document.querySelector('#cat1-counter');
//   cat1Pic.addEventListener('click', function() {
//     cat1ClickCount += 1;
//     cat1Counter.innerHTML = "Click Count: " + cat1ClickCount.toLocaleString();
//   }, false);
// }

/*** CODE RUNS ON PROGRAM LOAD ***/

//init();

buildCatList(catData);
buildNav();
renderCat(0);
