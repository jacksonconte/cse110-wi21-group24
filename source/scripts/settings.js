/**
 * @description Checks if settings exist in local storage. If not, creates defaults.
 */
function checkSettings() {
    if(window.localStorage.getItem('workPomoTime') === null){
        window.localStorage.setItem('workPomoTime', 25);
    }
    if(window.localStorage.getItem('shortBreakTime') === null){
        window.localStorage.setItem('shortBreakTime', 5);
    }
    if(window.localStorage.getItem('longBreakTime') === null){
        window.localStorage.setItem('longBreakTime', 15);
    }
    if(window.localStorage.getItem('analyticsToggle') === null){
        window.localStorage.setItem('analyticsToggle', 1);
    }
    if(window.localStorage.getItem('darkModeToggle') === null){
        window.localStorage.setItem('darkModeToggle', 0);
    }

    setSettings();
}

/**
 * @description Updates settings in local storage based on inputs on settings page
 */
function submitSettings() {
    let workPomoTime = document.getElementById('work-pomo-time').value;
    let shortBreakTime = document.getElementById('short-break-time').value;
    let longBreakTime = document.getElementById('long-break-time').value;
    let analyticsToggle = Number(document.getElementById('analytics-on').checked);
    let darkModeToggle = Number(document.getElementById('dark-mode-on').checked);

    window.localStorage.setItem('workPomoTime', workPomoTime);
    window.localStorage.setItem('shortBreakTime', shortBreakTime);
    window.localStorage.setItem('longBreakTime', longBreakTime);
    window.localStorage.setItem('analyticsToggle', analyticsToggle);
    window.localStorage.setItem('darkModeToggle', darkModeToggle);

    alert("Settings updated");
    setSettings();
}

/**
 * @description Resets settings in local storage to defaults
 */
function resetSettings() {
    window.localStorage.setItem('workPomoTime', 25);
    window.localStorage.setItem('shortBreakTime', 5);
    window.localStorage.setItem('longBreakTime', 15);
    window.localStorage.setItem('analyticsToggle', 1);
    window.localStorage.setItem('darkModeToggle', 0);
    alert("Settings reset to defaults");
    setSettings();
}

/**
 * @description Sets values on settings page based on local storage values
 */
function setSettings() {
    let workPomoTime = window.localStorage.getItem('workPomoTime');
    let shortBreakTime = window.localStorage.getItem('shortBreakTime');
    let longBreakTime = window.localStorage.getItem('longBreakTime');
    let analyticsToggle = window.localStorage.getItem('analyticsToggle');
    let darkModeToggle = window.localStorage.getItem('darkModeToggle');

    document.getElementById('work-pomo-time').innerHTML = workPomoTime;
    document.getElementById('work-pomo-time').value = workPomoTime;
    document.getElementById('short-break-time').innerHTML = shortBreakTime;
    document.getElementById('short-break-time').value = shortBreakTime;
    document.getElementById('long-break-time').innerHTML = longBreakTime;
    document.getElementById('long-break-time').value = longBreakTime;
    if(Number(analyticsToggle)){
        document.getElementById('analytics-on').checked = true;
    } else{
        document.getElementById('analytics-off').checked = true;
    }
    if(Number(darkModeToggle)){
        document.getElementById('dark-mode-on').checked = true;
    } else{
        document.getElementById('dark-mode-off').checked = true;
    }
}