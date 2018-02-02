function Letter(character) {
    this.value = character;

    if (character === ' ') {
        this.guessed = true;
    }
    else {
        this.guessed = false;
    }
}

// Compare a letter object to another letter object
// Returns true if they are the same character, ignoring case.
// Returns false if they are different characters.
Letter.prototype.isEqualTo = function (letter) {
    if (this.value.toLowerCase() === letter.value.toLowerCase()) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = Letter;