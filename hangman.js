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
});