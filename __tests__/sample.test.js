const addNum = require('../pipeline_tests/randomtest');

describe('addNum tests', () => {
    test('Adds 4 and 2 to be equal to 6', () => {
        expect(addNum(4,2)).toBe(6);
    });
});
