var Letter = require('./letter.js');

// Create a Word object consisting of array of letter objects.
// One letter object for each letter in the word.
function Word(str) {
    // Create array of letter objects and push each char from str into it
    this.letters = [];
    
    for (char of str) {
        this.letters.push(new Letter(char));
    }
    
    // Add length property
    this.length = str.length;
}

// Return an array with the indexes of passed in letter object.
// Index corresponds to index in the letters array in the Word object.
// Returns empty array if none
Word.prototype.indexesOf = function (letter) {
    var indexes = [];
    this.letters.forEach((element, index) => {
        if (element.isEqualTo(letter)) {
            indexes.push(index);
        }
    });
    return indexes;
}

module.exports = Word;