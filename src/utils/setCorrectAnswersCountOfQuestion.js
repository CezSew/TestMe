/**
 * Returns how many times question has been answered correctly
 * @param {number} numberOfCorrectAnswers
 * @param {boolean} isCorrect
 * @returns {number} Returns the count of correct answers
 */
const setCorrectAnswersCountOfQuestion = (numberOfCorrectAnswers, isCorrect) => {
    let count = isCorrect ? numberOfCorrectAnswers + 1 : numberOfCorrectAnswers;
    return count;
}

export default setCorrectAnswersCountOfQuestion;