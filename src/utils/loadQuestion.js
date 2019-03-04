
const loadQuestion = (testName = "user-test") => {
    let testObject;
    if(testName !== "user-test") {
        testObject = require(`../Tests/${testName}.json`);
    } else {
        testObject = JSON.parse(localStorage.getItem('user-test'));
    }
    return testObject;
}

export default loadQuestion;