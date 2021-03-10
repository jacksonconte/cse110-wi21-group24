const { openNav, closeNav, openTimer, openTasks, openAnalytics, openSettings, 
    setCurrTask, endTask, startTimer, resumeTimer, stopTimer, resetAnimation, 
    tick, incrementPomo, convertToPrettyTime, setTime, logDistraction, setId, 
    loadTasks, loadAnalytics, displayAnalytics, setLabel, checkSettings, 
    submitSettings, resetSettings, setSettings, setDarkMode, setAnalytics 
} = require('../source/scripts/script');


describe('pretty time tests', () => {
    test('tests hour is formatted as 60:00', () => {
        expect(convertToPrettyTime(3600)).toBe('60:00');
    });
});
describe('timer button tests', () => {
    test('starts and ends timer', () => {
        // startTimer();
    });
});