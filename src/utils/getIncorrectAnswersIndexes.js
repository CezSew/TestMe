
const getIncorrectAnswersIndexes = (stats) => {
    let incorrectAnswers = stats.filter((item) => {
        return !item[1];
    });
    let incorrectAnswersIndexes = incorrectAnswers.map(item => {
        return item[0];
    });
    return incorrectAnswersIndexes;
}

export default getIncorrectAnswersIndexes;