// Global variables

// Variables for various HTML elements
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var questionField = document.querySelector(".question");
var answerButtons = document.querySelectorAll(".answer-button");
var answerMessage = document.querySelector(".answer-message");
var scoreboard = document.querySelector(".score");
var submitButton = document.querySelector(".submit-button");
var nameInput = document.querySelector("#name");

// Variables to be referenced in later functions
var currentQuestion;
var score;
var timer;
var timerCount;
// var timerMini;
// var timerCountMini;
var endGameMessage = ["THANK", "YOU", "FOR", "PLAYING"];
var playAgainMessage = ["ARE", "YOU", "READY", "TO PLAY?"];

// Array of objects of questions
var questions = [
  {
    question: "Declaring variables before they are used is called what?",
    answers: [
      "Lifting",
      "Hoisting",
      "Piggybacking",
      "Setting"
    ],
    correctAnswer: 1
  },
  {
    question: "(True) is what kind of data type?",
    answers: [
      "Boolean",
      "Number",
      "Absolute",
      "String"
    ],
    correctAnswer: 0
  },
  {
    question: "The global object in a browser is what?",
    answers: [
      "Display",
      "Console",
      "DOM",
      "Window"
    ],
    correctAnswer: 3
  },
  {
    question: "Which comparison operator means strictly equal (equal in value and data type)?",
    answers: [
      "=",
      "==",
      "===",
      "===="
    ],
    correctAnswer: 2
  },
  {
    question: "Which of the following is NOT a popular JavaScripit code library?",
    answers: [
      "jQuery",
      "React",
      "Espresso",
      "D3"
    ],
    correctAnswer: 2
  },
  {
    question: "DOM stands for what?",
    answers: [
      "Dingos Oughta Masquerade",
      "Disco On The Moon",
      "Dracula Ordering Marzipan",
      "Document Object Model"
    ],
    correctAnswer: 3
  },
  {
    question: "Math.random() returns a random number between 0 and _ ?",
    answers: [
      "1",
      "10",
      "100",
      "1000"
    ],
    correctAnswer: 0
  },
  {
    question: "Which characters comment out a line in JavaScript?",
    answers: [
      "#",
      "/*",
      "<!--",
      "//"
    ],
    correctAnswer: 3
  },
  {
    question: "Which of the following is NOT an event than can be listened to?",
    answers: [
      "peep",
      "click",
      "submit",
      "keydown"
    ],
    correctAnswer: 0
  },
  {
    question: "Which method removes the first index of an array?",
    answers: [
      "pop()",
      "push()",
      "shift()",
      "slice()"
    ],
    correctAnswer: 2
  },
];

// Disables all buttons except start button
for (var i = 0; i < answerButtons.length; i++) {
  answerButtons[i].disabled = true;
}
submitButton.disabled = true;
nameInput.disabled = true;

// startGame function called when player clicks start button
function startGame() {
  // Disables start button while game is in progress
  startButton.disabled = true;
  // Enables answer buttons
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = false;
  }
  // Resets timer, score, current question, and answer message
  timerCount = 30;
  timerElement.textContent = timerCount;
  score = 0;
  scoreboard.textContent = `Score: ${score}`;
  currentQuestion = 0;
  answerMessage.textContent = "";
  // Renders first question
  renderQuestion()
  // Begins timer
  startTimer()
}

