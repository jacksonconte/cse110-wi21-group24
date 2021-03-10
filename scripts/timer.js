let timerStarted = false;
let timerSeconds, intervalID, button, readout, circle, duration;
let pomoIndex = 0;
let currTaskPomos = 0;
let currTaskDistractions;
let currTaskProgress;
let currTaskTime;
let currTaskID = -1;

/**
 * @description Loads task into timer based on taskID
 * @param {Number} taskID 
 */
function setCurrTask(taskID){
  currTaskID = taskID;
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  currTaskPomos = tasks[currTaskID][2];
  currTaskDistractions = tasks[currTaskID][3];
  currTaskProgress = tasks[currTaskID][4];
  currTaskTime = tasks[currTaskID][5];
}

/**
 * @function endTask
 * @description Finishes a task and removes it from the task list.
 */
function endTask(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[currTaskID][2] = currTaskPomos;
  tasks[currTaskID][3] = currTaskDistractions;
  tasks[currTaskID][4] = currTaskProgress;
  tasks[currTaskID][5] = currTaskTime;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  finishDict[currTaskID] = tasks[currTaskID] 
  delete dict[currTaskID]
  window.localStorage.setItem('tasks', JSON.stringify(dict))
  window.localStorage.setItem('finished-tasks', JSON.stringify(finishDict))
  currTaskID = -1;
  var taskDiv = document.getElementById('task-list-id')
  taskDiv.innerHTML = '';
  var finishedTaskDiv = document.getElementById('completed-tasks')
  finishedTaskDiv.innerHTML = '';
  var currentDiv = document.getElementById('curr-task')
  currentDiv.innerHTML = '';
  document.getElementById('end-task').style.display = 'none';
  console.log(finishDict)
  loadTasks();
}
/**
 * @function startTimer
 * @description starts timer and animation
 */
function startTimer() {
  document.getElementById('end-task').style.display = 'none';
  if(currTaskID != -1){
    switch(pomoIndex){
      case 0:
      case 2:
      case 4:
      case 6:
        document.getElementById("log-distraction").style.display = "initial";
    }
  }
  intervalID = setInterval(tick, 1000);
  let circle = document.getElementsByTagName("circle")[0];
  circle.style["animation-duration"] = duration + "s";
  circle.style["animation-play-state"] = "running";

  button.innerHTML = "STOP";
  timerStarted = true;
  if(pomoIndex % 2 == 0){
    //document.getElementById('openButton').style.color = document.body.style.backgroundColor;
    //document.getElementById('openButton').onclick = '';
    //document.getElementById('openButton').style.cursor = 'default';
    document.getElementById('openButton').style.visibility = "hidden";
    closeNav()
  }

  // Play the chirp sound, since the timer just started
  document.getElementById('chirp-sound').play()
}

/**
 * @function resumeTimer
 * @description resumes timer and animation
 */
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

/**
 * @function stopTimer
 * @description stops timer and resets animation
 */
function stopTimer(forced) {
  document.getElementById("log-distraction").style.display = "none";
  if(forced && currTaskID != -1){
    switch(pomoIndex) {
      case 0:
      case 2:
      case 4:
      case 6:
        currTaskProgress.push(["wc", duration - timerSeconds]);
        break;
      case 1:
      case 3:
      case 5:
        currTaskProgress.push(["sbc", duration - timerSeconds]);
        break;
      case 7:
        currTaskProgress.push(["lbc", duration - timerSeconds]);
    }
  }
  if(currTaskID != -1){
    switch(pomoIndex) {
      case 1:
      case 3:
      case 5:
        document.getElementById('end-task').style.display = 'initial';
    }
  }
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

  //document.getElementById('openButton').style.color = 'black';
  //document.getElementById('openButton').onclick = openNav;
  //document.getElementById('openButton').style.cursor = 'pointer';
  document.getElementById('openButton').style.visibility = "";
  circle.style.animationPlayState = "paused";
}

/**
 * @function resetAnimation
 * @description triggers animation reflow
 */
function resetAnimation() {
  circle.style.animation = "none";
  circle.offsetHeight; // trigger reflow
  circle.style.animation = null;
}

/**
 * @method tick
 * @description updates timer each second
 */
function tick() {
  timerSeconds--;
  if (currTaskID != -1) {
    currTaskTime++;
  }
  readout.innerHTML = convertToPrettyTime(timerSeconds);
  if (timerSeconds == 0){
    incrementPomo();
    stopTimer(false);

    // Play alert sound because the timer just ended
    document.getElementById('alert-sound').play()
  }
}

/**
 * @function incrementPomo
 * @description updates number of pomos at end of pomo
 */
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
      if(currTaskID != -1){
        currTaskProgress.push(["lb", duration]);
      }
      setTime(localStorage.getItem('workPomoTime'));
      document.getElementById('pomo-status').innerHTML = 'Work Pomo';
      break;
    case 2:
    case 4:
    case 6:
      if(currTaskID != -1){
        currTaskProgress.push(["sb", duration]);
      }
      setTime(localStorage.getItem('workPomoTime'));
      document.getElementById('pomo-status').innerHTML = 'Work Pomo';
      break;
    case 1:
    case 3:
    case 5:
      if(currTaskID != -1){
        currTaskProgress.push(["w", duration]);
      }   
      setTime(localStorage.getItem('shortBreakTime'));
      document.getElementById('pomo-status').innerHTML = 'Short Break';
      break;
    case 7:
      if(currTaskID != -1){
        currTaskProgress.push(["w", duration]);
      } 
      setTime(localStorage.getItem('longBreakTime'));
      document.getElementById('pomo-status').innerHTML = 'Long Break';
      
  }
}

/**
 * @function convertToPrettyTime
 * @description converts seconds to MM:SS
 * @param {Number} seconds 
 * @return {String} formatted time
 */
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

/**
 * @function setTime 
 * @description updates timer readout on page
 * @param {number} minutes 
 */
function setTime(minutes) {
  duration = minutes * 60;
  readout.innerHTML = convertToPrettyTime(duration);
}

function logDistraction() {
  currTaskDistractions.push(currTaskTime);
}

// sets element vars and defines button onclick
window.addEventListener("DOMContentLoaded", () => {
  button = document.getElementById("toggle");
  readout = document.getElementById("countdown-number");
  circle = document.querySelector("circle");

  checkSettings()
  setTime(localStorage.getItem('workPomoTime'));

  button.onclick = () => {
    if (timerStarted) {
      stopTimer(true);
    } else {
      startTimer();
    }
    timerSeconds = duration;
  };
});