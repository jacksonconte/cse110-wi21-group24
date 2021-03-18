// This code runs before page load and sets local storage if it doesn't exist
if (window.localStorage.getItem('workPomoTime') === null) {
  window.localStorage.setItem('workPomoTime', 25);
}
if (window.localStorage.getItem('shortBreakTime') === null) {
  window.localStorage.setItem('shortBreakTime', 5);
}
if (window.localStorage.getItem('longBreakTime') === null) {
  window.localStorage.setItem('longBreakTime', 15);
}
if (window.localStorage.getItem('analyticsToggle') === null) {
  window.localStorage.setItem('analyticsToggle', 1);
}
if (window.localStorage.getItem('darkModeToggle') === null) {
  window.localStorage.setItem('darkModeToggle', 0);
}

/**
 * @method isValidInput
 * @description checks whether the input put into the settings page is valid or not
 * @param {String} str
 * @returns {Boolean} whether the time inputs are valid or not
 */
function isValidInput(str) {
  str = str.trim();
  return str !== '';
}

/**
 * @method submitSettings
 * @description Updates settings in local storage based on inputs on settings page
 */
function submitSettings() {
  let workPomoTime = document.getElementById('work-pomo-time').value;
  let shortBreakTime = document.getElementById('short-break-time').value;
  let longBreakTime = document.getElementById('long-break-time').value;

  if (
    isValidInput(workPomoTime) &&
    isValidInput(shortBreakTime) &&
    isValidInput(longBreakTime)
  ) {
    window.localStorage.setItem('workPomoTime', workPomoTime);
    window.localStorage.setItem('shortBreakTime', shortBreakTime);
    window.localStorage.setItem('longBreakTime', longBreakTime);
    alert('Settings updated');
    setSettings();
  } else {
    alert(
      'There are invalid time inputs. Please make sure that all time lengths are filled.'
    );
  }
}

/**
 * @method resetSettings
 * @description Resets settings in local storage to defaults
 */
function resetSettings() {
  window.localStorage.setItem('workPomoTime', 25);
  window.localStorage.setItem('shortBreakTime', 5);
  window.localStorage.setItem('longBreakTime', 15);
  window.localStorage.setItem('analyticsToggle', 1);
  window.localStorage.setItem('darkModeToggle', 0);
  alert('Settings reset to defaults');
  setSettings();
}

/**
 * @method setSettings
 * @description Sets values on settings page based on local storage values
 */
function setSettings() {
  let workPomoTime = window.localStorage.getItem('workPomoTime');
  let shortBreakTime = window.localStorage.getItem('shortBreakTime');
  let longBreakTime = window.localStorage.getItem('longBreakTime');
  let analyticsToggle = window.localStorage.getItem('analyticsToggle');
  let darkModeToggle = window.localStorage.getItem('darkModeToggle');

  document.getElementById('work-pomo-time').value = workPomoTime;
  document.getElementById('short-break-time').value = shortBreakTime;
  document.getElementById('long-break-time').value = longBreakTime;

  setDarkMode(darkModeToggle);
  setAnalytics(analyticsToggle);
}

/**
 * @method setDarkMode
 * @description Enables dark mode if the user checks the toggle for it, enables the default if not
 * @param {Number} enabled
 */
function setDarkMode(enabled) {
  if (Number(enabled)) {
    document.getElementById('dark-mode').checked = true;
    document.getElementsByTagName('body')[0].style =
      'background: linear-gradient(90deg, #333, #444, #555, #888); background-size: 150% 800%;';
    document.getElementById('open-button').style = 'color: white';
    document.getElementById('timerbtn').style =
      'border: 3px solid white; color: white;';
    document.getElementById('tasksbtn').style =
      'border: 3px solid white; color: white;';

    document.getElementById('analyticsbtn').style.border = '3px solid white';
    document.getElementById('analyticsbtn').style.color = 'white';

    document.getElementById('settingsbtn').style =
      'border: 3px solid white; color: white;';
    document.getElementById('my-sidebar').style =
      'background-color: rgba(0,0,0,0.1);';
  } else {
    document.getElementById('dark-mode').checked = false;
    document.getElementsByTagName('body')[0].style = '';
    document.getElementById('open-button').style = '';

    document.getElementById('timerbtn').style = '';
    document.getElementById('tasksbtn').style = '';

    document.getElementById('analyticsbtn').style.borderColor = 'black';
    document.getElementById('analyticsbtn').style.color = 'black';

    document.getElementById('settingsbtn').style = '';
    document.getElementById('my-sidebar').style = '';
  }
  window.localStorage.setItem('darkModeToggle', enabled);
}

/**
 * @method setAnalytics
 * @description Enables the analytics page if user has the toggle checked, otherwise does not
 * @param {Number} enabled
 */
function setAnalytics(enabled) {
  if (Number(enabled)) {
    console.log('re');
    document.getElementById('analytics-checkbox').checked = true;
    document.getElementById('analyticsbtn').style.display = 'inherit';
  } else {
    console.log('mo');
    document.getElementById('analytics-checkbox').checked = false;
    document.getElementById('analyticsbtn').style.display = 'none';
  }
  window.localStorage.setItem('analyticsToggle', enabled);
}
