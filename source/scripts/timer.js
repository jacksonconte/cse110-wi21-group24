let timerStarted = false;
let timerSeconds, intervalID, button, readout, circle;
const DURATION = 5; // seconds for timer

function startTimer() {
  intervalID = setInterval(tick, 1000);
  let circle = document.getElementsByTagName("circle")[0];
  circle.style["animation-duration"] = DURATION + "s";
  circle.style["animation-play-state"] = "running";

  button.innerHTML = "STOP";
  timerStarted = true;
  //TODO: make sidebar disapear
}

function resumeTimer() {
  if (timerSeconds < DURATION) {
    let newCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    document.getElementsByClassName("animate")[0].remove(); //removes old circle

    //draws the new circle
    newCircle.setAttribute('class', 'animate');
    newCircle.setAttribute('cx', '50%');
    newCircle.setAttribute('cy', '50%');
    newCircle.setAttribute('r', '100');

    //below sets the css variable circleBarOffset to the correct values
    newCircle.style.animationDuration = (timerSeconds) + "s";
    newCircle.style.animationPlayState = "running";
    newCircle.style.setProperty("--circleBarOffset", (628/DURATION) * (DURATION - timerSeconds) + "px");
    
    //sets the new circle to be running and the circle bar at correct position
    document.getElementById("circle_svg").appendChild(newCircle);
  }
}

// stops and resets timer
function stopTimer() {
  timerStarted = false;
  clearInterval(intervalID);
  resetAnimation();

  button.innerHTML = "START";
  timerSeconds = DURATION;
  readout.innerHTML = convertToPrettyTime(timerSeconds);

  //forces a rerender of the svg 
  let temp = document.getElementById("circle_svg");
  document.getElementById("circle_svg").remove();
  document.getElementById("countdown").appendChild(temp);

  //removes circle bar offsets so we dont have any half circles rendering
  let circle = document.getElementsByTagName("circle")[0];
  circle.setAttribute('style', "");
  circle.style.setProperty("--circleBarOffset", "0px");
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
