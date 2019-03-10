/**
 * Returns the number of times the question was answered correctly
 * @param {number} index
 * @param {array} stats
 * @returns {number} Returns the number of times the question was answered correctly
 */
const getCorrectAnswersCountOfQuestion = (index, stats) => {
    if(index >= 0 && stats[index]) {
        return stats[index][2];
    } else {
        return 0;
    }
}

export default getCorrectAnswersCountOfQuestion;