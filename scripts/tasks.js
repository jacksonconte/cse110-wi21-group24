// TASKS
let dict = {};
let finishDict = {};
let ID = 0;
let first = true;

/**
 * @method setId
 * @description Sets the ID for the element to be added to the dict
 * @returns {String} Returns the ID in string form
 */
function setId() {
  let nextId = ID;
  ID++;
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
    let currentID = setId();
    dv.setAttribute('id', currentID);
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
    startButton.setAttribute('id', 'start' + currentID);
    startButton.textContent = 'Start';
    startButton.addEventListener('click', startTask);

    let removeButton = document.createElement('button');
    removeButton.setAttribute('id', 'remove' + currentID);
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
      if (localStorage.getItem('curr-task-id') === dv.id) {
        delete localStorage['curr-task'];
        delete localStorage['curr-task-id'];

        setTime(localStorage.getItem('workPomoTime'));
        stopTimer(true);

        document.getElementById('toggle').disabled = true;
        document.getElementById('end-task').hidden = true;
        document.getElementById('curr-task').innerHTML =
          '<h3> Start a new task! </h3>';
        pomoIndex = 0;
      }

      if (dict[dv.id] != null) {
        delete dict[dv.id];
        localStorage.setItem('tasks', JSON.stringify(dict));
      } else {
        delete finishDict[dv.id];
        window.localStorage.setItem(
          'finished-tasks',
          JSON.stringify(finishDict)
        );
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

    /**
     * @method startTask
     * @description Starts the timer from the current task
     */
    function startTask() {
      resumeTimer();
      // display appropriate content
      document.getElementById('tasks').style.display = 'none';
      document.getElementById('analytics').style.display = 'none';
      document.getElementById('settings').style.display = 'none';
      document.getElementById('timer').style.display = 'block';

      // update buttons
      document.getElementById('timerbtn').onclick = closeNav;
      document.getElementById('tasksbtn').onclick = openTasks;
      document.getElementById('analyticsbtn').onclick = openAnalytics;
      document.getElementById('settingsbtn').onclick = openSettings;

      setTime(localStorage.getItem('workPomoTime'));
      stopTimer(true);
      setCurrTask(dv.id);

      pomoIndex = 0;
      document.getElementById('pomo-status').innerText = 'Work Pomo';
      document.getElementById('end-task').hidden = true;
      document.getElementById('end-task').style.display = 'none';
      document.getElementById('curr-task').innerHTML =
        '<h3>' + dict[dv.id][0] + ' </h3>';
      document.getElementById('toggle').disabled = false;
      document.getElementById('toggle').innerText = 'START WORK POMO';
      // remember current task so we can resume it when we refresh
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
function loadTasks() {
  taskListDiv = document.getElementById('task-list-id');
  while (taskListDiv.firstChild) {
    taskListDiv.removeChild(taskListDiv.firstChild);
  }
  // repopulating task dict
  tempDict = JSON.parse(localStorage.getItem('tasks'));
  for (let key in tempDict) {
    dict[key] = tempDict[key];
    if (key === 'ID-count') {
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
  for (let key in tempDict) {
    finishDict[key] = tempDict[key];
    if (key === 'ID-count') {
      ID = Number(dict[key]);
      continue;
    }
    let item = document.createElement('task-item');
    let itemName = item.shadowRoot.querySelector('.task-name');
    let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos');
    let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos');
    itemName.style.flexBasis = '60%';
    itemEstPomos.style.flexBasis = '20%';
    itemActPomos.style.flexBasis = '20%';
    let buttonBox = item.shadowRoot.querySelector('.button-box');
    buttonBox.style.display = 'none';

    item.shadowRoot.querySelector('.task').id = key;
    itemName.innerText = finishDict[key][0];
    itemEstPomos.innerText = finishDict[key][1];
    itemActPomos.innerText = finishDict[key][2];
    let container = document.querySelector('#completed-tasks');
    container.append(item);
  }
}

/**
 * @event
 * @description Returns an empty string before the browser unloads its data
 * @returns {String} An empty string
 */
window.onbeforeunload = function () {
  return '';
};

/**
 * @event
 * @description Sets the tasks, analytics, and dark mode
 */
window.addEventListener('DOMContentLoaded', () => {
  // repopulating page if 'tasks' in local storage is not null
  if (!(window.localStorage.getItem('tasks') === null)) {
    loadTasks();
  }

  /**
   * @event
   * @description Sets the analytics page
   */
  document
    .getElementById('analytics-checkbox')
    .addEventListener('change', (event) => {
      let analyticsToggle = Number(
        document.getElementById('analytics-checkbox').checked
      );
      setAnalytics(analyticsToggle);
    });

  /**
   * @event
   * @description Sets dark mode
   */
  document.getElementById('dark-mode').addEventListener('change', (event) => {
    let darkModeToggle = Number(document.getElementById('dark-mode').checked);
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
    itemActPomos.innerText = '--';
    let container = document.querySelector('.task-list');
    container.append(item);
    // [name, estPomo, actPomo, distractions, progress, time]
    dict[taskDiv.id] = [
      itemName.innerText,
      itemEstPomos.innerText,
      0,
      [],
      [],
      0,
    ];
    dict['ID-count'] = ID;
    window.localStorage.setItem('tasks', JSON.stringify(dict));
  }
});
