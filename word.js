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
Word.prototype.indexesOf = function (char) {
    var indexes = [];
    var letter = new Letter(char);
    this.letters.forEach((element, index) => {
        if (element.isEqualTo(letter)) {
            indexes.push(index);
        }
    });
    return indexes;
}

Word.prototype.asString = function () {
    var str = '';
    this.letters.forEach(element => {
        str += element.value;
    });
    return str;
}

Word.prototype.asCharArr = function () {
    var charArr = [];
    this.letters.forEach(element => {
        charArr.push(element.value);
    });
    return charArr;
}
module.exports = Word;