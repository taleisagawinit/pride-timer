// html variables

// title
let title = document.querySelector("#title");
// study time
let studyTime = document.querySelector("#studyTime");
// break time
let breakTime = document.querySelector("#breakTime");
// countdown mins
let countdownMins = document.querySelector("#countdown-mins");
// countdown sec
let countdownSec = document.querySelector("#countdown-sec");
// start container
let startContainer = document.querySelector(".start-container");
// countdown container
let countdownContainer = document.querySelector(".countdown-container");
// countdown buttons
let countdownBtns = document.querySelector(".countdownBtns");


// buttons

// add breaktime button
let addBreakTime = document.querySelector("#addBreakTime");
// minus breaktime button
let subtractBreakTime = document.querySelector("#subtractBreakTime");
// add studytime button
let addStudyTime = document.querySelector("#addStudyTime");
// minus studytime button
let subtractStudyTime = document.querySelector("#subtractStudyTime");
// start button
let startBtn = document.querySelector("#startBtn");
// pause button
let pauseBtn = document.querySelector("#pauseBtn");
// reset button
let resetBtn = document.querySelector("#resetBtn");


// run timer interval
let runTimer;
// track whether you are on a break or studying
let currentInterval = "study"; 
// track whether timer is paused or not
let pause = false;

let soundEffect = new Audio();

let currentTimeLeftInSeconds;


addStudyTime.addEventListener("click", () => increaseTime(45, "studyTime"));
subtractStudyTime.addEventListener("click", () => decreaseTime(15, "studyTime"));
addBreakTime.addEventListener("click", () => increaseTime(30, "breakTime"));
subtractBreakTime.addEventListener("click", () => decreaseTime(5, "breakTime"));

pauseBtn.addEventListener("click", () => pauseTimer());
resetBtn.addEventListener("click", () => resetTimer());

startBtn.addEventListener("click", function() {
  startContainer.classList.add("hide-container", );
  countdownContainer.classList.remove("hide-container");
  // load sound and play silently when start button is pressed, this is necessary to work on mobile ios/safari
  soundEffect.src = '';
  soundEffect.play();
  toggleVisibleButtons();
  startTimer();
})


function toggleVisibleButtons() {
  startBtn.classList.toggle("hide-container");
  countdownBtns.classList.toggle("hide-container");
}


function increaseTime(mins, btnId) {
  let btn = document.getElementById(btnId);
  let btnNum = Number(btn.textContent);
  if (btnNum < mins) {
    btn.textContent = (btnNum + 5);
  }
}

function decreaseTime(mins, btnId) {
  let btn = document.getElementById(btnId);
  let btnNum = Number(btn.textContent);
  if (btnNum === 10) {
    btn.textContent = "05";
  } else if (btnNum > mins) {
    btn.textContent = (btnNum - 5);
  }
}


function startTimer() {
  countdownSec.textContent = "00";

  if (currentInterval === "study") {
    title.textContent = "study";
    countdownMins.textContent = Number(studyTime.textContent);
    currentTimeLeftInSeconds = Number(studyTime.textContent) * 60;
  } else {
    title.textContent = "break";
    countdownMins.textContent = Number(breakTime.textContent);
    currentTimeLeftInSeconds = Number(breakTime.textContent) * 60;
  }

  runTimer = setInterval(runTimerFn, 1000);
}


function breakTimer() {
  let newTitle = "start"
  countdownSec.textContent = "00";
  // load the sound with the mp3 added
  soundEffect.src = "alarm.mp3";
  soundEffect.play();
  toggleVisibleButtons();

  if (currentInterval === "study") {
    countdownMins.textContent = Number(breakTime.textContent);
    currentTimeLeftInSeconds = Number(breakTime.textContent) * 60;
    title.textContent = newTitle + "  break";
    currentInterval = "break";
    } else {
    countdownMins.textContent = Number(studyTime.textContent);
    currentTimeLeftInSeconds = Number(studyTime.textContent) * 60;
    title.textContent = newTitle + " studying";
    currentInterval = "study";
  } 

}


function runTimerFn() {
  currentTimeLeftInSeconds--;

  if (currentTimeLeftInSeconds > 1) {
    countdownMins.textContent = checkIfLessThan10(Math.floor(currentTimeLeftInSeconds/60));
    countdownSec.textContent = checkIfLessThan10(currentTimeLeftInSeconds%60);
  } else {
    countdownMins.textContent = 00;
    countdownSec.textContent = 00;
    clearInterval(runTimer);
    breakTimer();
    console.log("interval cleared");
  }

  // change format to 2 digits, ex. 09:05 instead of 9:5
  function checkIfLessThan10(num) {
    if (num < 10) {
      return "0" + num
    } else {
      return num
    }
  }
}


function resetTimer() {
  // make sure timer is cleared
  clearInterval(runTimer);
  toggleVisibleButtons();
  startContainer.classList.remove("hide-container", );
  countdownContainer.classList.add("hide-container");

  title.textContent = "pomodoro timer";
  studyTime.textContent = "25";
  breakTime.textContent = "05";
  countdownMins.textContent = "00";
  countdownSec.textContent = "00";
  currentInterval = "study";
}

function pauseTimer() {
  if (pause === true) {
    runTimer = setInterval(runTimerFn, 1000);
    pauseBtn.textContent = "pause";
    pause = false;
  } else {
    clearInterval(runTimer);
    pauseBtn.textContent = "start";
    pause = true;
  }
  
}











