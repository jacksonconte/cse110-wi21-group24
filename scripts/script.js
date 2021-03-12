// SIDEBAR
/**
 * @description Pulls out sidebar, moves menu button left, sets menu button to close sidebar
 */
 function openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("openButton").style.cursor = "cursor";
    document.getElementById("openButton").style.marginLeft = "260px";
    document.getElementById("openButton").onclick = closeNav;
}

/**
 * @description Hides sidebar, moves menu button right, sets menu button to open sidebar
 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("openButton").style.marginLeft = "5px";
  document.getElementById("openButton").onclick = openNav;
}

/**
 * @description Displays timer content, updates menu buttons
 */
function openTimer() {
  resumeTimer();
  /* display appropriate content */
  document.getElementById("tasks").style.display = "none";
  document.getElementById("analytics").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("timer").style.display = "block";

  /* update buttons */
  document.getElementById("timerbtn").onclick = closeNav;
  document.getElementById("tasksbtn").onclick = openTasks;
  document.getElementById("analyticsbtn").onclick = openAnalytics;
  document.getElementById("settingsbtn").onclick = openSettings;

  closeNav();
}

/**
 * @description Displays tasks content, updates menu buttons
 */
function openTasks() {
  document.getElementById("timer").style.display = "none";
  document.getElementById("analytics").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("tasks").style.display = "block";

  document.getElementById("timerbtn").onclick = openTimer;
  document.getElementById("tasksbtn").onclick = closeNav;
  document.getElementById("analyticsbtn").onclick = openAnalytics;
  document.getElementById("settingsbtn").onclick = openSettings;

  closeNav();
}

/**
 * @description Displays analytics content, updates menu buttons
 */
function openAnalytics() {
  loadAnalytics();

  document.getElementById("timer").style.display = "none";
  document.getElementById("tasks").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("analytics").style.display = "block";

  document.getElementById("timerbtn").onclick = openTimer;
  document.getElementById("tasksbtn").onclick = openTasks;
  document.getElementById("analyticsbtn").onclick = closeNav;
  document.getElementById("settingsbtn").onclick = openSettings;

  closeNav();
}

/**
 * @description Displays settings content, updates menu buttons
 */
function openSettings() {
  document.getElementById("timer").style.display = "none";
  document.getElementById("tasks").style.display = "none";
  document.getElementById("analytics").style.display = "none";
  document.getElementById("settings").style.display = "block";

  document.getElementById("timerbtn").onclick = openTimer;
  document.getElementById("tasksbtn").onclick = openTasks;
  document.getElementById("analyticsbtn").onclick = openAnalytics;
  document.getElementById("settingsbtn").onclick = closeNav;

  closeNav();
}


// TIMER
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

  localStorage.setItem('curr-task-id', currTaskID);

  currTaskPomos = tasks[currTaskID][2];
  currTaskDistractions = tasks[currTaskID][3];
  currTaskProgress  = tasks[currTaskID][4];
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
  finishDict[currTaskID] = tasks[currTaskID]; 
  delete dict[currTaskID];
  window.localStorage.setItem('tasks', JSON.stringify(dict));
  window.localStorage.setItem('finished-tasks', JSON.stringify(finishDict));
  currTaskID = -1;
  let taskDiv = document.getElementById('task-list-id');
  taskDiv.innerHTML = '';
  let finishedTaskDiv = document.getElementById('completed-tasks');
  finishedTaskDiv.innerHTML = '';
  let currentDiv = document.getElementById('curr-task');
  currentDiv.innerHTML = '';
  document.getElementById('end-task').style.display = 'none';
  console.log(finishDict);

  delete localStorage['curr-task'];
  delete localStorage['curr-task-id']
  pomoIndex = 0;

  //resetAnimation();
  setTime(localStorage.getItem('workPomoTime'));
  stopTimer(true);

  document.getElementById("toggle").disabled = true;
  document.getElementById("curr-task").innerHTML = "<h3> Start a new task! </h3>";
  loadTasks();
}

/**
 * @function startTimer
 * @description starts timer and animation
 */
