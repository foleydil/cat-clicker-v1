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
  currentCat: null

};

/** OCTOPUS **/

let octopus = {

  //get array of cat objects from model, for use in view
  getCatList: function() {
    return model.catList;
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  updateCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  updateClicks: function() {
    model.currentCat.clicks++;
  },

  //initialize catList build, rendering, and adding listeners
  init: function() {
    model.buildCatList(model.catData);
    model.currentCat = model.catList[0];
    view.buildNav(model.catList);
    view.renderCat(model.catList[0]);
    view.addImageListener();
  }
};


/** VIEW **/

let view = {

  //create navbar with names of each cat in catList
  buildNav: function() {
    const navList = document.querySelector('.nav-list');
    const data = octopus.getCatList();
    for (cat of data) {
      //generate button for each cat's name, add to navbar
      let listItem = document.createElement("li");
      listItem.innerHTML = cat.name;
      listItem.classList.add("nav-item");

      //add click listener to each cat name, to update viewing area &
      //increment click countwhen clicked
      listItem.addEventListener('click', (function(catCopy) {
        return function(event) {
          octopus.updateCurrentCat(catCopy);
          view.renderCat();

          //clear 'selected' class from all buttons
          let allNavButtons = document.getElementsByTagName('li');
          for (b of allNavButtons) {
            b.classList.remove('selected');
          };
          //add 'selected' class to clicked button
          event.target.classList.add('selected');
        };
      })(cat));

      //append element to list
      navList.appendChild(listItem);
    };

    //add 'selected' style to first button
    document.querySelector('li').classList.add('selected');
  },


  //update viewing area
  renderCat: function() {
    const currentCat = octopus.getCurrentCat();

    //update cat name
    const nameHTML = document.querySelector('.cat-name');
    nameHTML.innerHTML = currentCat.name;

    //update click counter
    const counterHTML = document.querySelector('.counter');
    counterHTML.innerHTML = 'Click Count: ' + currentCat.clicks.toLocaleString();

    //update image and alt text
    const imageHTML = document.querySelector('img');
    imageHTML.src = currentCat.image[0];
    imageHTML.alt = currentCat.image[1];

    //update image credit
    const imageSource = document.querySelector('figcaption');
    imageSource.innerHTML = 'Image thanks to ' + currentCat.source;
  },

  //Add click listener to image, increment clickCount and update counter on click
  addImageListener: function() {
    const imageHTML = document.querySelector('img');
    const currentCat = octopus.getCurrentCat();
    const counterHTML = document.querySelector('.counter');
    imageHTML.addEventListener('click', function() {
      //increment click count for currently displayed cat
      octopus.getCurrentCat().clicks += 1;
      //update counter HTML
      counterHTML.innerHTML = "Click Count: " + octopus.getCurrentCat().clicks.toLocaleString();
    }, false);
  }
};

/*** CODE RUNS ON PROGRAM LOAD ***/

octopus.init();
