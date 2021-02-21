/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("openButton").style.paddingLeft = "275px";
    document.getElementById("openButton").onclick = closeNav;
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("openButton").style.paddingLeft = "15px";
    document.getElementById("openButton").onclick = openNav;
  }
  
  function openTimer() {
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

    closeNav();
  }

  function openTasks() {
    document.getElementById("timer").style.display = "none";
    document.getElementById("analytics").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("tasks").style.display = "block";

    document.getElementById("timerbtn").onclick = openTimer;
    document.getElementById("tasksbtn").onclick = closeNav;
    document.getElementById("analyticsbtn").onclick = openAnalytics;
    document.getElementById("settingsbtn").onclick = openSettings;

    closeNav();
  }

  function openAnalytics() {
    document.getElementById("timer").style.display = "none";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("analytics").style.display = "block";

    document.getElementById("timerbtn").onclick = openTimer;
    document.getElementById("tasksbtn").onclick = openTasks;
    document.getElementById("analyticsbtn").onclick = closeNav;
    document.getElementById("settingsbtn").onclick = openSettings;

    closeNav();
  }

  function openSettings() {
    document.getElementById("timer").style.display = "none";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("analytics").style.display = "none";
    document.getElementById("settings").style.display = "block";

    document.getElementById("timerbtn").onclick = openTimer;
    document.getElementById("tasksbtn").onclick = openTasks;
    document.getElementById("analyticsbtn").onclick = openAnalytics;
    document.getElementById("settingsbtn").onclick = closeNav;

    closeNav();
  }