function startTimer() {
  document.getElementById('end-task').style.display = 'none';
  if(currTaskID !== -1){
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

  let status = document.getElementById("pomo-status").innerText.toUpperCase();
  button.innerHTML = "STOP " + status;

  /*
  if (status == "WORK POMO") {
    document.getElementById("log-distraction").style.display = "initial";
  }
  */

  timerStarted = true;
  if(pomoIndex % 2 === 0){
    // document.getElementById('openButton').style.color = document.body.style.backgroundColor;
    // document.getElementById('openButton').onclick = '';
    // document.getElementById('openButton').style.cursor = 'default';
    document.getElementById('openButton').style.visibility = "hidden";
  }

  // Play the chirp sound, since the timer just started
  document.getElementById('chirp-sound').play();
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
    document.getElementsByClassName("animate")[0].remove(); // removes old circle

    // draws the new circle
    newCircle.setAttribute('class', 'animate');
    newCircle.setAttribute('cx', '50%');
    newCircle.setAttribute('cy', '50%');
    newCircle.setAttribute('r', '100');

    // below sets the css variable circleBarOffset to the correct values
    newCircle.style.animationDuration = (timerSeconds) + "s";
    newCircle.style.animationPlayState = "running";
    newCircle.style.setProperty("--circleBarOffset", (628/duration) * (duration - timerSeconds) + "px");
    
    // sets the new circle to be running and the circle bar at correct position
    document.getElementById("circle_svg").appendChild(newCircle);
  }
}

/**
 * @function stopTimer
 * @description stops timer and resets animation
 */
