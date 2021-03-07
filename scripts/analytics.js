function loadAnalytics() {
    document.getElementById("comp-tasks-dropdown").innerHTML = "";
    document.getElementById("stat-display").innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem('finished-tasks'));
    if(Object.keys(tasks).length != 0){
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

function displayAnalytics(){
    document.getElementById("stat-display").innerHTML = "";
    let taskID = document.getElementById("comp-tasks-dropdown").value;
    let tasks = JSON.parse(localStorage.getItem('finished-tasks'));
    let taskProgress = tasks[taskID][4];
    let distractions = tasks[taskID][3];
    let totalTime = tasks[taskID][5];
    let cancelledWorkPomos = 0;
    let board = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    board.setAttribute("width","1500");
    board.setAttribute("height","200");
    board.setAttribute("id","analytics-svg");
    let xtrack = 20
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
                rect.setAttribute("fill","navy");
                break;
            case "sb":
                pomoType="Short Break";
                rect.setAttribute("fill","green");
                break;
            case "lb":
                pomoType="Long Break";
                rect.setAttribute("fill","green");
                break;
            case "wc":
                pomoType="Cancelled Work Pomo";
                rect.setAttribute("fill","grey");
                cancelledWorkPomos++;
                break;
            case "sbc":
                pomoType="Cancelled Short Break";
                rect.setAttribute("fill","grey");
                break;
            case "lbc":
                pomoType="Cancelled Long Break";
                rect.setAttribute("fill","grey");
                break;         
        }

        let labelText = "This was a " + pomoType + " that lasted " + taskProgress[i][1];
        rect.setAttribute("onmouseover","setLabel(\""+labelText+"\")");
        rect.setAttribute("onmouseout","setLabel(\"Hover to Display Info\")");

        board.appendChild(rect);
    }

    for(let i = 0; i < distractions.length; i++){
        let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttribute("width", 5);
        rect.setAttribute("height","110");
        rect.setAttribute("x", String(Math.round(1000*distractions[i]/totalTime + 20)));
        rect.setAttribute("y", "15");
        rect.setAttribute("fill","red");

        let labelText = "This was a distraction logged at " + distractions[i];

        rect.setAttribute("onmouseover","setLabel(\""+labelText+"\")");
        rect.setAttribute("onmouseout","setLabel(\"Hover to Display Info\")");
        board.appendChild(rect);
    }

    let label = document.createElement("div");
    label.setAttribute("id", "svg-label");
    label.innerHTML="Hover to Display Info";
    document.getElementById("stat-display").appendChild(label);

    let stats = document.createElement("div");
    stats.setAttribute("id", "stats");
    let statEstPomo = document.createElement("p");
    statEstPomo.innerHTML = "Estimated Pomos: " + tasks[taskID][1];
    stats.appendChild(statEstPomo);
    let statActPomo = document.createElement("p");
    statActPomo.innerHTML = "Actual (Completed) Pomos: " + tasks[taskID][2];
    stats.appendChild(statActPomo);
    let statCancelledPomo = document.createElement("p");
    statCancelledPomo.innerHTML = "Cancelled Pomos: " + cancelledWorkPomos;
    stats.appendChild(statCancelledPomo);
    let statTotalTime = document.createElement("p");
    statTotalTime.innerHTML = "Total Time: " + totalTime;
    stats.appendChild(statTotalTime);
    document.getElementById("stat-display").appendChild(stats);
}

function setLabel(text){
    document.getElementById("svg-label").innerHTML = text;
}