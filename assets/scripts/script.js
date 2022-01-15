var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitButton = document.querySelector(".submit-button");

var score;
var timer;
var timerCount;

function startGame() {
  timerCount = 5;
  startButton.disabled = true;
  startTimer()
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  startButton.disabled = false;
}

function submitScore(event) {
  event.preventDefault();
  var name = document.querySelector("#name").value;
  localStorage.setItem(name, score);
}

startButton.addEventListener("click", startGame);

submitButton.addEventListener("click", submitScore);