function stopTimer(forced) {
  document.getElementById("log-distraction").style.display = "none";
  if(forced && currTaskID !== -1){
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
  if(currTaskID !== -1){
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

  let status = document.getElementById("pomo-status").innerText.toUpperCase();
  button.innerHTML = "START " + status;

  /*
  if (status == "SHORT BREAK") {
    document.getElementById('end-task').style.display = 'initial';
  }
  */

  timerSeconds = duration;
  readout.innerHTML = convertToPrettyTime(timerSeconds);

  // forces a rerender of the svg 
  let temp = document.getElementById("circle_svg");
  document.getElementById("circle_svg").remove();
  document.getElementById("countdown").appendChild(temp);

  // removes circle bar offsets so we dont have any half circles rendering
  let circle = document.getElementsByTagName("circle")[0];
  circle.style.setProperty("--circleBarOffset", "0px");

  // document.getElementById('openButton').style.color = 'black';
  // document.getElementById('openButton').onclick = openNav;
  // document.getElementById('openButton').style.cursor = 'pointer';
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
  if (currTaskID !== -1) {
    currTaskTime++;
  }
  readout.innerHTML = convertToPrettyTime(timerSeconds);
  if (timerSeconds === 0){
    incrementPomo();
    stopTimer(false);

    // Play alert sound because the timer just ended
    document.getElementById('alert-sound').play();
  }
}

/**
 * @function incrementPomo
 * @description updates number of pomos at end of pomo
 */
function incrementPomo(){
  if(pomoIndex === 7){
    pomoIndex = 0;
  } else{
    pomoIndex++;
  }
  if(pomoIndex % 2 === 1){
    currTaskPomos++;
    document.getElement
  }
  switch(pomoIndex) {
    case 0:
      if(currTaskID !== -1){
        currTaskProgress.push(["lb", duration]);
      }
      setTime(localStorage.getItem('workPomoTime'));
      document.getElementById('pomo-status').innerHTML = 'Work Pomo';
      break;
    case 2:
    case 4:
    case 6:
      if(currTaskID !== -1){
        currTaskProgress.push(["sb", duration]);
      }
      setTime(localStorage.getItem('workPomoTime'));
      document.getElementById('pomo-status').innerHTML = 'Work Pomo';
      break;
    case 1:
    case 3:
    case 5:
      if(currTaskID !== -1){
        currTaskProgress.push(["w", duration]);
      }   
      setTime(localStorage.getItem('shortBreakTime'));
      document.getElementById('pomo-status').innerHTML = 'Short Break';
      break;
    case 7:
      if(currTaskID !== -1){
        currTaskProgress.push(["w", duration]);
      } 
      setTime(localStorage.getItem('longBreakTime'));
      document.getElementById('pomo-status').innerHTML = 'Long Break';
      break;
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

  setTime(localStorage.getItem('workPomoTime'));
  button.innerHTML = "START " + document.getElementById("pomo-status").innerText.toUpperCase();
  
  if (localStorage.getItem('curr-task')) {
    document.getElementById("curr-task").innerHTML = "<h3> " + localStorage.getItem("curr-task") + " </h3>";
  }
  else {
    document.getElementById("toggle").disabled = true;
  }

  if (localStorage.getItem('curr-task-id')) {
    currTaskID = localStorage.getItem('curr-task-id');
    setCurrTask(currTaskID);
  }

  button.onclick = () => {
    if (timerStarted) {
      stopTimer(true);
    } else {
      startTimer();
    }
    timerSeconds = duration;
  };
});

// TASKS
let dict = {};
let finishDict = {};
let ID = 0;
let first = true;
/**
 * @description gets the max key value in the dictionary
 * @param {dict} dict
 * @returns {Number} The largest key in the dictionary
 */
// function getMax(dict) {
//    var currentMax = -1
//    for (var key in dict) {
//        if (Number(key) > currentMax) {
//            currentMax = key
//        }
//    }
//    return Number(currentMax)
//}
/**
 * @description Sets the ID for the element to be added to the dict
 * @returns {String} Returns the ID in string form
 */
function setId() {
    let nextId = ID;
    ID++;
    /*
    if (Object.keys(dict).length > 0) {
        nextId = getMax(dict) + 1
      } else {
      nextId = 1
    }
    */
    return nextId.toString();
}
/**
 * @class TaskItem
 * @description A custom component that defines the task
 */
class TaskItem extends HTMLElement {
    /**
     * @constructor
     * @description Constructor of the TaskItem class
     */
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        let dv = document.createElement('div');
        dv.setAttribute('class', 'task');
        // setting ID based on biggest key in dict
        dv.setAttribute('id', setId());
        // creation of the custom componenets elements
        let taskName = document.createElement('div');
        taskName.setAttribute('class', 'task-name');

        let estPomos = document.createElement('div');
        estPomos.setAttribute('class', 'task-est-pomos');

        let actualPomos = document.createElement('div');
        actualPomos.setAttribute('class', 'task-act-pomos');
        actualPomos.textContent = '--';

        let buttonBox = document.createElement('div');

        let startButton = document.createElement('button');
        startButton.textContent = 'Start';
        startButton.addEventListener('click', startTask);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', removeTask);

        buttonBox.setAttribute('class', 'button-box');
        buttonBox.appendChild(startButton);
        buttonBox.appendChild(removeButton);
        
        /**
        * @method removeTask
        * @description removes task from dictionary and window
        */
       function removeTask() {
          if (localStorage.getItem("curr-task-id") == dv.id) {
            delete localStorage['curr-task'];

            setTime(localStorage.getItem('workPomoTime'));
            stopTimer(true);

            document.getElementById("toggle").disabled = true;
            document.getElementById("end-task").hidden = true;
            document.getElementById("curr-task").innerHTML = "<h3> Start a new task! </h3>";
            pomoIndex = 0;
          }

           if(dict[dv.id] != null){
               //console.log("no hi")
               delete dict[dv.id]
               localStorage.setItem('tasks', JSON.stringify(dict))
           } else {
               //console.log("hi")
               delete finishDict[dv.id]
               window.localStorage.setItem('finished-tasks', JSON.stringify(finishDict))             
           }
           // parentElement is buttonBox; parentElement.parentElement is the actual entry itself
           this.parentElement.parentElement.remove();
        }
        /**
        * @method clear
        * @description clears current task from list
        */
        function clear() {
            this.parentElement.remove();
        }

        function startTask() {
            resumeTimer();
            /* display appropriate content */
            document.getElementById("tasks").style.display = "none";
            document.getElementById("analytics").style.display = "none";
            document.getElementById("settings").style.display = "none";
            document.getElementById("timer").style.display = "block";

            /* update buttons */
            document.getElementById("timerbtn").onclick = closeNav;
            document.getElementById("tasksbtn").onclick = openTasks;
            document.getElementById("analyticsbtn").onclick = openAnalytics;
            document.getElementById("settingsbtn").onclick = openSettings;

            setTime(localStorage.getItem('workPomoTime'));
            stopTimer(true);
            setCurrTask(dv.id);
            
            pomoIndex = 0;
            document.getElementById("pomo-status").innerText = "Work Pomo";
            document.getElementById("end-task").hidden = true;
            document.getElementById("end-task").style.display = "none";
            document.getElementById('curr-task').innerHTML = "<h3>" + dict[dv.id][0] + " </h3>";
            document.getElementById('toggle').disabled = false;
            document.getElementById('toggle').innerText = "START WORK POMO";
            //rememmber current task so we can resume it when we refresh
            localStorage.setItem('curr-task', taskName.innerText);       
            closeNav();
        }
        this.shadowRoot.innerHTML = `
            <style>
                .task {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    filter: drop-shadow(0px 2px 5px rgb(0,0,0,0.4));
                    margin: 10px;
                    height: auto;
                    border: solid 1px white;   
                    border-radius: 5px;
                    padding: 20px;
                    color: white;
                    font-size: 1.1em;
                }

                .task:hover {
                    background-color: rgba(0,0,0,0.2);
                    transition: 0.3s ease-in;
                }

                .task-name {
                    word-break: break-word;
                    flex-basis: 50%;
                    text-align: justify;
                }
                .task-est-pomos, .task-act-pomos {
                    flex-basis: 10%;
                    text-align: center;
                }
                .button-box {
                    flex-basis: 30%;
                    text-align: center;
                }
                button {
                    background-color: transparent; 
                    border: 1px solid white;
                    color: white;
                    font-family: inherit;
                    padding: 10px 20px;
                    height: 100%;
                    text-align: center;
                    font-size: 18px;
                    border-radius: 10px;
                }
                
                button:hover {
                    background-color: rgba(0,0,0,0.3);
                    transition: 0.3s ease-in;
                    cursor: pointer;
                }

            </style>
        `;

        dv.appendChild(taskName);
        dv.appendChild(estPomos);
        dv.appendChild(actualPomos);
        dv.appendChild(buttonBox);
        this.shadowRoot.append(dv);
    }
}

customElements.define('task-item', TaskItem);

/**
* @method loadTasks
* @description loads in tasks from local storage into the task lists on the website
*/
function loadTasks(){
    taskListDiv = document.getElementById('task-list-id');
    while(taskListDiv.firstChild){
        taskListDiv.removeChild(taskListDiv.firstChild);
    }
    // repopulating task dict
    tempDict = JSON.parse(localStorage.getItem('tasks'));
    for (let key in tempDict) {
        dict[key] = tempDict[key];
        if(key === 'ID-count'){
            ID = Number(dict[key]);
            continue;
        }
        let item = document.createElement('task-item');
        let itemName = item.shadowRoot.querySelector('.task-name');
        let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos');
        let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos');
        item.shadowRoot.querySelector('.task').id = key;
        itemName.innerText = dict[key][0];
        itemEstPomos.innerText = dict[key][1];
        itemActPomos.innerText = dict[key][2];
        let container = document.querySelector('#task-list-id');
        container.append(item);       
    }
    // repopulating finished task list dict
    tempDict = JSON.parse(localStorage.getItem('finished-tasks'));
    for (var key in tempDict) {
        finishDict[key] = tempDict[key];
        if(key === 'ID-count'){
            ID = Number(dict[key]);
            continue;
        }
        let item = document.createElement('task-item')
        let itemName = item.shadowRoot.querySelector('.task-name')
        let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos')
        let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos')
        itemName.style.flexBasis = "60%";
        itemEstPomos.style.flexBasis = "20%";
        itemActPomos.style.flexBasis = "20%";
        let buttonBox = item.shadowRoot.querySelector('.button-box');
        buttonBox.style.display = "none";
        
        item.shadowRoot.querySelector('.task').id = key;
        itemName.innerText = finishDict[key][0];
        itemEstPomos.innerText = finishDict[key][1];
        itemActPomos.innerText = finishDict[key][2];
        let container = document.querySelector('#completed-tasks');
        // item.shadowRoot.startButton.disabled = true;
        // item.shadowRoot.removeButton.disabled = true;
        container.append(item); 
    }
}

window.onbeforeunload = function () {
    return "";
};

window.addEventListener('DOMContentLoaded', () => {
    // repopulating page if 'tasks' in local storage is not null
    if (!(window.localStorage.getItem('tasks') === null)) {
        loadTasks();
    }

    document.getElementById("analytics-checkbox").addEventListener('change', (event) => {
        let analyticsToggle = Number(document.getElementById("analytics-checkbox").checked);
        setAnalytics(analyticsToggle);
    });

    document.getElementById("dark-mode").addEventListener('change', (event) => {
        let darkModeToggle = Number(document.getElementById("dark-mode").checked);
        setDarkMode(darkModeToggle);
    });

    let submitButton = document.getElementById('add-task-button');
    submitButton.addEventListener('click', submitTask);
    /**
     * @method submitTask
     * @description Adds task to dictionary and window
     */
    function submitTask() {
        let item = document.createElement('task-item');
        let itemName = item.shadowRoot.querySelector('.task-name');
        let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos');
        let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos');
        let userTaskInput = document.getElementById('input-task-name');
        let userPomosInput = document.getElementById('input-pomos');
        let taskDiv = item.shadowRoot.querySelector('.task');
        itemName.innerText = userTaskInput.value;
        itemEstPomos.innerText = userPomosInput.value;
        itemActPomos.innerText = "--";
        let container = document.querySelector('.task-list');
        container.append(item);
        // [name, estPomo, actPomo, distractions, progress, time]
        dict[taskDiv.id] = [itemName.innerText, itemEstPomos.innerText, 0, [], [], 0];
        dict['ID-count'] = ID;
        window.localStorage.setItem('tasks', JSON.stringify(dict));
    }
})


// ANALYTICS
/**
 * @description Loads analytics page depending on whether any tasks have been completed
 */


 window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("comp-tasks-dropdown").selectedIndex = -1;
    document.getElementById("comp-tasks-dropdown").addEventListener("change", (event) => {
        displayAnalytics();
     });
 });

