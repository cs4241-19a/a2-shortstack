// https://www.youtube.com/watch?v=WR_pWXJZiRY
const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');

const scoreboard = {
    player: 0,
    computer: 0
};
let winner;
let round = 0;
let playerChoice;
let computerChoice;
let maxChoices = parseInt(configNum);

const getComputerChoice = function () {

    const rand = Math.floor(Math.random() * Math.floor(maxChoices));  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random


    switch(maxChoices){
        case 3:
            if(rand === 0) computerChoice = 'rock';
            else if(rand === 1) computerChoice = 'paper';
            else if(rand === 2) computerChoice = 'scissors';
            break;
        case 5:
            if(rand === 0) computerChoice = 'rock';
            else if(rand === 1) computerChoice = 'paper';
            else if(rand === 2) computerChoice = 'scissors';
            else if(rand === 3) computerChoice = 'lizard';
            else if(rand === 4) computerChoice = 'spock';
            break;
        default:
            computerChoice = 'rock';
            break;
    }
};

// Who wins
const getWinner = function (player, comp) {

    switch(maxChoices) {
        case 3:
            if (player === 'rock') {
                if (comp === 'rock') winner = 'tied';
                else if (comp === 'paper') winner = 'computer';
                else if (comp === 'scissors') winner = 'player';
            } else if (player === 'paper') {
                if (comp === 'rock') winner = 'player';
                else if (comp === 'paper') winner = 'tied';
                else if (comp === 'scissors') winner = 'computer';
            } else if (player === 'scissors') {
                if (comp === 'rock') winner = 'computer';
                else if (comp === 'paper') winner = 'player';
                else if (comp === 'scissors') winner = 'tied';
            }
            break;
        case 5:
            if (player === 'rock') {
                if (comp === 'rock') winner = 'tied';
                else if (comp === 'paper' || comp === 'spock') winner = 'computer';
                else if (comp === 'scissors' || comp === 'lizard') winner = 'player';
            } else if (player === 'paper') {
                if (comp === 'rock' || comp === 'spock') winner = 'player';
                else if (comp === 'paper') winner = 'tied';
                else if (comp === 'scissors' || comp === 'lizard') winner = 'computer';
            } else if (player === 'scissors') {
                if (comp === 'rock' || comp === 'spock') winner = 'computer';
                else if (comp === 'paper' || comp === 'lizard') winner = 'player';
                else if (comp === 'scissors') winner = 'tied';
            } else if (player === 'lizard') {
                if (comp === 'rock' || comp === 'scissors') winner = 'computer';
                else if (comp === 'paper' || comp === 'spock') winner = 'player';
                else if (comp === 'lizard') winner = 'tied';
            } else if (player === 'spock') {
                if (comp === 'paper' || comp === 'lizard') winner = 'computer';
                else if (comp === 'rock' || comp === 'scissors') winner = 'player';
                else if (comp === 'spock') winner = 'tied';
            }
            break;
        default:
            winner = 'player';
            break;
    }
};


// Game
const play = function (event) {
    playerChoice = event.target.id;
    maxChoices = parseInt(configNum);
    getComputerChoice();
    getWinner(playerChoice, computerChoice);
    round += 1;

    showWinner(winner, computerChoice);
};


const showWinner = function (winner, computerChoice) {
    if (winner === 'player') {
        // update score
        scoreboard.player += 1;
        // show modal
        result.innerHTML = `
            <h1 class="text-win">Player Wins</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Picked <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if(winner === 'computer') {
        // update score
        scoreboard.computer += 1;
        // show modal
        result.innerHTML = `
            <h1 class="text-lose">Computer Wins</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Picked <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if(winner === 'tied') {
        // show modal
        result.innerHTML = `
            <h1>Round Tied</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Picked <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    }

    // show score
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display = 'block';
};

// close modal window
const clearModal = function (event) {
  if(event.target == modal) {         // used loose equality to find the HTML element including the background
      modal.style.display = 'none';
  }
};

// restart game
const restartGame = function () {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
        <p>Player: 0</p>
        <p>Computer: 0</p>
    `;

};



// Event listner
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
