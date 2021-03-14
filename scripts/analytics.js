/**
 * @description Loads analytics page depending on whether any tasks have been completed
 */

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('comp-tasks-dropdown').selectedIndex = -1;
  document
    .getElementById('comp-tasks-dropdown')
    .addEventListener('change', (event) => {
      displayAnalytics();
    });
});

function loadAnalytics() {
  document.getElementById('comp-tasks-dropdown').innerHTML = '';
  document.getElementById('stat-display').innerHTML = '';

  let emptySelection = document.createElement('option');
  emptySelection.selected = true;
  emptySelection.disabled = true;
  emptySelection.innerText = '-- select an option --';

  document.getElementById('comp-tasks-dropdown').appendChild(emptySelection);
  let tasks = JSON.parse(localStorage.getItem('finished-tasks'));
  if (tasks && Object.keys(tasks) && Object.keys(tasks).length !== 0) {
    let dropdown = document.getElementById('comp-tasks-dropdown');
    for (let i = 0; i < Object.keys(tasks).length; i++) {
      let selection = document.createElement('option');
      selection.setAttribute('value', Object.keys(tasks)[i]);
      selection.innerHTML = tasks[Object.keys(tasks)[i]][0];
      dropdown.appendChild(selection);
    }
    document.getElementById('no-tasks').style.display = 'none';
    document.getElementById('task-select').style.display = 'initial';
  }
}

/**
 * @description Displays analytics for selected task
 */
function displayAnalytics() {
  document.getElementById('stat-display').innerHTML = '';
  let taskID = document.getElementById('comp-tasks-dropdown').value;
  let tasks = JSON.parse(localStorage.getItem('finished-tasks'));
  let taskProgress = tasks[taskID][4];
  let distractions = tasks[taskID][3];
  let totalTime = tasks[taskID][5];
  let cancelledWorkPomos = 0;
  let board = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  board.setAttribute('width', '1000');
  board.setAttribute('height', '200');
  board.setAttribute('id', 'analytics-svg');
  let xtrack = 0;
  document.getElementById('stat-display').appendChild(board);
  for (let i = 0; i < taskProgress.length; i++) {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute(
      'width',
      String(Math.round((1000 * taskProgress[i][1]) / totalTime))
    );
    rect.setAttribute('height', '100');
    rect.setAttribute('x', String(xtrack));
    rect.setAttribute('y', '20');
    xtrack += Math.round((1000 * taskProgress[i][1]) / totalTime);

    let pomoType;
    switch (taskProgress[i][0]) {
      case 'w':
        pomoType = 'Work Pomo';
        rect.setAttribute('fill', 'rgba(0,0,127,0.6');
        break;
      case 'sb':
        pomoType = 'Short Break';
        rect.setAttribute('fill', 'rgba(0,255,0,0.6)');
        break;
      case 'lb':
        pomoType = 'Long Break';
        rect.setAttribute('fill', 'rgba(0,255,0,0.8)');
        break;
      case 'wc':
        pomoType = 'Cancelled Work Pomo';
        rect.setAttribute('fill', 'rgba(0,0,0,0.5)');
        cancelledWorkPomos++;
        break;
      case 'sbc':
        pomoType = 'Cancelled Short Break';
        rect.setAttribute('fill', 'rgba(0,0,0,0.5)');
        break;
      case 'lbc':
        pomoType = 'Cancelled Long Break';
        rect.setAttribute('fill', 'grey');
        break;
    }

    let labelText =
      'This was a ' +
      pomoType +
      ' that lasted ' +
      Math.floor(taskProgress[i][1] / 60) +
      ' minutes and ' +
      (taskProgress[i][1] % 60) +
      ' seconds.';
    rect.setAttribute('onmouseover', 'setLabel("' + labelText + '")');
    rect.setAttribute('onmouseout', 'setLabel("Hover to Display Info")');

    board.appendChild(rect);
  }

  for (let i = 0; i < distractions.length; i++) {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', 5);
    rect.setAttribute('height', '110');
    rect.setAttribute(
      'x',
      String(Math.round((1000 * distractions[i]) / totalTime))
    );
    rect.setAttribute('y', '15');
    rect.setAttribute('fill', 'rgba(255,0,0,0.8)');

    let labelText =
      'This was a distraction logged at ' +
      Math.floor(distractions[i] / 60) +
      ' minutes and ' +
      (distractions[i] % 60) +
      ' seconds in.';

    rect.setAttribute('onmouseover', 'setLabel("' + labelText + '")');
    rect.setAttribute('onmouseout', 'setLabel("Hover to Display Info")');
    board.appendChild(rect);
  }

  let label = document.createElement('h2');
  label.setAttribute('id', 'svg-label');
  label.innerHTML = 'Hover to Display Info';
  document.getElementById('stat-display').appendChild(label);

  let stats = document.createElement('div');
  stats.setAttribute('id', 'stats');

  let statEstPomo = document.createElement('p');
  statEstPomo.innerHTML = 'Estimated Pomos: ' + tasks[taskID][1] + '<br>';
  stats.appendChild(statEstPomo);

  let statActPomo = document.createElement('p');
  statActPomo.innerHTML = 'Completed Pomos: ' + tasks[taskID][2];
  stats.appendChild(statActPomo);

  let statCancelledPomo = document.createElement('p');
  statCancelledPomo.innerHTML = 'Cancelled Pomos: ' + cancelledWorkPomos;
  stats.appendChild(statCancelledPomo);

  let statTotalTime = document.createElement('h3');
  statTotalTime.innerHTML =
    'Total Time: ' +
    Math.floor(totalTime / 60) +
    ' minutes and ' +
    (totalTime % 60) +
    ' seconds.';
  stats.appendChild(statTotalTime);

  document.getElementById('stat-display').appendChild(stats);
}

/**
 * @description Sets text inside hover label
 * @param {String} text
 */
function setLabel(text) {
  document.getElementById('svg-label').innerHTML = text;
}
