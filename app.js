/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
diceDOM = document.querySelector('.dice');

/**************************************
 * Show dice, update current score, erase current score if rolled 1 and switch users, hold button to add current score to total score and swtich user
 */

//Zero out scores
var zeroScores = function (classes) {
  var x = document.querySelectorAll(classes);
  for (i = 0; i < x.length; i++) {
    x[i].textContent = 0;
  }
}

zeroScores('.player-current-score');
zeroScores('.player-score');

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