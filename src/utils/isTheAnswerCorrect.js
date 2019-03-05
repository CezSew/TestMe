import getCorrectAnswerIndex from './getCorrectAnswerIndex';

/** 
 * Returns boolean value depending on correctness of the answer 
 * @param {number} index
 * @returns {boolean} Boolean value depending on correctness of the answer of a given index
 */ 
const isTheAnswerCorrect = (index, state) => {
    let correctIndex = getCorrectAnswerIndex(state);
    let isCorrect = (index === correctIndex);
    return isCorrect; 
}
export default isTheAnswerCorrect;