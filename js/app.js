/* Shuffle function from http://stackoverflow.com/a/2450976*/
function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    } //End shuffle


/*
 * Create a list that holds all of your cards
 */
let deck = ["fa-diamond", "fa-diamond",
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor",
    "fa-bolt", "fa-bolt",
    "fa-cube", "fa-cube",
    "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle",
    "fa-bomb", "fa-bomb"
];

/*Variables for keeping track of game progression*/
let flippedCards = [], //array should never hold more then two
    matchCount = 0,
    moveCount = 0,
    numStars = 3,
    min = 0,
    sec = 0,
    hours = 0,
    letsStop = 0;

/* variable for info box*/

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*Toggle function for modal info box*/
function toggleModal() {
    modal.classList.toggle("show-modal");
}

/*Calls toggle on window click*/
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

/*Start game by shuffing cards*/

function startGame() {

        /*shuffle cards*/
        deck = shuffle(deck);


        /*assign cards*/
        var i = 0;
        $('.deck').each(function() {
            $(this).find('li').find('i').each(function() {
                $(this).removeAttr('class');
                $(this).addClass("fa " + deck[i]);
                i++;
            });
        }); //end assignment
}; //end startGame()



window.onload = function restart() {
    /*Show info box*/
    $('.modal').addClass('show-modal');
    /*If info box is closed start timer*/
    $('.close-button').click(function() {
        setInterval(function() {
            if (letsStop !== 1) {
                sec++;
                if (sec === 60) {
                    min++;
                    sec = 0;
                }
                if (min === 60) {
                    hours++;
                    min = 0;
                    sec = 0;
                }
                $('.timer').html(hours + ':' + min + ':' + sec);
            }
        }, 1000);
    });
};


/*function removes classes from cards that dont match*/
removeProp = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble disabled');
        flippedCards[0].removeClass('show open animated wobble disabled');
        flippedCards = [];
    }, 1000);
};


 $('.card').click(function() {
    moveCounter();
    /*flip cards*/
    if ((flippedCards.length % 2) === 0) {
        $(this).addClass('show open animated wobble disabled');
        flippedCards.push($(this)); /*push clicked card to array*/
    } else if (flippedCards !== 0) {
        $(this).addClass('show open animated wobble disabled');

        var self = $(this);
       
        for (var i = 0; i < flippedCards.length; i++) {

            if (flippedCards[i].find('i').attr('class') === self.find('i').attr('class')) {
                /* flippedCards.push(self);*/
                self.removeClass('animated wobble disabled');
                self.addClass('show match animated rubberBand');
                flippedCards[i].removeClass('animated wobble disabled');
                flippedCards[i].addClass('show match animated rubberBand');
                console.log('match');
                $(this).off('click');
                /*flippedCards.push(self);*/
                flippedCards = [];
                matchCount++;
                break;
            } else {
                setTimeout(function(){
                $(flippedCards[0]).removeClass('open show');
                self.removeClass('open show');
                removeProp(self);
                },1000);

                console.log('no match');  
            } //end else
        } //end for
    } //end else if

        /*Call modal box on winning*/
    if (matchCount === 8) {
        letsStop = 1;
        console.log("win");
        $('.fin').html(
            "<h1>Congratulations!</h1><h1>You Won!</h1>" + "<h2>You finished in " 
            + moveCount + " moves, with a time of " + hours + ":" + min + ":" + sec + ", giving you a " 
            + numStars + " star rating!" + "</h2>" + "<h3>Click the refresh icon to play again!</h3>");
        $('.modal').addClass('show-modal');
    }

});



function moveCounter(){
        /*count clicks*/
    moveCount++;
    $('.moves').text(moveCount);


    if (moveCount > 26 && moveCount <= 32) {
        $('section ul li').hide();
        $('section ul').append('<li><i class="fa fa-star"></i></li>');
        $('section ul').append('<li><i class="fa fa-star"></i></li>');
        numStars = 2;
    } else if (moveCount > 32) {
        $('section ul li').hide();
        $('section ul').append('<li><i class="fa fa-star"></i></li>');
        numStars = 1;
    }//End star rating if's
}//end moveCounter()

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



//restart function
$('.restart').on('click', function() {
    location.reload();
});

startGame();