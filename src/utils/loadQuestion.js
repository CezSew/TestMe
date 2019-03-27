
const loadQuestion = (testName = "user-test") => {
    let testObject, testObjectLocalStorage;
    testObjectLocalStorage = JSON.parse(localStorage.getItem('user-test'));
    if(testName !== "user-test") {
        testObject = require(`../Tests/${testName}.json`);
    } else if(testObjectLocalStorage) {
        testObject = testObjectLocalStorage;
    } else {
        testObject = require(`../Tests/js_test.json`);
    }
    return testObject;
}

export default loadQuestion;