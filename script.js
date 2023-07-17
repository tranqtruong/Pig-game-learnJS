'use strict';

let currentPlayer = 0; 
console.log('current player: ' + currentPlayer);
let totalPlayerScore1 = 0;
let totalPlayerScore2 = 0;
let currentScore = 0;

let playerScore1Element = document.getElementById('score--0');
let currentScore1Element = document.getElementById('current--0');

let playerScore2Element = document.getElementById('score--1');
let currentScore2Element = document.getElementById('current--1');

let diceElement = document.querySelector('.dice');
let newGameButton = document.querySelector('.btn--new');
let rollDiceButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');


// roll dice
rollDiceButton.addEventListener('click', handleRollDice);

function handleRollDice(){
    let scoreRandom = randomDice();

    if(scoreRandom === 1){
        resetCurrentScore();
        switchCurrentPlayer();
        console.log('current player: ' + currentPlayer);
        return;
    }

    currentScore += scoreRandom;

    if(isCurrentPlayerWin()){
        changeTotalScore();
        resetCurrentScore();
        lockTheGame();
        return;
    }

    if(isPlayer1()){
        currentScore1Element.textContent = currentScore;
    }else{
        currentScore2Element.textContent = currentScore;
    }
}

function randomDice(){
    let scoreRandom = Math.trunc(Math.random() * 6 + 1);
    let diceImgSrc = `dice-${scoreRandom}.png`;
    diceElement.src = diceImgSrc;
    return scoreRandom;
}

function switchCurrentPlayer(){
    currentPlayer = (currentPlayer + 1) % 2;
    if(isPlayer1()){
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');
    }else{
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
    }
}

function resetCurrentScore(){
    currentScore = 0;
    if(isPlayer1()){
        currentScore1Element.textContent = 0;
    }else{
        currentScore2Element.textContent = 0;
    }
}

function isPlayer1(){
    return currentPlayer === 0 ? true : false;
}

function lockTheGame(){
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
}

function unlockTheGame(){
    rollDiceButton.disabled = false;
    holdButton.disabled = false;
}



// hold
holdButton.addEventListener('click', handleHold);

function handleHold(){
    changeTotalScore();
    resetCurrentScore();
    switchCurrentPlayer();
}

function changeTotalScore(){
    if(isPlayer1()){
        totalPlayerScore1 += currentScore;
        playerScore1Element.textContent = totalPlayerScore1;
    }else{
        totalPlayerScore2 += currentScore;
        playerScore2Element.textContent = totalPlayerScore2;
    }
}

function isCurrentPlayerWin(){
    if(isPlayer1()){
        if(totalPlayerScore1 + currentScore >= 20)
            return true;
    }else{
        if(totalPlayerScore2 + currentScore >= 20)
            return true;
    }

    return false;
}

function resetDice(){
    let diceImgSrc = 'dice-1.png';
    diceElement.src = diceImgSrc;
}

function resetTheGame(){
    resetCurrentScore();
    totalPlayerScore1 = 0;
    playerScore1Element.textContent = 0;
    playerScore2Element.textContent = 0;
    totalPlayerScore2 = 0;
    if(!isPlayer1){
        switchCurrentPlayer();
    }
    resetDice();
    unlockTheGame();
}



// new game
newGameButton.addEventListener('click', resetTheGame);