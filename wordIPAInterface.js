function findWord(word) {
    var i=0
    while (i<wordIPAs.length) {
        if (wordIPAs[i][0]==word) return wordIPAs[i]
        i++;
    }
    return null
}

function findPronunciation(phonemes) {
    var i=0
    while (i<wordIPAs.length) {
        var j=1
        var entry = wordIPAs[i]
        if (phonemes.length==entry.length-1) {
            while (entry[j]==phonemes[j-1]) {
                if (j==phonemes.length) {return entry[0]}
                j++;
            }
        }
        i++;
    }
    return null
}

function countPhonemes() {
    var count = 0;
    for (let i=0; i<wordIPAs.length; i++) {
        count += wordIPAs[i].length-1
    }
    return count
}

function getWordOfLength(l) {
    var word = ""
    while (word.length-1!=l) {
        console.log(1)
        word = wordIPAs[Math.floor(Math.random()*wordIPAs.length)];
    }
    return word
}