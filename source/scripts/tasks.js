var dict = {}
var finishDict = {}
var ID = 0
/**
 * @description gets the max key value in the dictionary
 * @param {dict} dict
 * @returns {Number} The largest key in the dictionary
 */
//function getMax(dict) {
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
    let nextId = ID
    ID++
    /*
    if (Object.keys(dict).length > 0) {
        nextId = getMax(dict) + 1
      } else {
      nextId = 1
    }
    */
    return nextId.toString()
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
        super()
        this.attachShadow({
            mode: 'open',
        })
        var dv = document.createElement('div')
        dv.setAttribute('class', 'task')
        //setting ID based on biggest key in dict
        dv.setAttribute('id', setId())
        //creation of the custom componenets elements
        var taskName = document.createElement('div')
        taskName.setAttribute('class', 'task-name')

        var estPomos = document.createElement('div')
        estPomos.setAttribute('class', 'task-est-pomos')

        var actualPomos = document.createElement('div')
        actualPomos.setAttribute('class', 'task-act-pomos')
        actualPomos.textContent = '--'

        var buttonBox = document.createElement('div')

        var startButton = document.createElement('button')
        startButton.textContent = 'Start'
        startButton.addEventListener('click', startTask)

        var removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.addEventListener('click', removeTask)

        buttonBox.setAttribute('class', 'button-box');
        buttonBox.appendChild(startButton);
        buttonBox.appendChild(removeButton);
        /**
        * @method removeTask
        * @description removes task from dictionary and window
        */
       function removeTask() {
           if(dict[dv.id] != null){
               console.log("no hi")
               delete dict[dv.id]
               localStorage.setItem('tasks', JSON.stringify(dict))
           } else {
               console.log("hi")
               delete finishDict[dv.id]
               window.localStorage.setItem('finished-tasks', JSON.stringify(finishDict))             
           }
           this.parentElement.remove()
        }
        /**
        * @method clear
        * @description clears current task from list
        */
        function clear() {
            this.parentElement.remove()
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

            document.getElementById('curr-task').innerHTML = dict[dv.id][0];
            setCurrTask(dv.id);
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

                .task-name {
                    word-break: break-word;
                    flex-basis: 50%;
                }
                .task-est-pomos, .task-act-pomos {
                    flex-basis: 5%;
                }
                .buttonBox {
                    flex-basis: 40%;
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
        `

        dv.appendChild(taskName)
        dv.appendChild(estPomos)
        dv.appendChild(actualPomos)
        dv.appendChild(buttonBox);
        dv.appendChild(startButton)
        dv.appendChild(removeButton)
        this.shadowRoot.append(dv)
    }
}

customElements.define('task-item', TaskItem)

/**
* @method loadTasks
* @description loads in tasks from local storage into the task lists on the website
*/
function loadTasks(){
    taskListDiv = document.getElementById('task-list-id');
    while(taskListDiv.firstChild){
        taskListDiv.removeChild(taskListDiv.firstChild);
    }
    //repopulating task dict
    tempDict = JSON.parse(localStorage.getItem('tasks'))
    for (var key in tempDict) {
        dict[key] = tempDict[key]
        if(key == 'ID-count'){
            ID = Number(dict[key])
            continue
        }
        let item = document.createElement('task-item')
        let itemName = item.shadowRoot.querySelector('.task-name')
        let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos')
        let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos')
        item.shadowRoot.querySelector('.task').id = key
        itemName.innerText = dict[key][0]
        itemEstPomos.innerText = dict[key][1]
        itemActPomos.innerText = dict[key][2]
        var container = document.querySelector('#task-list-id')
        container.append(item)       
    }
    //repopulating finished task list dict
    tempDict = JSON.parse(localStorage.getItem('finished-tasks'))
    for (var key in tempDict) {
        finishDict[key] = tempDict[key]
        if(key == 'ID-count'){
            ID = Number(dict[key])
            continue
        }
        let item = document.createElement('task-item')
        let itemName = item.shadowRoot.querySelector('.task-name')
        let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos')
        let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos')
        item.shadowRoot.querySelector('.task').id = key
        itemName.innerText = finishDict[key][0]
        itemEstPomos.innerText = finishDict[key][1]
        itemActPomos.innerText = finishDict[key][2]
        var container = document.querySelector('#completed-tasks')
        //item.shadowRoot.startButton.disabled = true;
        //item.shadowRoot.removeButton.disabled = true;
        container.append(item) 
    }
}

window.addEventListener('DOMContentLoaded', () => {
    //repopulating page if 'tasks' in local storage is not null
    if (!(window.localStorage.getItem('tasks') === null)) {
        loadTasks()
    }

    document.getElementById("analytics").addEventListener('change', (event) => {
        let analyticsToggle = Number(document.getElementById("analytics").checked);
        setAnalytics(analyticsToggle);
    });

    document.getElementById("dark-mode").addEventListener('change', (event) => {
        let darkModeToggle = Number(document.getElementById("dark-mode").checked);
        setDarkMode(darkModeToggle);
    });

    var submitButton = document.getElementById('add-task-button')
    submitButton.addEventListener('click', submitTask)
    /**
     * @method submitTask
     * @description Adds task to dictionary and window
     */
    function submitTask() {
        let item = document.createElement('task-item')
        let itemName = item.shadowRoot.querySelector('.task-name')
        let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos')
        let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos')
        let userTaskInput = document.getElementById('input-task-name')
        let userPomosInput = document.getElementById('input-pomos')
        let taskDiv = item.shadowRoot.querySelector('.task')
        itemName.innerText = userTaskInput.value
        itemEstPomos.innerText = userPomosInput.value
        itemActPomos.innerText = "--"
        var container = document.querySelector('.task-list')
        container.append(item)
        dict[taskDiv.id] = [itemName.innerText, itemEstPomos.innerText, itemActPomos.innerText]
        dict['ID-count'] = ID
        window.localStorage.setItem('tasks', JSON.stringify(dict))
    }
})