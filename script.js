var wordLength = 5;
var numTries = 7;

var answer = getWordOfLength(wordLength)

var placing = true;
var currentRow = 0;
var currentBox = 0;

function boxClicked(event) {
    var box = event.path[0]
    if (box.id!=0) {
        sounds[box.id].play();
    }
}

function initBoard() {
    let board = document.getElementById("game-board");
    board.innerHTML='';

    for (let i = 0; i < numTries; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < wordLength; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            box.onclick = boxClicked;
            box.id = 0;
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()

function getBox(row,i) {
    let board = document.getElementById("game-board");
    return board.children.item(row).children.item(i);
}

function buttonClicked(n,str) {
    if (placing && currentRow<numTries) {
        if (currentBox<wordLength) {
            var box = getBox(currentRow,currentBox)
            box.id=n
            box.innerHTML = str
            currentBox+=1
            let currentWord = document.getElementById("currentWord");
            var phonemes = []
            for (let i=0; i<currentBox; i++) {phonemes[i] = getBox(currentRow,i).id}
            var result = findPronunciation(phonemes)
            if (result==null) {currentWord.innerHTML = "n/a"} else {currentWord.innerHTML = result}
        }
    }
    sounds[n].play();
}

function placeToggled() {
    var elm = document.getElementById("placeToggle")
    placing = !placing;
    if (elm.innerHTML == "Placing") {
        elm.innerHTML = "Listening"
        elm.style.backgroundColor = "rgb(202, 158, 115)";
    } else {
        elm.innerHTML = "Placing"
        elm.style.backgroundColor = "rgb(115, 149, 115)";
    }   
}

function findKeyboardButton(n) {
    return document.getElementById('k'+n)
}

function enter() {
    if (currentBox==wordLength) {
        var phonemes = []
        for (let i=0; i<wordLength; i++) {phonemes[i] = getBox(currentRow,i).id}
        var result = findPronunciation(phonemes)

        if (result==null) {window.alert("That is not a word!"); } else {
            for (let i=0;i<wordLength; i++) {
                var box = getBox(currentRow,i)
                var col = "gray";
                if (answer[i+1]==box.id) {col = "green";} else {
                    var yellow = false;
                    for (let j=0;j<wordLength; j++) {
                        if (answer[j+1]==box.id) {yellow=true;}
                    }
                    if (yellow) {col = "yellow";}
                }
                box.style.backgroundColor = col;
                var key = findKeyboardButton(box.id);
                key.style.backgroundColor = col;
            }
            currentRow++;
            currentBox=0;
        }
    } else {
        window.alert("Complete your word first!");
    }
}

function undo() {
    if (currentBox>0) {
        currentBox = currentBox-1
        var box = getBox(currentRow,currentBox);
        box.innerHTML=""
        box.id=0
    }
}

var sounds = []
for (let i=1; i<47; i++) {sounds[i] = new Audio("Sounds/"+i.toString()+".wav");}

/*
var currentIndex = 0; // keep track of the current index

sounds.forEach(function(sound) {
    sound.onended = onended; // add the same event listener for all audios in our array
});
function onended(evt) {
    currentIndex++; // increment our index
    sounds[currentIndex].play(); // play the next sound
}

btn.onclick = sounds[0].play.bind(sounds[0]);*/