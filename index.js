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
let currentInterval = "studyTime"; 
// track whether timer is paused or not
let pause = false;


// add event listeners to buttons when adjusting study and break time
addStudyTime.addEventListener("click", () => changeTime(45, "studyTime"));
subtractStudyTime.addEventListener("click", () => changeTime(15, "studyTime"));
addBreakTime.addEventListener("click", () => changeTime(30, "breakTime"));
subtractBreakTime.addEventListener("click", () => changeTime(5, "breakTime"));

// add event listener to start button
startBtn.addEventListener("click", function() {
   // replace start button with pause and reset button
   // replace content with 1 single timer
   startBtn.classList.add("hide-container");
   startContainer.classList.add("hide-container");
   countdownBtns.classList.remove("hide-container");
   countdownContainer.classList.remove("hide-container");
  startTimer();
})

// add event listener to pause button
pauseBtn.addEventListener("click", () => pauseTimer());
// add event listener to reset button
resetBtn.addEventListener("click", () => resetTimer());


function changeTime(mins, btnId) {
  let btn = document.getElementById(btnId);
  let btnStr = document.getElementById(btnId).textContent;
  let btnNum = Number(btnStr.slice(0,2));
  if (btnNum !== mins) {
    switch (mins) {
      case 45:
        btn.textContent = (btnNum + 5);
        break;
      case 30:
        btn.textContent = (btnNum + 5);
        break;
      case 15:
        btn.textContent = (btnNum - 5);
        break;
      case 5:
        if (btnNum === 10) {
          btn.textContent = "05";
        } else {
          btn.textContent = (btnNum - 5);
        }
        break;
      default:
        console.log({ 
          msg: "Oh no! This should not have happened",
          data: mins, btnId
        })
        break;
    }
  }
}


function startTimer() {
  // replace title
  if (currentInterval === "studyTime") {
    title.textContent = "work";
    // set the timer
    countdownMins.textContent = Number(studyTime.textContent);
    countdownSec.textContent = "00";
  } else if (currentInterval === "breakTime") {
    title.textContent = "break";
    countdownMins.textContent = Number(breakTime.textContent);
    countdownSec.textContent = "00";
  } else {
    console.log("Oops! Something went wrong.")
  }

  runTimer = setInterval(runTimerFn, 1000);
}


function breakTimer() {
  countdownBtns.classList.add("hide-container");
  startBtn.classList.remove("hide-container");


  if (currentInterval === "studyTime") {
    title.textContent = "start break";
    countdownMins.textContent = Number(breakTime.textContent);
    countdownSec.textContent = "00";
    currentInterval = "breakTime";
  } else if (currentInterval === "breakTime") {
    title.textContent = "start work";
    countdownMins.textContent = Number(breakTime.textContent);
    countdownSec.textContent = "00";
    currentInterval = "studyTime";
  } else {
    console.log("Oops! Something went wrong.")
  }

}


// todo: make sure i check for when minutes are less than 10, i have to add a "0" before the number
// todo: make sure timer works when it reaches 00:00
function runTimerFn() {
  let maxSeconds = 59;
  let minSeconds = 00;

    if (countdownMins.textContent === "13") {
      clearInterval(runTimer);
      breakTimer();
      console.log("interval cleared");
    } else {
      if (countdownSec.textContent === "00") {
        countdownMins.textContent = Number(countdownMins.textContent) - 1;
        return countdownSec.textContent = maxSeconds;
      } else if (Number(countdownSec.textContent) <= 10) {
        return countdownSec.textContent = "0" + (Number(countdownSec.textContent) - 1);
      } else if (Number(countdownSec.textContent) === 1) {
        return countdownSec.textContent = minSeconds;
      } else {
        return countdownSec.textContent = Number(countdownSec.textContent) - 1;
      }
    }  

}


function resetTimer() {
  // make sure timer is cleared
  clearInterval(runTimer);

  // hide pause button and reset button
  // hide #countdown-timer h2
  // show start-container
  // show start button
  startBtn.classList.remove("hide-container");
  startContainer.classList.remove("hide-container");
  countdownBtns.classList.add("hide-container");
  countdownContainer.classList.add("hide-container");

  // change title back to pomodoro timer
  title.textContent = "pomodoro timer";

  // change studyTime back to 25
  studyTime.textContent = "25";

  // change breakTime back to 05
  breakTime.textContent = "05";

  // change countdown mins and sec to 00
  countdownMins.textContent = "00";
  countdownSec.textContent = "00";

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










