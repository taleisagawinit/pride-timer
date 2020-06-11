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


addStudyTime.addEventListener("click", () => increaseTime(45, "studyTime"));
subtractStudyTime.addEventListener("click", () => decreaseTime(5, "studyTime"));
addBreakTime.addEventListener("click", () => increaseTime(30, "breakTime"));
subtractBreakTime.addEventListener("click", () => decreaseTime(5, "breakTime"));

pauseBtn.addEventListener("click", () => pauseTimer());
resetBtn.addEventListener("click", () => resetTimer());

startBtn.addEventListener("click", function() {
  startContainer.classList.add("hide-container", );
  countdownContainer.classList.remove("hide-container");
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
    countdownMins.textContent = Number(studyTime.textContent)
  } else {
    title.textContent = "break";
    countdownMins.textContent = Number(breakTime.textContent);
  }

  runTimer = setInterval(runTimerFn, 1000);
}


function breakTimer() {
  toggleVisibleButtons();
  soundEffect.src = "alarm.mp3";
  soundEffect.play();
  let newTitle = "start"
  countdownSec.textContent = "00";

  if (currentInterval === "study") {
    countdownMins.textContent = Number(breakTime.textContent);
    title.textContent = newTitle + "  break";
    currentInterval = "break";
    } else {
    countdownMins.textContent = Number(studyTime.textContent);
    title.textContent = newTitle + " studying";
    currentInterval = "study";
  } 

}


function runTimerFn() {
// if the timer is at 00:00, clear the interval and set it up for the next one
  if (countdownMins.textContent === "00" && countdownSec.textContent === "00") {
    clearInterval(runTimer);
    breakTimer();
    console.log("interval cleared");
  } else {
    let numMin = Number(countdownMins.textContent);
    let numSec = Number(countdownSec.textContent)
  
  if (numSec < 1) {
    countdownMins.textContent = updateMinutes(numMin);
    countdownSec.textContent = updateSeconds(numSec);
  } else {
    countdownSec.textContent = updateSeconds(numSec);
    }
  }

  function updateMinutes(num) {
    // check mins
    let mins = num;
    if (mins <= 10) {
      return "0" + (mins-1);
    } else if (mins === 1) {
      return "00"
    } else {
      return mins - 1;
    }
  }

  function updateSeconds(num) {
    // check secs
    let secs = num;
    if (secs <= 10 && secs > 1) {
      return "0" + (secs-1);
    } else if (secs === 1) {
      return "00"
    } else if (secs < 1) {
      return "59"
    } else {
      return secs - 1;
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











