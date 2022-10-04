"use strict";
const appDiv = document.getElementById("app");
function makePtag(displayWord) {
    const guess = document.createElement('p');
    guess.textContent = displayWord;
    return guess;
}
function makeLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;
    return label;
}
function makeGameScreen(word) {
    if (appDiv === null)
        return;
    let elements = []; // for pre-made game screen
    let validGuess = 6;
    elements.push(makeLabel("Input word: "));
    const wordBox = document.createElement("input");
    wordBox.setAttribute("type", "text");
    wordBox.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            const guessword = (wordBox.value).toLowerCase();
            const arrLetters = [...guessword]; // list of letters of the guess word
            const arrCorrect = [...word]; // list of letters of the correc answer
            if (guessword.length !== 5) { // if guess is invalid
                alert("Input should have exactly five characters!\nYour input has length " + (wordBox.value).length);
            }
            else {
                if (validGuess > 0) {
                    const guessWord = document.createElement('p');
                    for (var i = 0; i < arrLetters.length; i++) {
                        if (arrLetters[i] === arrCorrect[i]) {
                            const makeSpan = document.createElement('span');
                            makeSpan.classList.add('correct');
                            makeSpan.textContent = arrLetters[i];
                            guessWord.appendChild(makeSpan);
                        }
                        else if (arrCorrect.includes(arrLetters[i])) {
                            const makeSpan = document.createElement('span');
                            makeSpan.classList.add('misplaced');
                            makeSpan.textContent = arrLetters[i];
                            guessWord.appendChild(makeSpan);
                        }
                        else {
                            const makeSpan = document.createElement('span');
                            makeSpan.textContent = arrLetters[i];
                            makeSpan.classList.add('incorrect');
                            guessWord.appendChild(makeSpan);
                        }
                    }
                    //                     const guessWord = document.createElement('p');
                    //                     guessWord.textContent = wordBox.value;
                    // 
                    //                     guessWord.classList.add();
                    //                     
                    appDiv.appendChild(guessWord);
                    if (guessword === word) { // if guess is correct        
                        alert("You have guessed the right word!\nThe word to be guessed is " + word);
                        wordBox.disabled = true;
                    }
                    else {
                        validGuess--;
                    }
                }
                else if (validGuess === 0) {
                    alert("The game is over! You have inputted 6 incorrect guesses!\nThe correct answer is " + word);
                    wordBox.disabled = true;
                }
                wordBox.value = '';
            }
        }
    });
    elements.push(wordBox);
    elements.push(document.createElement("br")); // line break
    elements.push(makeLabel("A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"));
    appDiv.replaceChildren(...elements);
}
function makeStartScreen() {
    if (appDiv !== null) {
        let searchBox = document.getElementById("linkBox");
        if (searchBox.value === "") {
            alert("no URL was specified in the textbox");
        }
        else if (searchBox.value !== null) {
            const URL = searchBox.value;
            console.log(URL);
            let pageXhr = new XMLHttpRequest();
            pageXhr.open('GET', URL, true);
            pageXhr.send();
            pageXhr.onload = function () {
                if (pageXhr.status === 200) {
                    const pageHtmlText = pageXhr.responseText;
                    let wordList = pageHtmlText.split('\n');
                    //console.log(wordList);
                    const randomIndex = Math.floor(Math.random() * wordList.length);
                    const randomWord = wordList[randomIndex];
                    console.log(wordList[randomIndex]);
                    makeGameScreen(randomWord);
                }
            };
        }
    }
}
let submitBtn = document.getElementById("linkButton");
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", makeStartScreen);
