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

  //array of all [cat names, [img source file, alt text], credits]
  catData: [
    ['Dankey Kang', ['res/mario-cat.jpg', 'Cat in a Super Mario costume'], 'theverybesttop10.com'],
    ['Princess Zorldo', ['res/pikachu-cat.jpg', 'Cat painted like Pikachu'], 'nowhereelse.com'],
    ['Vault Guy ', ['res/tomb-raider-cat.jpg', 'Cat jumping and shooting two pistols'], 'prnewsonline.com'],
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

  //currently displayed cat object
  currentCat: null

};


/** OCTOPUS **/

let octopus = {

  //get array of cat objects from model, for use in view
  getCatList: function() {
    return model.catList;
  },

  //get currently displayed cat object
  getCurrentCat: function() {
    return model.currentCat;
  },

  //change currently displayed cat
  updateCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  //get number of clicks for currently displayed cat
  updateClicks: function() {
    model.currentCat.clicks++;
  },

  //initialize catList build, rendering, and adding listeners
  init: function() {
    model.buildCatList(model.catData);
    model.currentCat = model.catList[0];
    view.init(this.getCatList());
  }
};


/** VIEW **/

let view = {

  //called by Octopus, renders initial view and adds listeners
  init: function(data){
    view.buildNav(data);
    view.renderCat(data[0]);
    view.addListeners();

    //add 'selected' style to top nav button
    document.querySelector('li').classList.add('selected');
  },

  //create navbar with names of each cat in catList
  buildNav: function() {
    const navList = document.querySelector('.nav-list');
    const data = octopus.getCatList();

    //clear existing nav buttons
    navList.innerHTML = "";

    //generate <li> for each cat's name, add to navbar
    for (cat of data) {
      let listItem = document.createElement("li");
      listItem.innerHTML = cat.name;
      listItem.classList.add("nav-item");

      //add click listener to each nav button
      listItem.addEventListener('click', (function(catCopy) {
        return function(event) {
          octopus.updateCurrentCat(catCopy);
          //update viewing area
          view.renderCat();
          //update Admin Area
          view.renderAdminArea();

          //clear 'selected' class from all buttons
          let allNavButtons = document.getElementsByTagName('li');
          for (b of allNavButtons) {
            b.classList.remove('selected');
          };
          //add 'selected' class to clicked button
          event.target.classList.add('selected');
        };
      })(cat));

      //append li to nav area
      navList.appendChild(listItem);
    };
  },

  //Render cat viewing area
  renderCat: function() {
    const currentCat = octopus.getCurrentCat();

    //display cat name in name area
    const nameHTML = document.querySelector('.cat-name');
    nameHTML.innerHTML = currentCat.name;

    //display click counter in counter area
    const counterHTML = document.querySelector('.counter');
    counterHTML.innerHTML = 'Click Count: ' + currentCat.clicks.toLocaleString();

    //display image and add alt text
    const imageHTML = document.querySelector('img');
    imageHTML.src = currentCat.image[0];
    imageHTML.alt = currentCat.image[1];

    //display image credit below image
    const imageSource = document.querySelector('figcaption');
    imageSource.innerHTML = 'Image thanks to ' + currentCat.source;
  },

  //Render Admin area
  renderAdminArea: function() {
    let nameForm = document.querySelector('#nameForm');
    let imageForm = document.querySelector('#imageForm');
    let clicksForm = document.querySelector('#clicksForm');
    const currentCat = octopus.getCurrentCat();

    //add current cat's attributes as values in form fields
    nameForm.value = currentCat.name;
    imageForm.value = currentCat.source;
    clicksForm.value = currentCat.clicks;
  },

  //Add listeners to cat viewing area and admin area
  addListeners: function() {
    const imageHTML = document.querySelector('img');
    const currentCat = octopus.getCurrentCat();
    const counterHTML = document.querySelector('.counter');

    //add listener to increment clicks when cat image is clicked
    imageHTML.addEventListener('click', function() {
      //increment click count for currently displayed cat
      octopus.getCurrentCat().clicks += 1;
      //re-render cat viewing area and admin input values
      view.renderCat();
      view.renderAdminArea();
    }, false);

    //add listener to Admin button
    const adminButton = document.querySelector('.admin-button');
    adminButton.addEventListener('click', function() {
      const adminArea = document.querySelector('#admin-container');
      //update admin area input field values before showing
      view.renderAdminArea();
      //toggle visibility of admin section
      adminArea.style.display = adminArea.style.display === 'none' ? 'block' : 'none';
    });

    //Add listener to Admin area Submit button
    const adminSubmitButton = document.querySelector('.admin-submit-button');
    adminSubmitButton.addEventListener('click', function() {
      //on form submission, update currentCat attributes, re-render nav & display
      let currentCat = octopus.getCurrentCat();
      let formInputs = document.getElementsByTagName('input');

      //update values of current cat object based on Admin input fields
      currentCat.name = formInputs[0].value;
      currentCat.source = formInputs[1].value;
      currentCat.clicks = parseInt(formInputs[2].value, 10);

      //re-render cat viewing area
      view.renderCat();

      //update names on nav buttons
      let catList = octopus.getCatList();
      let navButtons = document.querySelectorAll('li');
      for (i=0; i < navButtons.length; ++i) {
        navButtons[i].innerHTML = catList[i].name;
      };
    });
  }
};

/*** CODE RUNS ON PROGRAM LOAD ***/

octopus.init();
