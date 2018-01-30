var inquirer = require('inquirer');
var fs = require('fs');
var Word = require('./word.js');

// Array for word objects
var wordlist = [];

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
    var currentWord;
    var currentWordStr;
    var progress = '';
    // choose a random word from the list
    currentWord = wordlist[Math.floor(Math.random() * wordlist.length)]
    currentWordStr = currentWord.asString();
    for (char of currentWordStr) {
        if (char !== ' ') {
            progress += '_';
        }
        else {
            progress += ' ';
        }
    }
    console.log(stringWithSpaces(progress));
}

// Print a string with spaces between each character
function stringWithSpaces(str) {
    var printStr = '';
    for (char of str) {
        printStr += char + ' ';
    }
    return printStr;
}