function loadAnalytics() {
    document.getElementById("comp-tasks-dropdown").innerHTML = "";
    document.getElementById("stat-display").innerHTML = "";

    let emptySelection = document.createElement("option");
    emptySelection.selected = true;
    emptySelection.disabled = true;
    emptySelection.innerText = "-- select an option --";

    document.getElementById("comp-tasks-dropdown").appendChild(emptySelection);
    let tasks = JSON.parse(localStorage.getItem('finished-tasks'));
    if(tasks && Object.keys(tasks) && Object.keys(tasks).length !== 0){
        let dropdown = document.getElementById("comp-tasks-dropdown");
        for(let i = 0; i < Object.keys(tasks).length; i++) {
            let selection = document.createElement("option");
            selection.setAttribute("value", Object.keys(tasks)[i]);
            selection.innerHTML=tasks[Object.keys(tasks)[i]][0];
            dropdown.appendChild(selection);
        }
        document.getElementById("no-tasks").style.display = "none";
        document.getElementById("task-select").style.display = "initial";

    }
}

/**
 * @description Displays analytics for selected task
 */
function displayAnalytics(){
    document.getElementById("stat-display").innerHTML = "";
    let taskID = document.getElementById("comp-tasks-dropdown").value;
    let tasks = JSON.parse(localStorage.getItem('finished-tasks'));
    let taskProgress = tasks[taskID][4];
    let distractions = tasks[taskID][3];
    let totalTime = tasks[taskID][5];
    let cancelledWorkPomos = 0;
    let board = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    board.setAttribute("width","1000");
    board.setAttribute("height","200");
    board.setAttribute("id","analytics-svg");
    let xtrack = 0;
    document.getElementById("stat-display").appendChild(board);
    for(let i = 0; i < taskProgress.length; i++){
        let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttribute("width",String(Math.round(1000*taskProgress[i][1]/totalTime)));
        rect.setAttribute("height","100");
        rect.setAttribute("x",String(xtrack));
        rect.setAttribute("y","20");
        xtrack+=Math.round(1000*taskProgress[i][1]/totalTime);


        let pomoType;
        switch(taskProgress[i][0]){
            case "w":
                pomoType="Work Pomo";
                rect.setAttribute("fill","rgba(0,0,127,0.6");
                break;
            case "sb":
                pomoType="Short Break";
                rect.setAttribute("fill","rgba(0,255,0,0.6)");
                break;
            case "lb":
                pomoType="Long Break";
                rect.setAttribute("fill","rgba(0,255,0,0.8)");
                break;
            case "wc":
                pomoType="Cancelled Work Pomo";
                rect.setAttribute("fill","rgba(0,0,0,0.5)");
                cancelledWorkPomos++;
                break;
            case "sbc":
                pomoType="Cancelled Short Break";
                rect.setAttribute("fill","rgba(0,0,0,0.5)");
                break;
            case "lbc":
                pomoType="Cancelled Long Break";
                rect.setAttribute("fill","grey");
                break;         
        }

        let labelText = "This was a " + pomoType + " that lasted " + Math.floor(taskProgress[i][1] / 60) + " minutes and " + (taskProgress[i][1] % 60) + " seconds.";
        rect.setAttribute("onmouseover","setLabel(\""+labelText+"\")");
        rect.setAttribute("onmouseout","setLabel(\"Hover to Display Info\")");

        board.appendChild(rect);
    }

    for(let i = 0; i < distractions.length; i++){
        let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttribute("width", 5);
        rect.setAttribute("height","110");
        rect.setAttribute("x", String(Math.round(1000*distractions[i]/totalTime)));
        rect.setAttribute("y", "15");
        rect.setAttribute("fill","rgba(255,0,0,0.8)");

        let labelText = "This was a distraction logged at " + Math.floor(distractions[i] / 60) + " minutes and " + (distractions[i] % 60) + " seconds in.";

        rect.setAttribute("onmouseover","setLabel(\""+labelText+"\")");
        rect.setAttribute("onmouseout","setLabel(\"Hover to Display Info\")");
        board.appendChild(rect);
    }

    let label = document.createElement("h2");
    label.setAttribute("id", "svg-label");
    label.innerHTML="Hover to Display Info";
    document.getElementById("stat-display").appendChild(label);

    let stats = document.createElement("div");
    stats.setAttribute("id", "stats");

    let statEstPomo = document.createElement("p");
    statEstPomo.innerHTML = "Estimated Pomos: " + tasks[taskID][1] + "<br>";
    stats.appendChild(statEstPomo);

    let statActPomo = document.createElement("p");
    statActPomo.innerHTML = "Completed Pomos: " + tasks[taskID][2];
    stats.appendChild(statActPomo);

    let statCancelledPomo = document.createElement("p");
    statCancelledPomo.innerHTML = "Cancelled Pomos: " + cancelledWorkPomos;
    stats.appendChild(statCancelledPomo);

    let statTotalTime = document.createElement("h3");
    statTotalTime.innerHTML = "Total Time: " + Math.floor(totalTime / 60) + " minutes and " + totalTime % 60 + " seconds.";
    stats.appendChild(statTotalTime);
    
    document.getElementById("stat-display").appendChild(stats);
}

