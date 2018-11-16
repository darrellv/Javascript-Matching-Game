var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];

  // duplicate the cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);


// randomize gameGrid on each load
gameGrid.sort(function() {
    return 0.5 - Math.random();
})
// grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');

// create a section elemment and assign it to variable grid
var grid = document.createElement('section');

// give section element a class of grid.
grid.setAttribute('class', 'grid');

// append the grid section to the game-board div
game.appendChild(grid);

// loop through each item in cards array
for (var i = 0; i < gameGrid.length; i++) {
    // create a div element and assign to variable card
    var card = document.createElement('div');

    // apply a card class to that div
    card.classList.add('card');

    // set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;

    // create the front of the card that the user sees when the page loads. (technically, this is the "back" of the card but
    // for programming purposes we will start with the front of the card).
    var front = document.createElement('div');

    // add a class of "front" to the variable representing our created div
    front.classList.add('front');

    // create the "back" of the card.  "back" to the program that is.  this would be the "front" of the card to a person.
    var back = document.createElement('div');
    back.classList.add('back');

    // apply the background image of the div to the back of the card's image
    back.style.backgroundImage = `url(${gameGrid[i].img})`

    // append the card to the grid section and slap the front and back of the card to the card. 
    // (append the card div to the section and the front and back divs to the card div)
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

}

//store guesses
var firstGuess = '';
var secondGuess = '';

// set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

// add match css
var match = function() {
    // set the selected variable equal to an array-like object with all the elements of the selected class
    var selected = document.querySelectorAll('.selected');

    // loop through the array-like object containing 'selected' class
    for (var i = 0; i < selected.length; i++) {
        //console.log(selected);
        // apply the class of 'match' as we loop through our array
        selected[i].classList.add('match');
    }
};

// reset guesses after two attempts
var resetGuesses = function () {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    // get the two cards that were selected and put them into an array-like object
    var selected = document.querySelectorAll('.selected');

    //loop through the array-like object and remove the selected class from them
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};

// add an event listener to the entire grid
grid.addEventListener('click', function(event) {
    // declare variable to target our clicked item
    var clicked = event.target;

    // if we clicked in between the cards or on a card that has already been clicked on
    // or if an item has already been matched, or if an item has already been selected, do nothing and get out
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    // we only want to add `selected` class if the current count is less than 2.
    if (count < 2) {
        // increment count
        count++;

        if (count === 1) {
            // assign first guess
            firstGuess = clicked.parentNode.dataset.name;

            // add selected class
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        // if both guesses are not empty
        if (firstGuess != '' && secondGuess != '') {
            // and the first guess matches secondGuess
            if (firstGuess === secondGuess) {
                //run the match function
                setTimeout(match, delay);

                // clear out the count and guesses
                setTimeout(resetGuesses, delay);

            } else {
                setTimeout(resetGuesses, delay);
            }

        }

        // make sure same card is not clicked twice
        previousTarget = clicked;
    }

});