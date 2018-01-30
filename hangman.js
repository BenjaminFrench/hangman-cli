var inquirer = require('inquirer');
var fs = require('fs');
var Word = require('./word.js');

// Array for word objects
var wordlist = [];

var currentWord;
var currentWordStr;
var progress = '';
var guessesRemaining;

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
    guessesRemaining = 25;
    // choose a random word from the list
    currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    currentWordStr = currentWord.asString();

    // Initialize progress string
    for (char of currentWordStr) {
        if (char !== ' ') {
            progress += '_';
        }
        else {
            progress += ' ';
        }
    }
    console.log(stringWithSpaces(progress));
    console.log();
    askForGuess();
}

function askForGuess(params) {
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
        guessLetter(answers.letterGuessed);
        console.log(stringWithSpaces(progress));
    });
}

function guessLetter(char) {
    var occurences = currentWord.indexesOf(char);
    if (occurences.length > 0) {
        occurences.forEach(element => {
            progress[element] = currentWordStr[element];
        });

    }
    else {

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