/**
 * @description Sets text inside hover label
 * @param {String} text 
 */
function setLabel(text){
    document.getElementById("svg-label").innerHTML = text;
}

// SETTINGS

/**
 * @description Checks if settings exist in local storage. If not, creates defaults.
 */
 function checkSettings() {
    if (window.localStorage.getItem("workPomoTime") === null) {
      window.localStorage.setItem("workPomoTime", 25);
    }
    if (window.localStorage.getItem("shortBreakTime") === null) {
      window.localStorage.setItem("shortBreakTime", 5);
    }
    if (window.localStorage.getItem("longBreakTime") === null) {
      window.localStorage.setItem("longBreakTime", 15);
    }
    if (window.localStorage.getItem("analyticsToggle") === null) {
      window.localStorage.setItem("analyticsToggle", 1);
    }
    if (window.localStorage.getItem("darkModeToggle") === null) {
      window.localStorage.setItem("darkModeToggle", 0);
    }
  
    setSettings();
  }
  
  /**
   * @description Updates settings in local storage based on inputs on settings page
   */
  function submitSettings() {
    let workPomoTime = document.getElementById("work-pomo-time").value;
    let shortBreakTime = document.getElementById("short-break-time").value;
    let longBreakTime = document.getElementById("long-break-time").value;
  
    window.localStorage.setItem("workPomoTime", workPomoTime);
    window.localStorage.setItem("shortBreakTime", shortBreakTime);
    window.localStorage.setItem("longBreakTime", longBreakTime);
  
    alert("Settings updated");
    setSettings();
  }
  
  /**
   * @description Resets settings in local storage to defaults
   */
  function resetSettings() {
    window.localStorage.setItem("workPomoTime", 25);
    window.localStorage.setItem("shortBreakTime", 5);
    window.localStorage.setItem("longBreakTime", 15);
    window.localStorage.setItem("analyticsToggle", 1);
    window.localStorage.setItem("darkModeToggle", 0);
    alert("Settings reset to defaults");
    setSettings();
  }
  
  /**
   * @description Sets values on settings page based on local storage values
   */
  function setSettings() {
    let workPomoTime = window.localStorage.getItem("workPomoTime");
    let shortBreakTime = window.localStorage.getItem("shortBreakTime");
    let longBreakTime = window.localStorage.getItem("longBreakTime");
    let analyticsToggle = window.localStorage.getItem("analyticsToggle");
    let darkModeToggle = window.localStorage.getItem("darkModeToggle");
  
    document.getElementById("work-pomo-time").value = workPomoTime;
    document.getElementById("short-break-time").value = shortBreakTime;
    document.getElementById("long-break-time").value = longBreakTime;
  
    setDarkMode(darkModeToggle);
    setAnalytics(analyticsToggle);
    
  }
  
  function setDarkMode(enabled) {
    if (Number(enabled)) {
      document.getElementById("dark-mode").checked = true;
      document.getElementsByTagName("body")[0].style = "background: linear-gradient(90deg, #333, #444, #555, #888); background-size: 150% 800%;";
      document.getElementById("openButton").style = "color: white";
      document.getElementById("timerbtn").style = "border: 3px solid white; color: white;";
      document.getElementById("tasksbtn").style = "border: 3px solid white; color: white;";
  
      document.getElementById("analyticsbtn").style.border = "3px solid white";
      document.getElementById("analyticsbtn").style.color = "white";
  
      document.getElementById("settingsbtn").style = "border: 3px solid white; color: white;";
      document.getElementById("mySidebar").style = "background-color: rgba(0,0,0,0.1);";
    }
    else {
      document.getElementById("dark-mode").checked = false;
      document.getElementsByTagName("body")[0].style = "";
      document.getElementById("openButton").style = "";
  
      document.getElementById("timerbtn").style = "";
      document.getElementById("tasksbtn").style = "";
  
      document.getElementById("analyticsbtn").style.borderColor = "black";
      document.getElementById("analyticsbtn").style.color = "black";
  
      document.getElementById("settingsbtn").style = "";
      document.getElementById("mySidebar").style = "";
    }
    window.localStorage.setItem("darkModeToggle", enabled);
  }
  
  function setAnalytics(enabled) {
    if (Number(enabled)) {
      console.log("re");
      document.getElementById("analytics-checkbox").checked = true;
      document.getElementById("analyticsbtn").style.display = "inherit";
  
    } else {
      console.log("mo");
      document.getElementById("analytics-checkbox").checked = false;
      document.getElementById("analyticsbtn").style.display = "none";
    
    }
    window.localStorage.setItem("analyticsToggle", enabled);
  }
  
// module.exports = { openNav, closeNav, openTimer, openTasks, openAnalytics, openSettings, setCurrTask, endTask, startTimer, resumeTimer, stopTimer, resetAnimation, tick, incrementPomo, convertToPrettyTime, setTime, logDistraction, setId, loadTasks, loadAnalytics, displayAnalytics, setLabel, checkSettings, submitSettings, resetSettings, setSettings, setDarkMode, setAnalytics };