var dict = {}
/**
 * @description gets the max key value in the dictionary
 * @param {dict} dict
 * @returns {Number} The largest key in the dictionary
 */
function getMax(dict) {
    var currentMax = -1
    for (var key in dict) {
        if (Number(key) > currentMax) {
            currentMax = key
        }
    }
    return Number(currentMax)
}
/**
 * @description Sets the ID for the element to be added to the dict
 * @returns {String} Returns the ID in string form
 */
function setId() {
    let nextId = 0
    if (Object.keys(dict).length > 0) {
        nextId = getMax(dict) + 1
    } else {
        nextId = 1
    }
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
        var taskName = document.createElement('p')
        taskName.setAttribute('class', 'task-name')
        var estPomos = document.createElement('p')
        estPomos.setAttribute('class', 'task-est-pomos')
        var actualPomos = document.createElement('p')
        actualPomos.setAttribute('class', 'task-act-pomos')
        actualPomos.textContent = 'TBD'
        var startButton = document.createElement('button')
        startButton.textContent = 'Start Task'
        startButton.addEventListener('click', startTask)
        var removeButton = document.createElement('button')
        removeButton.textContent = 'Remove Task'
        removeButton.addEventListener('click', removeTask)
        /**
         * @method removeTask
         * @description removes task from dictionary and window
         */
        function removeTask() {
            delete dict[dv.id]
            localStorage.setItem('tasks', JSON.stringify(dict))
            this.parentElement.remove()
        }

        function startTask(){
            console.log("hi")
        }
        this.shadowRoot.innerHTML = `
            <style>
                .task {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    background-color: white;
                    filter: drop-shadow(0px 2px 5px rgb(0,0,0,0.4));
                    margin: 10px;
                    height: 50px;
                    border: solid 1px;   
                    border-color: gray;
                }
                .task-name, .task-est-pomos, .task-act-pomos, removeButton {
                    margin: 0px 50px 0px 50px; 
                }

            </style>
        `

        dv.appendChild(taskName)
        dv.appendChild(estPomos)
        dv.appendChild(actualPomos)
        dv.appendChild(startButton)
        dv.appendChild(removeButton)
        this.shadowRoot.append(dv)
    }
}

customElements.define('task-item', TaskItem)

window.addEventListener('DOMContentLoaded', () => {
    //repopulating page if 'tasks' in local storage is not null
    if (!(window.localStorage.getItem('tasks') === null)) {
        tempDict = JSON.parse(localStorage.getItem('tasks'))
        for (var key in tempDict) {
            dict[key] = tempDict[key]
            let item = document.createElement('task-item')
            let itemName = item.shadowRoot.querySelector('.task-name')
            let itemEstPomos = item.shadowRoot.querySelector('.task-est-pomos')
            let itemActPomos = item.shadowRoot.querySelector('.task-act-pomos')
            item.shadowRoot.querySelector('.task').id = key
            itemName.innerText = dict[key][0]
            itemEstPomos.innerText = dict[key][1]
            var container = document.querySelector('.task-list')
            container.append(item)
        }
    }

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
        var container = document.querySelector('.task-list')
        container.append(item)
        dict[taskDiv.id] = [itemName.innerText, itemEstPomos.innerText]
        window.localStorage.setItem('tasks', JSON.stringify(dict))
    }
})
