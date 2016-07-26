"use strict";
var GAME_INIT_MONEY = 100;
var GAME_MAX_NUMBER = 10; // THESE NEEDS TO BE CHANGED ON HTML AS WELL
var GAME_MAX_BET = 10; var GAME_MIN_BET = 5;
var bankroll, gameOn, guessPhase, betPhase, bet, guess;
var currencyDisplay, consoleLog, userButton, betInput, guessInput, currencyGraphic;

(function()
{
  bankroll = GAME_INIT_MONEY; gameOn = true; betPhase = true;
  currencyDisplay = document.getElementById("currency-display");
  consoleLog = document.getElementById("console-log");
  userButton = document.getElementById("user-button");
  betInput = document.getElementById("user-input-bet");
  guessInput = document.getElementById("user-input-guess");
  currencyGraphic = document.getElementById("currency-graphic");
  guessInput.classList.toggle('hide');
  setDisplay("Welcome!");
})();


function setDisplay(stringIn)
{
  consoleLog.innerHTML = stringIn;
  currencyDisplay.innerHTML = bankroll.toString();
  displayCurrency();
}

function displayCurrency()
{
  clearCurrency();
  var numTens = bankroll / 10 >> 0;
  var numOnes = bankroll % 10;
  for (var i = 0; i < numTens; i++)
    addCurrency(10);
  for (var i = 0; i < numOnes; i++)
    addCurrency(1);
}

function addCurrency(denomination)
{
  var iconImg = document.createElement('img');
  iconImg.src = "money_" + denomination.toString() + ".png";
  iconImg.style.height = "100px";
  currencyGraphic.appendChild(iconImg);
}

function clearCurrency()
{
  var pics = currencyGraphic.children;
  var length = pics.length;
  while(length--) {
    pics[length].remove();
  }
}

function mainButtonClick()
{
  if (!gameOn) return;
  bet = parseInt(betInput.value);
  if (!isInt(bet)) return;
  if (betPhase)
  {
    bet = parseInt(betInput.value);
    if (bet > GAME_MAX_BET)
      bet = GAME_MAX_BET;
    if (bet < GAME_MIN_BET)
      bet = GAME_MIN_BET;
    toggle();
  }
  else
  {
    guess = parseInt(guessInput.value);
    makeGuess(guess);
  }
}

function makeGuess(guess)
{
  var number = Math.floor(Math.random() * GAME_MAX_NUMBER) + 1;
  var displayString = "The number was " + number;
  switch (guess - number)
  {
    case 0:
      bankroll += bet;
      displayString = displayString + ", you win " + bet + " currency!";
      break;
    case 1:
    case -1:
      displayString = displayString + ", you don't win or lose currency!";
      break;
    default:
      bankroll -= bet;
      displayString = displayString + ", you lose " + bet + " currency!";
  }
  if (bankroll > 0)
  {
    toggle();
    setDisplay(displayString);
  }
  else
  {
    gameOn = false;
    setDisplay(displayString + " You lose!");
  }
}

function resetGame()
{
  bankroll = GAME_INIT_MONEY; gameOn = true;
  if (guessPhase)
  {
    guessPhase = false;
    betInput.classList.toggle('hide');
    guessInput.classList.toggle('hide');
    userButton.innerHTML = "Bet!";
  }
  setDisplay("Better luck this time!");
}

function toggle()
{
  betPhase = !betPhase; guessPhase = !guessPhase;
  betInput.classList.toggle('hide');
  guessInput.classList.toggle('hide');
  if (guessPhase)
  {
    userButton.innerHTML = "Guess!";
    setDisplay("Guess a number between 1 and " + GAME_MAX_NUMBER);
  }
  else
  {
    userButton.innerHTML = "Bet!";
  }
}

function isInt(n) 
{
    return n != "" && !isNaN(n) && Math.round(n) == n;
}