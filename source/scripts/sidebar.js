/**
 * @method openNav
 * @description Pulls out sidebar, moves menu button left, sets menu button to close sidebar
 */
function openNav() {
  document.getElementById('my-sidebar').style.width = '350px';
  document.getElementById('open-button').style.cursor = 'cursor';
  document.getElementById('open-button').style.marginLeft = '260px';
  document.getElementById('open-button').onclick = closeNav;
}

/**
 * @method closeNav
 * @description Hides sidebar, moves menu button right, sets menu button to open sidebar
 */
function closeNav() {
  document.getElementById('my-sidebar').style.width = '0';
  document.getElementById('open-button').style.marginLeft = '5px';
  document.getElementById('open-button').onclick = openNav;
}

/**
 * @method openTimer
 * @description Displays timer content, updates menu buttons
 */
function openTimer() {
  resumeTimer();
  /* display appropriate content */
  document.getElementById('tasks').style.display = 'none';
  document.getElementById('analytics').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('timer').style.display = 'block';

  /* update buttons */
  document.getElementById('timerbtn').onclick = closeNav;
  document.getElementById('tasksbtn').onclick = openTasks;
  document.getElementById('analyticsbtn').onclick = openAnalytics;
  document.getElementById('settingsbtn').onclick = openSettings;

  closeNav();
}

/**
 * @method openTasks
 * @description Displays tasks content, updates menu buttons
 */
function openTasks() {
  document.getElementById('timer').style.display = 'none';
  document.getElementById('analytics').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('tasks').style.display = 'block';

  document.getElementById('timerbtn').onclick = openTimer;
  document.getElementById('tasksbtn').onclick = closeNav;
  document.getElementById('analyticsbtn').onclick = openAnalytics;
  document.getElementById('settingsbtn').onclick = openSettings;

  closeNav();
}

/**
 * @method openAnalytics
 * @description Displays analytics content, updates menu buttons
 */
function openAnalytics() {
  loadAnalytics();

  document.getElementById('timer').style.display = 'none';
  document.getElementById('tasks').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('analytics').style.display = 'block';

  document.getElementById('timerbtn').onclick = openTimer;
  document.getElementById('tasksbtn').onclick = openTasks;
  document.getElementById('analyticsbtn').onclick = closeNav;
  document.getElementById('settingsbtn').onclick = openSettings;

  closeNav();
}

/**
 * @method openSettings
 * @description Displays settings content, updates menu buttons
 */
function openSettings() {
  document.getElementById('timer').style.display = 'none';
  document.getElementById('tasks').style.display = 'none';
  document.getElementById('analytics').style.display = 'none';
  document.getElementById('settings').style.display = 'block';

  document.getElementById('timerbtn').onclick = openTimer;
  document.getElementById('tasksbtn').onclick = openTasks;
  document.getElementById('analyticsbtn').onclick = openAnalytics;
  document.getElementById('settingsbtn').onclick = closeNav;

  closeNav();
}
