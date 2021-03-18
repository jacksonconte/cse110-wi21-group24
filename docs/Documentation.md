yarn run v1.22.5
$ /home/runner/work/cse110-wi21-group24/cse110-wi21-group24/node_modules/.bin/jsdoc2md -f 'source/**'
## Classes

<dl>
<dt><a href="#TaskItem">TaskItem</a></dt>
<dd></dd>
<dt><a href="#TaskItem">TaskItem</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#loadAnalytics">loadAnalytics()</a></dt>
<dd><p>Creates drop-down on analytics page for tasks</p>
</dd>
<dt><a href="#displayAnalytics">displayAnalytics()</a></dt>
<dd><p>Displays analytics for selected task</p>
</dd>
<dt><a href="#setLabel">setLabel(text)</a></dt>
<dd><p>Sets text inside hover label</p>
</dd>
<dt><a href="#checkSettings">checkSettings()</a></dt>
<dd><p>Checks if settings exist in local storage. If not, creates defaults.</p>
</dd>
<dt><a href="#isValidInput">isValidInput(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>checks whether the input put into the settings page is valid or not</p>
</dd>
<dt><a href="#submitSettings">submitSettings()</a></dt>
<dd><p>Updates settings in local storage based on inputs on settings page</p>
</dd>
<dt><a href="#resetSettings">resetSettings()</a></dt>
<dd><p>Resets settings in local storage to defaults</p>
</dd>
<dt><a href="#setSettings">setSettings()</a></dt>
<dd><p>Sets values on settings page based on local storage values</p>
</dd>
<dt><a href="#setDarkMode">setDarkMode(enabled)</a></dt>
<dd><p>Enables dark mode if the user checks the toggle for it, enables the default if not</p>
</dd>
<dt><a href="#setAnalytics">setAnalytics(enabled)</a></dt>
<dd><p>Enables the analytics page if user has the toggle checked, otherwise does not</p>
</dd>
<dt><a href="#openNav">openNav()</a></dt>
<dd><p>Pulls out sidebar, moves menu button left, sets menu button to close sidebar</p>
</dd>
<dt><a href="#closeNav">closeNav()</a></dt>
<dd><p>Hides sidebar, moves menu button right, sets menu button to open sidebar</p>
</dd>
<dt><a href="#openTimer">openTimer()</a></dt>
<dd><p>Displays timer content, updates menu buttons</p>
</dd>
<dt><a href="#openTasks">openTasks()</a></dt>
<dd><p>Displays tasks content, updates menu buttons</p>
</dd>
<dt><a href="#openAnalytics">openAnalytics()</a></dt>
<dd><p>Displays analytics content, updates menu buttons</p>
</dd>
<dt><a href="#openSettings">openSettings()</a></dt>
<dd><p>Displays settings content, updates menu buttons</p>
</dd>
<dt><a href="#setId">setId()</a> ⇒ <code>String</code></dt>
<dd><p>Sets the ID for the element to be added to the dict</p>
</dd>
<dt><a href="#removeTask">removeTask()</a></dt>
<dd><p>removes task from dictionary and window</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>clears current task from list</p>
</dd>
<dt><a href="#startTask">startTask()</a></dt>
<dd><p>Starts the timer from the current task</p>
</dd>
<dt><a href="#loadTasks">loadTasks()</a></dt>
<dd><p>loads in tasks from local storage into the task lists on the website</p>
</dd>
<dt><a href="#submitTask">submitTask()</a></dt>
<dd><p>Adds task to dictionary and window</p>
</dd>
<dt><a href="#setCurrTask">setCurrTask(taskID)</a></dt>
<dd><p>Loads task into timer based on taskID</p>
</dd>
<dt><a href="#endTask">endTask()</a></dt>
<dd><p>Finishes a task and removes it from the task list.</p>
</dd>
<dt><a href="#startTimer">startTimer()</a></dt>
<dd><p>starts timer and animation</p>
</dd>
<dt><a href="#resumeTimer">resumeTimer()</a></dt>
<dd><p>resumes timer and animation</p>
</dd>
<dt><a href="#stopTimer">stopTimer()</a></dt>
<dd><p>stops timer and resets animation</p>
</dd>
<dt><a href="#resetAnimation">resetAnimation()</a></dt>
<dd><p>triggers animation reflow</p>
</dd>
<dt><a href="#tick">tick()</a></dt>
<dd><p>updates timer each second</p>
</dd>
<dt><a href="#incrementPomo">incrementPomo()</a></dt>
<dd><p>updates number of pomos at end of pomo</p>
</dd>
<dt><a href="#convertToPrettyTime">convertToPrettyTime(seconds)</a> ⇒ <code>String</code></dt>
<dd><p>converts seconds to MM:SS</p>
</dd>
<dt><a href="#setTime">setTime(minutes)</a></dt>
<dd><p>updates timer readout on page</p>
</dd>
<dt><a href="#logDistraction">logDistraction()</a></dt>
<dd><p>logs a distraction during the work pomo</p>
</dd>
</dl>

<a name="TaskItem"></a>

## TaskItem
**Kind**: global class  

* [TaskItem](#TaskItem)
    * [new TaskItem()](#new_TaskItem_new)
    * [new TaskItem()](#new_TaskItem_new)

<a name="new_TaskItem_new"></a>

### new TaskItem()
A custom component that defines the task

<a name="new_TaskItem_new"></a>

### new TaskItem()
Constructor of the TaskItem class

<a name="TaskItem"></a>

## TaskItem
**Kind**: global class  

* [TaskItem](#TaskItem)
    * [new TaskItem()](#new_TaskItem_new)
    * [new TaskItem()](#new_TaskItem_new)

<a name="new_TaskItem_new"></a>

### new TaskItem()
A custom component that defines the task

<a name="new_TaskItem_new"></a>

### new TaskItem()
Constructor of the TaskItem class

<a name="loadAnalytics"></a>

## loadAnalytics()
Creates drop-down on analytics page for tasks

**Kind**: global function  
<a name="displayAnalytics"></a>

## displayAnalytics()
Displays analytics for selected task

**Kind**: global function  
<a name="setLabel"></a>

## setLabel(text)
Sets text inside hover label

**Kind**: global function  

| Param | Type |
| --- | --- |
| text | <code>String</code> | 

<a name="checkSettings"></a>

## checkSettings()
Checks if settings exist in local storage. If not, creates defaults.

**Kind**: global function  
<a name="isValidInput"></a>

## isValidInput(str) ⇒ <code>Boolean</code>
checks whether the input put into the settings page is valid or not

**Kind**: global function  
**Returns**: <code>Boolean</code> - whether the time inputs are valid or not  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="submitSettings"></a>

## submitSettings()
Updates settings in local storage based on inputs on settings page

**Kind**: global function  
<a name="resetSettings"></a>

## resetSettings()
Resets settings in local storage to defaults

**Kind**: global function  
<a name="setSettings"></a>

## setSettings()
Sets values on settings page based on local storage values

**Kind**: global function  
<a name="setDarkMode"></a>

## setDarkMode(enabled)
Enables dark mode if the user checks the toggle for it, enables the default if not

**Kind**: global function  

| Param | Type |
| --- | --- |
| enabled | <code>Number</code> | 

<a name="setAnalytics"></a>

## setAnalytics(enabled)
Enables the analytics page if user has the toggle checked, otherwise does not

**Kind**: global function  

| Param | Type |
| --- | --- |
| enabled | <code>Number</code> | 

<a name="openNav"></a>

## openNav()
Pulls out sidebar, moves menu button left, sets menu button to close sidebar

**Kind**: global function  
<a name="closeNav"></a>

## closeNav()
Hides sidebar, moves menu button right, sets menu button to open sidebar

**Kind**: global function  
<a name="openTimer"></a>

## openTimer()
Displays timer content, updates menu buttons

**Kind**: global function  
<a name="openTasks"></a>

## openTasks()
Displays tasks content, updates menu buttons

**Kind**: global function  
<a name="openAnalytics"></a>

## openAnalytics()
Displays analytics content, updates menu buttons

**Kind**: global function  
<a name="openSettings"></a>

## openSettings()
Displays settings content, updates menu buttons

**Kind**: global function  
<a name="setId"></a>

## setId() ⇒ <code>String</code>
Sets the ID for the element to be added to the dict

**Kind**: global function  
**Returns**: <code>String</code> - Returns the ID in string form  
<a name="removeTask"></a>

## removeTask()
removes task from dictionary and window

**Kind**: global function  
<a name="clear"></a>

## clear()
clears current task from list

**Kind**: global function  
<a name="startTask"></a>

## startTask()
Starts the timer from the current task

**Kind**: global function  
<a name="loadTasks"></a>

## loadTasks()
loads in tasks from local storage into the task lists on the website

**Kind**: global function  
<a name="submitTask"></a>

## submitTask()
Adds task to dictionary and window

**Kind**: global function  
<a name="setCurrTask"></a>

## setCurrTask(taskID)
Loads task into timer based on taskID

**Kind**: global function  

| Param | Type |
| --- | --- |
| taskID | <code>Number</code> | 

<a name="endTask"></a>

## endTask()
Finishes a task and removes it from the task list.

**Kind**: global function  
<a name="startTimer"></a>

## startTimer()
starts timer and animation

**Kind**: global function  
<a name="resumeTimer"></a>

## resumeTimer()
resumes timer and animation

**Kind**: global function  
<a name="stopTimer"></a>

## stopTimer()
stops timer and resets animation

**Kind**: global function  
<a name="resetAnimation"></a>

## resetAnimation()
triggers animation reflow

**Kind**: global function  
<a name="tick"></a>

## tick()
updates timer each second

**Kind**: global function  
<a name="incrementPomo"></a>

## incrementPomo()
updates number of pomos at end of pomo

**Kind**: global function  
<a name="convertToPrettyTime"></a>

## convertToPrettyTime(seconds) ⇒ <code>String</code>
converts seconds to MM:SS

**Kind**: global function  
**Returns**: <code>String</code> - formatted time  

| Param | Type |
| --- | --- |
| seconds | <code>Number</code> | 

<a name="setTime"></a>

## setTime(minutes)
updates timer readout on page

**Kind**: global function  

| Param | Type |
| --- | --- |
| minutes | <code>number</code> | 

<a name="logDistraction"></a>

## logDistraction()
logs a distraction during the work pomo

**Kind**: global function  
Done in 0.81s.