// startTimer function called when game begins
function startTimer() {
  // Creates 30 second timer
  timer = setInterval(function () {
    timerCount--;
    // Dynamically displays timer
    timerElement.textContent = timerCount;
    // Clears timer and ends game when time is up
    if (timerCount <= 0) {
      timerElement.textContent = 0;
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Renders first question when game begins
function renderQuestion() {
  questionField.textContent = questions[currentQuestion].question;
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = questions[currentQuestion].answers[i];
  }
}

// checkAnswer function called when player clicks any answer button
function checkAnswer(event) {
  // If the chosen answer matches the correct answer, inform user and add 10 points to score
  if (event.target.textContent === questions[currentQuestion].answers[(questions[currentQuestion].correctAnswer)]) {
    score = score + 10;
    answerMessage.textContent = "Correct! 10 points!";
    // // correctAnswer()
    // Otherwise, subtract 5 seconds from timer
  } else {
    timerCount = timerCount - 5;
    answerMessage.textContent = "Incorrect! Minus 5 seconds!";
  }
  // Updates score display and increases the question count
  scoreboard.textContent = `Score: ${score}`;
  currentQuestion++;
  // If no more questions, clear timer and end game
  if (currentQuestion === questions.length) {
    clearInterval(timer);
    endGame();
    // Otherwise, render next question
  } else {
    renderQuestion();
  }
}

// The following function was drafted to display answer responses only for a few seconds.
// I scrapped the idea for now but might return to it later.

// function correctAnswer() {
//   answerMessage.textContent = "Correct! 10 points!";
//   timerCountMini = 1;
//   timerMini = setInterval(function () {
//     timerCountMini--;
//     if (timerCountMini === 0) {
//       clearInterval(timerMini);
//       answerMessage.textContent = "";
//     }
//   }, 1000);
// }

// endGame function called when game ends
function endGame() {
  // Disables answer buttons and enables name input
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = true;
  }
  nameInput.disabled = false;
  // Clears last question and displays end of game messaages
  questionField.textContent = "";
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = endGameMessage[i];
  }
  answerMessage.textContent = "G A M E  O V E R";
}

// submitScore function called when name submitted
function submitScore(event) {
  // Prevents browser from refreshing page
  event.preventDefault();
  // Disables name input and Submit button and enables start button
  nameInput.disabled = true;
  submitButton.disabled = true;
  startButton.disabled = false;
  // Resets displays
  timerElement.textContent = 30;
  scoreboard.textContent = "";
  answerMessage.textContent = "";
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = playAgainMessage[i];
  }
  // Records and trims player name and score and saves to local storage
  var name = nameInput.value.trim();
  var finalScore = {
    name: name,
    score: score
  };
  localStorage.setItem("final score", JSON.stringify(finalScore));
  // Resets name input
  nameInput.value = "";
  // Adds score to leaderboard
  setLeaderboard();
}

function setLeaderboard() {
  // Retrieves last score from local storage and creates and appends a list item to the leaderboard
  var lastScore = JSON.parse(localStorage.getItem("final score"));
  console.log(lastScore);
  if (lastScore) {
    var li = document.createElement("li");
    li.textContent = `${lastScore.name}: ${lastScore.score}`;
    document.querySelector("ol").appendChild(li);
  }
};

// The follwing code was drafted with a tutor in effort to create a sorted list of high scores.
// This code ultimately didn't work but I kept it for reference.

// function submitScore(event) {
//   event.preventDefault();
//   nameInput.disabled = true;
//   submitButton.disabled = true;
//   scoreboard.textContent = "";
//   nameInput.value = "";
//   answerMessage.textContent = "";
//   var name = nameInput.value.trim();
//   var finalScore = {
//     name: name,
//     score: score
//   };
//   var highScores;
//   localStorage.setItem("final score", JSON.stringify(finalScore));
//   highScores = JSON.parse(localStorage.getItem("final score")) || "[]";
//   highScores.push(finalScore);
//   setLeaderboard();
// }

// function setLeaderboard() {
//   var playerScores = localStorage.getItem("final score") || [];
//   playerScores.sort(function (a, b) {
//     return b.score - a.score
//   })
//   playerScores.forEach(function (score) {
//     var litag = document.createElement("li");
//     litag.textContent = score.name + ":" + score.score;
//     document.querySelector("ol").appendChild(litag);
//   })
// }

// function clearHighScores() {
//   localStorage.removeItem("final score");
//   setLeaderboard();
// }

// Starts game when player clicks start button
startButton.addEventListener("click", startGame);

// Calls checkAnswer function when player clicks any answer button
for (var i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", checkAnswer)
};

// Enables sumbit score button only when name input is populated
// Function checks whenver key is typed into field
nameInput.addEventListener("keyup", function () {
  if (nameInput.value) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

// Submits score when player clicks submit button
submitButton.addEventListener("click", submitScore);