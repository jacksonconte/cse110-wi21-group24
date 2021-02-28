let timerStarted = false;
let timerSeconds, intervalID, button, readout, circle, duration;
let pomoIndex = 0;
let currTaskPomos = 0;



function startTimer() {
  document.getElementById('end-task').style.display = 'none';
  intervalID = setInterval(tick, 1000);
  let circle = document.getElementsByTagName("circle")[0];
  circle.style["animation-duration"] = duration + "s";
  circle.style["animation-play-state"] = "running";

  button.innerHTML = "STOP";
  timerStarted = true;
  if(pomoIndex % 2 == 0){
    document.getElementById('openButton').style.color = document.body.style.backgroundColor;
    document.getElementById('openButton').onclick = '';
  }
}

function resumeTimer() {
  if(!timerStarted){
    switch(pomoIndex) {
      case 0:
      case 2:
      case 4:
      case 6:
        setTime(localStorage.getItem('workPomoTime'));
        break;
      case 1:
      case 3:
      case 5:
        setTime(localStorage.getItem('shortBreakTime'));
        break;
      case 7:
        setTime(localStorage.getItem('longBreakTime'));
        
    }
  }
  
  if (timerSeconds < duration) {
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
    newCircle.style.setProperty("--circleBarOffset", (628/duration) * (duration - timerSeconds) + "px");
    
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
  timerSeconds = duration;
  readout.innerHTML = convertToPrettyTime(timerSeconds);

  //forces a rerender of the svg 
  let temp = document.getElementById("circle_svg");
  document.getElementById("circle_svg").remove();
  document.getElementById("countdown").appendChild(temp);

  //removes circle bar offsets so we dont have any half circles rendering
  let circle = document.getElementsByTagName("circle")[0];
  circle.style.setProperty("--circleBarOffset", "0px");

  document.getElementById('openButton').style.color = 'black';
  document.getElementById('openButton').onclick = openNav;
  circle.style.animationPlayState = "paused";
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
  if (timerSeconds == 0){
    incrementPomo();
    stopTimer();
  }
}

//increments pomo count
function incrementPomo(){
  if(pomoIndex == 7){
    pomoIndex = 0;
  } else{
    pomoIndex++;
  }
  if(pomoIndex % 2 == 1){
    currTaskPomos++;
  }
  switch(pomoIndex) {
    case 0:
    case 2:
    case 4:
    case 6:
      setTime(localStorage.getItem('workPomoTime'));
      break;
    case 1:
    case 3:
    case 5:
      setTime(localStorage.getItem('shortBreakTime'));
      document.getElementById('end-task').style.display = 'initial';
      break;
    case 7:
      setTime(localStorage.getItem('longBreakTime'));
      document.getElementById('end-task').style.display = 'initial';
      
  }
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

function setTime(minutes) {
  duration = minutes * 60;
  readout.innerHTML = convertToPrettyTime(duration);
}

// sets element vars and defines button onclick
window.addEventListener("DOMContentLoaded", () => {
  button = document.getElementById("toggle");
  readout = document.getElementById("countdown-number");
  circle = document.querySelector("circle");

  setTime(localStorage.getItem('workPomoTime'));

  button.onclick = () => {
    if (timerStarted) {
      stopTimer();
    } else {
      startTimer();
    }
    timerSeconds = duration;
  };

});
