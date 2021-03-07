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
<dt><a href="#addNum">addNum(num1, num2)</a> ⇒ <code>Number</code></dt>
<dd><p>Adds two numbers together</p>
</dd>
<dt><a href="#subNum">subNum(num1, num2)</a> ⇒ <code>Number</code></dt>
<dd><p>Subtracts two numbers</p>
</dd>
<dt><a href="#multNum">multNum(num1, num2)</a> ⇒ <code>Number</code></dt>
<dd><p>Multiplies two numbers</p>
</dd>
<dt><a href="#divNum">divNum(num1, num2)</a> ⇒ <code>Number</code></dt>
<dd><p>Divides two numbers</p>
</dd>
<dt><a href="#checkSettings">checkSettings()</a></dt>
<dd><p>Checks if settings exist in local storage. If not, creates defaults.</p>
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
<dt><a href="#loadTasks">loadTasks()</a></dt>
<dd><p>loads in tasks from local storage into the task lists on the website</p>
</dd>
<dt><a href="#submitTask">submitTask()</a></dt>
<dd><p>Adds task to dictionary and window</p>
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

<a name="addNum"></a>

## addNum(num1, num2) ⇒ <code>Number</code>
Adds two numbers together

**Kind**: global function  
**Returns**: <code>Number</code> - sum of the two numbers  

| Param | Type |
| --- | --- |
| num1 | <code>Number</code> | 
| num2 | <code>Number</code> | 

<a name="subNum"></a>

## subNum(num1, num2) ⇒ <code>Number</code>
Subtracts two numbers

**Kind**: global function  
**Returns**: <code>Number</code> - difference of the two numbers  

| Param | Type |
| --- | --- |
| num1 | <code>Number</code> | 
| num2 | <code>Number</code> | 

<a name="multNum"></a>

## multNum(num1, num2) ⇒ <code>Number</code>
Multiplies two numbers

**Kind**: global function  
**Returns**: <code>Number</code> - product of the two numbers  

| Param | Type |
| --- | --- |
| num1 | <code>Number</code> | 
| num2 | <code>Number</code> | 

<a name="divNum"></a>

## divNum(num1, num2) ⇒ <code>Number</code>
Divides two numbers

**Kind**: global function  
**Returns**: <code>Number</code> - quotient of the two numbers  

| Param | Type |
| --- | --- |
| num1 | <code>Number</code> | 
| num2 | <code>Number</code> | 

<a name="checkSettings"></a>

## checkSettings()
Checks if settings exist in local storage. If not, creates defaults.

**Kind**: global function  
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
<a name="loadTasks"></a>

## loadTasks()
loads in tasks from local storage into the task lists on the website

**Kind**: global function  
<a name="submitTask"></a>

## submitTask()
Adds task to dictionary and window

**Kind**: global function  
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

Done in 0.92s.
