/**
 * Returns new value of questionNumber depending on count of all questions in the test. Prevents out of bounds of questions array
 * @param {number} questionNumber
 * @param {number} questionsCount
 * @returns {number} Returns number of the question
 */
const setQuestionNumber = (questionNumber, questionsCount) => {
    questionNumber = questionNumber + 1 > questionsCount ? +questionNumber : +questionNumber + 1;
    return questionNumber;
}

export default setQuestionNumber;