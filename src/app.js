//var POSSIBLE_WORDS = VALID_GUESSES;

function buttonClicked() {
  var wordList = document.getElementById("word-text");
  var guess = document.getElementById("inputWords");
  var hints = document.getElementById("inputHints");

  //if inputs are invalid, alert error msg
  if (!validateInputs(guess.value, hints.value)) {
    alert("Invalid inputs");
    return;
  }

  updateWordleList(guess.value, hints.value);

  //update vals
  let txt = "";
  for (g of VALID_GUESSES) {
    txt += g + ", ";
  }
  wordList.innerHTML = txt.substring(0, txt.length - 2);
  guess.value = "";
  hints.value = "";
}

function validateInputs(guess, hints) {
  var validGuess = guess.trim().length == 5;

  //check if hints is valid
  let validHintsArray = ["b", "y", "g"];
  let validHints = hints.length == 5;
  for (let i = 0; i < 5; i++) {
    if (!validHintsArray.includes(hints.charAt(i))) validHints = false;
  }

  return validGuess && validHints;
}

function updateWordleList(guess, hint) {
  banned = new Set();
  must_contain = new Set();
  contain_order = {};
  ban_order = {};
  remove = new Set();

  for (let i = 0; i < 5; i++) {
    let hintChar = hint.charAt(i);
    let guessChar = guess.charAt(i);

    if (hintChar == "b") banned.add(guessChar);
    else if (hintChar == "y") {
      must_contain.add(guessChar);
      ban_order[i] = guessChar;
    } else {
      contain_order[i] = guessChar;
    }

    for (const word of VALID_GUESSES) {
      let x = [];
      for (const c of word) {
        if (banned.has(c)) x.push(c);
      }
      if (x.length != 0) remove.add(word);

      for (let ch of must_contain) {
        if (!word.includes(ch)) remove.add(word);
      }

      for (const [key, value] of Object.entries(contain_order)) {
        if (word[key] != value) remove.add(word);
      }

      for (const [key, value] of Object.entries(ban_order)) {
        if (word[key] == value) remove.add(word);
      }
    }

    new_possible = [];
    for (const www of VALID_GUESSES) {
      if (!remove.has(www)) new_possible.push(www);
    }
    console.log(new_possible);

    VALID_GUESSES = new_possible;
  }
}
