/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Remove Elements from DOM function.
function removeElements (array, selector) {
  for(const index of array) {
    selector.removeChild(index);
  }
}

// Add Shuffled Cards Elements to DOM function.
function applyShuffle (array) {
  const deck = document.querySelector('.deck');
  removeElements(array, deck);
  for(const index of array) {
    deck.appendChild(index)
  }
}

// Set correct selector, even if user click on symbol.
function setSelector (selector) {
  if (selector.tagName === 'I' ) {
    selector = selector.parentElement
  }
  return selector;
}

// Move counter Function
function moveCounter(increment, restart) {
  const starSelector = document.querySelectorAll('.fa-star');
  const moveSelector = document.querySelector('.moves');
  const currentMoves = Number(moveSelector.textContent);
  if (increment === true && restart === false) {
    const addMove = currentMoves + 1;
    moveSelector.textContent = addMove;
    if (currentMoves === 14) {
      const starLost = starSelector[2];
      starLost.classList.remove("fa-star");
      starLost.classList.add("fa-star-o");
    } else if (currentMoves === 24) {
      const starLost = starSelector[1];
      starLost.classList.remove("fa-star");
      starLost.classList.add("fa-star-o");
    }
  } else if (increment === false && restart === true) {
    const star_oSelector = document.querySelectorAll('.fa-star-o')
    moveSelector.textContent = '0';
    for (index of star_oSelector) {
      index.classList.remove('fa-star-o');
      index.classList.add('fa-star')
    }
  }
  return currentMoves;
}

// Show Card Selected function
function displayCard (selector) {
  const deck = document.querySelector('.deck')
  if (selector !== deck && !(selector.classList.contains("show"))) {
    selector.classList.add('open', 'show');
    return selector;
  }
}

// Undisplay Cards for reset purposes ||
function undisplayCards (array) {
  for(index of array) {
    index.classList.remove('match', 'open', 'show');
  }
}

// Check for Open Cards List Length
function openCards (array) {
  openList = [];
  for(const index of array) {
    if (index.classList.contains("open")) {
      openList.push(index);
    }
  }
  return openList;
}

function matchedCards () {
  const cardElements = document.getElementsByClassName("card");
  let cardList = Array.from(cardElements);
  let counter = 0
  for (let index of cardList) {
    if (index.classList.contains('match')) {
      counter += 1;
    }
  }
  return counter;
}

// Check if Open Cards are a match!
function matchingCards (array) {
  const firstCard = array[0].firstElementChild.classList.value;
  const secondCard = array[1].firstElementChild.classList.value;
  if (firstCard === secondCard) {
    array[0].classList.remove('open', 'show');
    array[0].classList.add('match');
    array[1].classList.remove('open', 'show');
    array[1].classList.add('match');
    // set animation for right match
  } else {
    // set animation for wrong match
    array[0].classList.add('unmatch');
    array[1].classList.add('unmatch');
    setTimeout(function wait() {
      array[0].classList.remove('open', 'show', 'unmatch');
      array[1].classList.remove('open', 'show', 'unmatch');
    }, 600)};
}

// Function from https://coderwall.com/p/flonoa/simple-string-format-in-javascript
String.prototype.format = function () {
        let a = this;
        for (let k in arguments) {
            a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
        }
        return a
    }

// Win function!
function winGame (moveCount, starsCount) {
  const time_minutes = document.querySelector('#minutes').textContent;
  const time_seconds = document.querySelector('#seconds').textContent;
  const time = time_minutes + ' minutes and '  + time_seconds + ' seconds';
  starTime = false;
  document.querySelector('.container').remove();

  const newDiv = '<div class = "container score-page"></div>';
  const newHeader = '<header></header>';
  const iconHeading = '<i id = "icon" class = "fa fa-check-circle"></i>';
  const mainHeading = '<h1 class="final-title">Congratulations! You Won!</h1>';
  const newSection = '<section class = "final-score"></section>';
  const firstParagraph = '<p>With <strong>{0} Moves</strong> and <strong>{1} stars </strong>.</p>'.format(moveCount, starsCount);
  const secondParagraph = '<p> {0}. Wooooooooooooo!</p>'.format(time);
  const newButton = '<button class = "button" type="button" value="Refresh Page" onClick="window.location.reload()">Play again!</button>';

  document.body.insertAdjacentHTML('afterbegin', newDiv);
  document.querySelector('.container').insertAdjacentHTML('afterbegin', newHeader);
  document.querySelector('header').insertAdjacentHTML('afterbegin', iconHeading);
  document.querySelector('header').insertAdjacentHTML('beforeend', mainHeading);
  document.querySelector('.container').insertAdjacentHTML('beforeend', newSection);
  document.querySelector('.final-score').insertAdjacentHTML('afterbegin', firstParagraph);
  document.querySelector('.final-score').insertAdjacentHTML('beforeend', secondParagraph);
  document.querySelector('.container').insertAdjacentHTML('beforeend', newButton);
  return true;
}

// working in the moment
function resetGame () {
  const cardElements = document.getElementsByClassName("card");
  let cardList = Array.from(cardElements);
  undisplayCards(cardList);
  moveCounter(false, true);
  const shuffledCards = shuffle(cardList);
  applyShuffle(cardList);
  document.querySelector('#seconds').textContent = '00';
  document.querySelector('#minutes').textContent = '00';
  return time = 0, starTime = false;
}

// timer function
function timerCount (time) { return time > 9 ? time : "0" + time; }

// Master function to control game flow.
function matchingGame (event) {
  const cardElements = document.getElementsByClassName("card");
  let cardList = Array.from(cardElements);
  const selectCard = setSelector(event.target);
  const openList = openCards(cardList);
  let stopTime = false;
  if (openList.length === 0 && !(selectCard.classList.contains('match'))) {
    displayCard(selectCard);
  }
  else if (openList.length === 1 && !(selectCard.classList.contains('show') || selectCard.classList.contains('match') || selectCard.classList.contains('deck'))) {
    displayCard(selectCard);
    moveCounter(true, false);
    const openList = openCards(cardList);
    matchingCards(openList);
    if (matchedCards() === 16) {
      stopTime = winGame(document.querySelector('.moves').textContent, document.querySelectorAll('.fa-star').length);
    }
  }
  if(!selectCard.classList.contains('deck') && !stopTime) {
    return starTime = true; //time starts if i click on deck and not only in cards || change
  }
}

// Card Elements HTMLCollection Retrieval and Card's List Array Creation
const cardElements = document.getElementsByClassName("card");
let cardList = Array.from(cardElements);

// Card Shuffling
const shuffledCards = shuffle(cardList);
applyShuffle(cardList);

// Timer Count (changed from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript)
let time = 0
let starTime = false
setInterval( function() {
  if (starTime === true) {
    document.querySelector('#seconds').textContent = (timerCount(++time%60));
    document.querySelector('#minutes').textContent = (timerCount(parseInt(time/60,10)));
  }
}, 1000);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
deck.addEventListener('click', matchingGame, false);
restart.addEventListener('click', resetGame, false);
