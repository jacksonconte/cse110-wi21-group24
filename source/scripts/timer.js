let timerStarted = false;
let timerSeconds, intervalID, button, readout, circle;
const DURATION = 60; // seconds for timer

function startTimer() {
  intervalID = setInterval(tick, 1000);
  circle.style["animation-duration"] = DURATION + "s";
  circle.style["animation-play-state"] = "running";

  button.innerHTML = "STOP";
  timerStarted = true;
  //TODO: make sidebar disapear
}

// stops and resets timer
function stopTimer() {
  timerStarted = false;
  clearInterval(intervalID);
  resetAnimation();

  button.innerHTML = "START";
  timerSeconds = DURATION;
  readout.innerHTML = convertToPrettyTime(timerSeconds);
  // TODO: make sidebar reappear
  let temp = document.getElementById("circle_svg");
  document.getElementById("circle_svg").remove();
  document.getElementById("countdown").appendChild(temp);
}

// reflows animation
function resetAnimation() {
  circle.style.animation = "none";
  circle.offsetHeight; // trigger reflow
  circle.style.animation = null;
}

// decrements time each second
function tick() {
  timerSeconds--;
  readout.innerHTML = convertToPrettyTime(timerSeconds);
  if (timerSeconds == 0) stopTimer();
}

// converts seconds to mm:ss
function convertToPrettyTime(seconds) {
  minutes = Math.floor(seconds / 60);
  return (
    (minutes < 10 ? "0" : "") +
    minutes.toString() +
    ":" +
    (seconds % 60 < 10 ? "0" : "") +
    (seconds % 60).toString()
  );
}

// sets element vars and defines button onclick
window.addEventListener("DOMContentLoaded", () => {
  button = document.getElementById("toggle");
  readout = document.getElementById("countdown-number");
  circle = document.querySelector("circle");

  readout.innerHTML = convertToPrettyTime(DURATION);

  button.onclick = () => {
    if (timerStarted) {
      stopTimer();
    } else {
      startTimer();
    }
    timerSeconds = DURATION;
  };
});
