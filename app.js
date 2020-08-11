/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/********************************
 * Game initialization
 */

var scores, roundScore, activePlayer, diceDOM, btnRoll, btnHold, gamePlaying, maxscore;
diceDOM = document.querySelector('.dice');
btnRoll = document.querySelector('.btn-roll');
btnHold = document.querySelectorAll('.btn-hold');
initializeGame();


function initializeGame() {
  //Switch active player back to player 1
  var activeDOM0, activeDOM1;
  gamePlaying = true;
  activeDOM0 = document.querySelector('.player-0-panel');
  activeDOM1 = document.querySelector('.player-1-panel');
  activeDOM0.classList.remove('active');
  activeDOM1.classList.remove('active');
  activeDOM0.classList.add('active');
  activeDOM0.classList.remove('winner');
  activeDOM1.classList.remove('winner');
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';

  //Load zero scores, hide dice, and reset active player
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  zeroScores('.player-score');
  zeroScores('.player-current-score');
  diceDOM.style.display = 'none';
  document.querySelector('.winscore').defaultValue = 20;
  maxscore = parseInt(document.querySelector('.winscore').value);
  console.log(typeof maxscore);
  console.log(maxscore);
}

//New Game
document.querySelector('.btn-new').addEventListener('click', initializeGame);

//Zero out scores
function zeroScores(classes) {
  var x = document.querySelectorAll(classes);
  for (i = 0; i < x.length; i++) {
    x[i].textContent = 0;
  }
}

//Ways to execute things when the page loads:
// document.addEventListener('DOMContentLoaded', initializeGame);
// window.addEventListener('load', initializeGame);
// this loads after all files have been loaded including stylesheets and images. Where 'document.addEventListener('DOMContentLoaded', initializeGame); loads after only the full HTML document has been completely loaded and before any other files.


/**************************************
 * Show dice, update current score, erase current score if rolled 1 and switch users, hold button to add current score to total score and swtich user
 */
var prvRoll;

//Rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    if (prvRoll === 6) {
      scores[activePlayer] = 0;
      roundScore = 0;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      document.getElementById('current-' + activePlayer).textContent = roundScore;
      nextPlayer();
      prvRoll = 0;
    } else if (dice !== 1) {
      diceDOM.src = 'dice-' + dice + '.png';
      diceDOM.style.display = 'block';
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
      prvRoll = dice;
    } else {
      roundScore = 0;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
      //Switch active player
      nextPlayer();
    }
  }
})


//Holding Score
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    prvRoll = 0;
    diceDOM.style.display = 'none';
    //Update total score and clear current score
    scores[activePlayer] += roundScore;
    roundScore = 0;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    //Check if player won the game
    if (scores[activePlayer] >= maxscore) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Switch users and hide dice
      nextPlayer();
    }
  }
})

function nextPlayer() {
  diceDOM.style.display = 'none';
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/