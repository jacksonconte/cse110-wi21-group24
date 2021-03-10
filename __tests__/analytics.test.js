const { opnenNav, closeNav, openTimer, openTasks, openAnalytics, openSettings, setCurrTask, endTask, startTimer, resumeTimer, stopTimer, resetAnimation, tick, incrementPomo, convertToPrettyTime, setTime, logDistraction, setId, loadTasks, loadAnalytics, displayAnalytics, setLabel, checkSettings, submitSettings, resetSettings, setSettings, setDarkMode, setAnalytics } = require('../source/scripts/script');

describe("Test loadAnalytics", () => {
    test("Loads message when no tasks completed", () => {
        document.body.innerHTML = `
        <div id="analytics" class="content">
          <div id="task-select">
            <h2>Select Analytics For: </h2>
            <br>
            <select name="comp-tasks-dropdown" id="comp-tasks-dropdown">
            </select>
            <br><br>
            <div id="stat-display"></div>
          </div>
    
          <h1 id="no-tasks" style="text-align: center;">Complete A Task To View Analytics!</h1>
        </div>
    
        `
        loadAnalytics();
        expect(document.getElementById("task-select").style.display=="none").toBeTruthy;
        expect(document.getElementById("no-tasks").style.display).not.toBe("none");
    });

    test("Loads dropdown of complete analytics when some tasks completed", () => {
        document.body.innerHTML = `
        <div id="analytics" class="content">
          <div id="task-select">
            <h2>Select Analytics For: </h2>
            <br>
            <select name="comp-tasks-dropdown" id="comp-tasks-dropdown">
            </select>
            <br><br>
            <div id="stat-display"></div>
          </div>
    
          <h1 id="no-tasks" style="text-align: center;">Complete A Task To View Analytics!</h1>
        </div>
    
        `
        localStorage.setItem("finished-tasks", '{"0":["test1","10",5,[4,12,47],[["wc",0],["wc",2],["w",3],["sb",6],["w",3],["sbc",4],["sb",6],["w",3],["sb",6],["wc",1],["w",3],["lb",9],["w",3]],49],"1":["test2","10",1,[2],[["w",3]],3],"4":["test3","10",2,[14],[["wc",1],["wc",1],["wc",1],["w",3],["sbc",1],["sb",6],["w",3],["sbc",0]],16],"5":["test4","10",2,[1,2,10],[["w",3],["sb",6],["wc",2],["w",3]],14]}');
        loadAnalytics();
        expect(document.getElementById("task-select").style.display).not.toBe("none");
        let options = document.getElementById("comp-tasks-dropdown").childNodes;
        expect(options.length).toBe(5);
        expect(options[0].innerHTML).toBe("");
        expect(options[0].disabled).toBeTruthy;
        expect(options[1].innerHTML).toBe("test1");
        expect(options[1].value).toBe("0");
        expect(options[2].innerHTML).toBe("test2");
        expect(options[2].value).toBe("1");
        expect(options[3].innerHTML).toBe("test3");
        expect(options[3].value).toBe("4");
        expect(options[4].innerHTML).toBe("test4");
        expect(options[4].value).toBe("5");
    })
});