//*            1. CALCULATOR

function calculate(firstNumber=0, secondNumber=0, operation="+") {
  firstNumber = Number(firstNumber);
  secondNumber = Number (secondNumber)
  switch(operation) {
    case "+" :
      return firstNumber  + secondNumber;
    case "-" :
      return firstNumber - secondNumber;
    case "*" :
      return firstNumber * secondNumber;
    case "/" :
      return firstNumber / secondNumber;
    case "^" : 
      return firstNumber ** secondNumber;
    default:
      return `Looks like the operation ${operation}, does not exist in the archives`
  }
}

//*             2. ROCK PAPER SCISSORS GAME

function playRps(playerChoice) {
  
  //function to resolve the player's choice
  function resolveChoice(choice) {
    const rock = ["rock", "1", 1, "🪨", "👊"];
    const paper = ["paper", "2", 2, "📃"];
    const scissors = ["scissors", "3", 3, "✂️"];

    if (rock.includes(choice)) {
      return "rock"
    }else if (paper.includes(choice)) {
      return "paper" 
    }else if (scissors.includes(choice)){
      return "scissors"
    }else {
      return "unknown"
    }
  }


  //game logic
  function resolveGamePlay(playerChoice, computerChoice) {
    const rules = {
      "rock-scissors": "player",
      "paper-rock": "player",
      "scissors-paper": "player",

      "rock-paper": "computer",
      "paper-scissors": "computer",
      "scissors-rock": "computer"
    }

    const key = `${playerChoice}-${computerChoice}`;
    if (playerChoice === computerChoice) {
      return "draw";
    } else {
      return rules[key];
    }
  }


  //code that makes the computer play.
  let computer = Math.random();
  let computerChoice;
  
  if (computer >= 0.6){
    computerChoice = "scissors";
  } else if (computer >= 0.3 && computer < 0.6){
    computerChoice = "paper";
  } else {
    computerChoice = "rock";
  }


  playerChoice = resolveChoice(playerChoice)
  return (resolveGamePlay(playerChoice, computerChoice))

}

//*              3. NUMBER GUESSING GAME 

function guessNumber(userGuess, lastIndexOfRange=10) {

  let range = lastIndexOfRange;

  if(lastIndexOfRange !== 10 || lastIndexOfRange !== 100) {
    if (lastIndexOfRange > 10){
      range = 100;
    } else {
      range = 10;
    }
  } 


  //Numbers to be guessed from
  const secretNumber = Math.floor(Math.random()*lastIndexOfRange);
  if(secretNumber === userGuess) {
    return `Yaay!!! You won.\nYour Guess: ${userGuess}\nSecret Number: ${secretNumber}`
  }else {
    return `OOOOppss!! You lost that.\nYour Guess: ${userGuess}\nSecret Number: ${secretNumber}`
  }

}

//*               4. WORD COUNTER

function wordCount(phrase) {
  let words = phrase.trim("  ").split(" ");
  let counter = words.length;

  return counter;
}


//*               5. PALINDROME CHECKER

function checkPanlidrome (word) {
  let palindrome = "";
  for (let i = word.length -1; i >= 0; i--) {
    let letter = word[i];
    palindrome =palindrome.concat(letter)
  }
  return palindrome === word;
}

//*               6. FIZZBUZZ GAME

function fizzBuzz (num1, num2, range) {
  let arr = [];
  for(let i = 1; i <= range; i++) {
    let print;
    if((i%num1 == 0) && (i%num2 ==0)) {
      print = "FizzBuzz";
    }else if((i%num2 == 0)) {
      print = "Buzz";
    }else if(i%num1 == 0) {
      print = "Fizz";
    }else {
      print =i;
    }
    arr.push(print)
  }
  return arr
}


//*               7. ARRAY REVERSAL (MANUAL)

function reverseArray(arr){
  let last = arr.length-1
  for(let i = 0; i <= Math.floor((arr.length)/2); i++) {
    let front = arr[i];
    arr[i]= arr[last];
    arr[last]= front;
    last--
  }
  return arr
}


//*               8. VOWEL COUNTER

function countVowels(phrase) {
  const vowels = {"a":0, "e":0, "o":0, "u":0, "i":0};
  for (let letter of phrase.toLowerCase()) {
    if (vowels.hasOwnProperty(letter)) {
      vowels[letter] ++
    }
  }
  return vowels
}


//*               9. REVERSE STRING

function reverseString(phrase) {
  let splitPhrase = phrase.split('')
  let last = splitPhrase.length - 1;
  
  for(let i = 0; i <= (Math.floor((splitPhrase.length-1)/2)); i++) {
    let front = splitPhrase[i];
    splitPhrase[i] = splitPhrase[last];
    splitPhrase[last] = front;
  
    last--
  }

  return splitPhrase.join("")
  
}




