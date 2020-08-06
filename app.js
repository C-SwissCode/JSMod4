/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Game Initialization
var scores, roundScore, activePlayer, diceDOM;
diceDOM = document.querySelector('.dice');

function initializeGame() {
  //Switch active player back to player 1
  var activeDOM0, activeDOM1;
  activeDOM0 = document.querySelector('.player-0-panel');
  activeDOM1 = document.querySelector('.player-1-panel');
  if (activePlayer === 1) {
    activeDOM0.classList.add('active');
    activeDOM1.classList.remove('active');
  }

  //Load zero scores, hide dice, and reset active player
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  zeroScores('.player-score');
  zeroScores('.player-current-score');
  diceDOM.style.display = 'none';
}
// document.addEventListener('DOMContentLoaded', initializeGame);
window.addEventListener('load', initializeGame);
// this loads after all files have been loaded including stylesheets and images. Where 'document.addEventListener('DOMContentLoaded', initializeGame); loads after only the full HTML document has been completely loaded and before any other files.


//New Game
document.querySelector('.btn-new').addEventListener('click', initializeGame);



/**************************************
 * Show dice, update current score, erase current score if rolled 1 and switch users, hold button to add current score to total score and swtich user
 */

//Zero out scores
function zeroScores(classes) {
  var x = document.querySelectorAll(classes);
  for (i = 0; i < x.length; i++) {
    x[i].textContent = 0;
  }
}

//Rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function () {

  //Update current score if 1 then zero out current and switch player
  var dice = Math.floor(Math.random() * 6) + 1;
  if (dice !== 1) {
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM.style.display = 'block';
    roundScore += dice;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
  } else {
    diceDOM.style.display = 'none';
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    //Switch active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  }
})


//Holding Score
document.querySelector('.btn-hold').addEventListener('click', function () {
  //Update total score and clear current score
  scores[activePlayer] += roundScore;
  roundScore = 0;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  document.getElementById('current-' + activePlayer).textContent = roundScore;

  //Switch users and hide dice
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  diceDOM.display = 'none';
})