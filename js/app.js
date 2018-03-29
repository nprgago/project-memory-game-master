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

// Move counter Function ||
function moveCounter(increment, restart) {
  const starSelector = document.querySelectorAll('.fa-star');
  const moveSelector = document.querySelector('.moves');
  const currentMoves = Number(moveSelector.textContent);
  if (increment === true && restart === false) {
    const addMove = currentMoves + 1;
    moveSelector.textContent = addMove;
    if (currentMoves === 9) {
      const starLost = starSelector[2];
      starLost.classList.remove("fa-star");
      starLost.classList.add("fa-star-o");
    } else if (currentMoves === 15) {
      const starLost = starSelector[1];
      starLost.classList.remove("fa-star");
      starLost.classList.add("fa-star-o");
    } else if (currentMoves === 24) {
      const starLost = starSelector[0];
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
}

// Show Card Selected function
function displayCard (selector) {
  const deck = document.querySelector('.deck')
  if (selector !== deck && !(selector.classList.contains("show"))) {
    selector.classList.add('open', 'show');
    moveCounter(true, false);
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

// working in the moment ||
function resetGame () {
  const cardElements = document.getElementsByClassName("card");
  let cardList = Array.from(cardElements);
  undisplayCards(cardList);
  moveCounter(false, true);
  const shuffledCards = shuffle(cardList);
  applyShuffle(cardList);
}




// Card Elements HTMLCollection Retrieval and Card's List Array Creation
const cardElements = document.getElementsByClassName("card");
let cardList = Array.from(cardElements);

// Card Shuffling
const shuffledCards = shuffle(cardList);
applyShuffle(cardList);

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
