var numTasks = 0;
var dict = {};


class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        var dv = document.createElement('div');
        dv.setAttribute("class", "task");
        dv.setAttribute("id", numTasks);
        var taskName = document.createElement('p');
        taskName.setAttribute("class", "task-name");
        taskName.textContent = "task #1";
        var estPomos = document.createElement('p');
        estPomos.setAttribute("class", "task-est-pomos");
        estPomos.textContent = "5";
        var actualPomos = document.createElement('p');
        actualPomos.setAttribute("class", "task-act-pomos");
        actualPomos.textContent = "TBD";
        var button = document.createElement('button');
        button.textContent = "Remove Task";
        button.addEventListener('click', removeTask);

        function removeTask() {
            --numTasks;
            delete dict[dv.id];
            dict["num"] = numTasks;
            window.localStorage.setItem("tasks", JSON.stringify(dict));
            this.parentElement.remove();
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
                .task-name, .task-est-pomos, .task-act-pomos, button {
                    margin: 0px 50px 0px 50px; 
                }

            </style>
        `;

        dv.appendChild(taskName);
        dv.appendChild(estPomos);
        dv.appendChild(actualPomos);
        dv.appendChild(button);
        this.shadowRoot.append(dv);
    }
}

customElements.define('task-item', TaskItem);

window.addEventListener('DOMContentLoaded', () => {
    numTasks = 0;
    if (!(window.localStorage.getItem("tasks") === null)) {
        dict = JSON.parse(localStorage.getItem("tasks"));
        console.log(dict.length);
        for (var key in dict) {
            if (key == "num") {
                numTasks = dict["num"];
                continue;
            }
            let item = document.createElement('task-item');
            let itemName = item.shadowRoot.querySelector(".task-name");
            let itemEstPomos = item.shadowRoot.querySelector(".task-est-pomos");
            let itemActPomos = item.shadowRoot.querySelector(".task-act-pomos");
            itemName.innerText = dict[key][0];
            itemEstPomos.innerText = dict[key][1];
            var container = document.querySelector(".task-list");
            container.append(item);
        }
    }

    var submitButton = document.getElementById("add-task-button");
    submitButton.addEventListener('click', submitTask);


    function submitTask() {
        let item = document.createElement('task-item');
        let itemName = item.shadowRoot.querySelector(".task-name");
        let itemEstPomos = item.shadowRoot.querySelector(".task-est-pomos");
        let itemActPomos = item.shadowRoot.querySelector(".task-act-pomos")
        let userTaskInput = document.getElementById("input-task-name");
        let userPomosInput = document.getElementById("input-pomos");
        let taskDiv = item.shadowRoot.querySelector(".task");
        //taskDiv.setAttribute("id", ++numTask);
        itemName.innerText = userTaskInput.value;
        itemEstPomos.innerText = userPomosInput.value;
        var container = document.querySelector(".task-list");
        container.append(item);
        ++numTasks;
        dict[taskDiv.id] = [itemName.innerText, itemEstPomos.innerText];
        dict["num"] = numTasks;
        window.localStorage.setItem("tasks", JSON.stringify(dict));

    }

});