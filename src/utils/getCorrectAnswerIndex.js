/**
 * Returns the correct answer index
 * @returns {number} Returns index of the correct answer
 */
const getCorrectAnswerIndex = (state) => {
    return state.question.correctIndex;
}

export default getCorrectAnswerIndex;
