
const loadQuestion = (testName = 'test_test') => {
    const json = require(`./Tests/${testName}.json`);
    return json;
}

export default loadQuestion;