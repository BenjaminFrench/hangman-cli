var inquirer = require('inquirer');
var fs = require('fs');
var Word = require('./word.js');

// Array for word objects
var wordlist = [];

var guessedAlready = [];
var currentWord;
var currentWordCharArr;
var progressCharArr = [];
var guessesRemaining = 25;

// Read wordlist from file. Words should be on their own line
fs.readFile("./wordlist.txt", 'utf-8', function(error, data) {
    if (error) throw error;
    words = data.split('\n');

    words.forEach(element => {
        wordlist.push(new Word(element));
    });
    startGame();
});

function startGame() {
    progressCharArr = [];
    guessedAlready = [];
    // choose a random word from the list
    currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    currentWordCharArr = currentWord.asCharArr();

    // Initialize progress string
    for (char of currentWordCharArr) {
        if (char !== ' ') {
            progressCharArr.push('_');
        }
        else {
            progressCharArr.push(' ');
        }
    }
    console.log(stringWithSpaces(progressCharArr));
    console.log();
    askForGuess();
}

function askForGuess() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'letterGuessed',
            message: 'Guess a letter:',
            validate: function (value) {
                var pass = value.match(
                    /^([A-z])$/
                );
                if (pass) {
                    return true;
                }
                return 'Please enter a single character';
            }
        }
    ])
    .then(answers => {
        if (guessedAlready.includes(answers.letterGuessed)) {
            console.log();
            console.log(stringWithSpaces(progressCharArr));
            console.log();
            console.log('You already guessed ' + answers.letterGuessed);
            console.log(guessesRemaining + ' guesses remaining');
            console.log();
        }
        else {
            guessedAlready.push(answers.letterGuessed);
            if (guessLetter(answers.letterGuessed)) {
                console.log();
                console.log(stringWithSpaces(progressCharArr));
                console.log();
                console.log('Correct!!!');
                console.log();
            }
            else {
                console.log();
                console.log(stringWithSpaces(progressCharArr));
                console.log();
                console.log('Incorrect!!!');
                console.log();
                console.log(guessesRemaining + ' guesses remaining');
                console.log();
            }
        }

        if (checkForWin()) {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'playAgain',
                    message: 'You Win! Play again?',
                    default: false
                }
            ])
            .then(answers => {
                if (answers.playAgain) {
                    startGame();
                }
                else {
                    process.exit(0);
                }
            });
        }
        else if (checkForLoss()) {
            // loss
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'playAgain',
                    message: 'You Lose! Play again?',
                    default: false
                }
            ])
            .then(answers => {
                if (answers.playAgain) {
                    guessesRemaining = 25;
                    startGame();
                }
                else {
                    process.exit(0);
                }
            });
        }
        else {
            askForGuess();
        }
    });
}

function guessLetter(char) {
    var occurences = currentWord.indexesOf(char);
    if (occurences.length > 0) {
        occurences.forEach(element => {
            progressCharArr[element] = currentWordCharArr[element];
        });
        return true;
    }
    else {
        guessesRemaining--;
        return false;
    }
}

function checkForWin() {
    if (progressCharArr.join('') === currentWord.asString()) {
        return true;
    }
    else {
        return false;
    }
}

function checkForLoss() {
    if (guessesRemaining < 1) {
        return true;
    }
    else {
        return false;
    }
}

// Print a string with spaces between each character
function stringWithSpaces(str) {
    var printStr = '';
    for (char of str) {
        printStr += char + ' ';
    }
    return printStr;
}