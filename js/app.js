
/** MODEL **/

class Cat {
  constructor(name, image, source) {
    this.name = name;
    this.image = image;
    this.source = source;
    this.clicks = 0;
  }
}

let model = {

  //array of all cat names, pictures([img source file, alt text]), and credits
  catData: [
    ['Dankey Kang', ['res/mario-cat.jpg', 'Cat in a Super Mario costume'], 'theverybesttop10.com'],
    ['Princess Zorldo', ['res/pikachu-cat.jpg', 'Cat painted like Pikachu'], 'nowhereelse.com'],
    ['Paper Throw Man', ['res/tomb-raider-cat.jpg', 'Cat jumping and shooting two pistols'], 'prnewsonline.com'],
    ['Lirnda Kraft',['res/pirate-cat.jpg', 'Cat dressed like a pirate'], 'amazon.com'],
    ['Krantos',['res/vampire-cat.jpg', 'Cat in a Vampire costume'], 'amazon.com']
  ],

  //list of cat objects
  catList: [],

  //create list of cats based on an array of cat data
  buildCatList: function(catData) {
    for (c of catData) {
      var catObject = new Cat(c[0], c[1], c[2]);
      model.catList.push(catObject);
    }
  },

  //index of currently displayed cat
  currentCatIndex: 0,

};

/** OCTOPUS **/

let octopus = {

  //add click listener to each cat name, to update viewing area when clicked
  addNavListeners: function() {
    //assign click listener to each button, based on index starting at 0
    let navButtons = document.getElementsByTagName('li');
    index = 0;
    for (button of navButtons) {
      button.addEventListener('click', (function(indexCopy){
        return function(event) {
          view.renderCat(model.catList[indexCopy]);
          model.currentCatIndex = indexCopy;

          //clear 'selected' class from all buttons
          let allNavButtons = document.getElementsByTagName('li');
          console.log(allNavButtons);
          for (b of allNavButtons) {
            b.classList.remove('selected');
          }
          //add 'selected' class to clicked button
          event.target.classList.add('selected');
        };
      })(index));
      index++;
    };
  },

  //Add click listener to image, increment clickCount and update counter on click
  addPicListener: function() {
    const imageHTML = document.querySelector('img');
    imageHTML.addEventListener('click', function() {
      //increment click count for currently displayed cat
      model.catList[model.currentCatIndex].clicks += 1;
      //update counter HTML
      const counterHTML = document.querySelector('.counter');
      counterHTML.innerHTML = "Click Count: " + model.catList[model.currentCatIndex].clicks.toLocaleString();
    }, false);
  },

  //initialize catList build, rendering, and adding listeners
  init: function() {
    model.buildCatList(model.catData);
    view.buildNav(model.catList);
    view.renderCat(model.catList[0]);
    this.addNavListeners();
    this.addPicListener();
    }
};

/** VIEW **/

let view = {

  //create navbar with names of each cat in catList
  buildNav: function(data) {
    const navList = document.querySelector('.nav-list');
    for (cat of data) {
      //generate button for each cat's name, add to navbar
      let listItem = document.createElement("li");
      listItem.innerHTML = cat.name;
      listItem.classList.add("nav-item");
      navList.appendChild(listItem);
    };
  },

  //update viewing area
  renderCat: function(catObject) {
    //update cat name
    const nameHTML = document.querySelector('.cat-name');
    nameHTML.innerHTML = catObject.name;

    //update click counter
    const counterHTML = document.querySelector('.counter');
    counterHTML.innerHTML = 'Click Count: ' + catObject.clicks.toLocaleString();

    //update image and alt text
    const imageHTML = document.querySelector('img');
    imageHTML.src = catObject.image[0];
    imageHTML.alt = catObject.image[1];

    //update image credit
    const imageSource = document.querySelector('figcaption');
    imageSource.innerHTML = 'Image thanks to ' + catObject.source;
  }

};

/*** CODE RUNS ON PROGRAM LOAD ***/

octopus.init();
