let timerStarted = false;
let timerSeconds, intervalID, button, readout, circle;
const DURATION = 60; // seconds for timer

function startTimer() {
    intervalID = setInterval(tick, 1000);
    circle.style['animation-duration'] = DURATION + 's';
    circle.style['animation-play-state'] = 'running';
    button.innerHTML = 'STOP';
    timerStarted = true;
}
function stopTimer() {
    clearInterval(intervalID);
    circle.style['animation-play-state'] = 'paused';
    circle.style['stroke-dashoffset'] = '0px';
    
    button.innerHTML = 'START';
    timerStarted = false;
    timerSeconds = DURATION;
    readout.innerHTML = convertToPrettyTime(timerSeconds);
}
function tick() {
    timerSeconds--;
    readout.innerHTML = convertToPrettyTime(timerSeconds);
    if (timerSeconds == 0) stopTimer();
}

function convertToPrettyTime(seconds) {
    minutes = Math.floor(seconds / 60);
    return ((minutes < 10 ? "0" : "") + minutes.toString() + ":" + (seconds % 60 < 10 ? "0" : "") + (seconds % 60).toString());
}

/*
window.addEventListener('DOMContentLoaded', () => {
    button = document.getElementById('toggle');
    readout = document.getElementById('readout');
    button.onclick = () => {
        if (timerStarted) {
            stopTimer();
        } else {
            startTimer();
        }
        timerSeconds = DURATION;
    };
});
*/
/*
function setTime(time) {
    let countdown = 20;

    readout.innerHTML = countdown;

    intervalID = setInterval(() => {
        countdown = --countdown <= 0 ? 20 : countdown;
        readout.innerHTML = countdown;
    }, 1000);
}*/

window.addEventListener('DOMContentLoaded', () => {
    button = document.getElementById('toggle');
    readout = document.getElementById('countdown-number');
    circle = document.querySelector('circle');

    readout.innerHTML = convertToPrettyTime(DURATION);

    button.onclick = () => {
        if (timerStarted) {
            stopTimer();
        } else {
            startTimer();
        }
        timerSeconds = DURATION;
    };
});