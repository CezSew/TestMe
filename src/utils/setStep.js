import isLastQuestion from './isLastQuestion';
import areSomeAnswersIncorrect from './areSomeAnswersIncorrect';

/**
 * Returns value of step
 * @param {number} questionNumber
 * @param {number} currentQuestionNumber
 * @returns {string} If questionNumber equals currentQuestionNumber set step to "finish" else "question"
 */
const setStep = (questionNumber, currentQuestionNumber, questionsCount, stats) => {
    if(isLastQuestion(currentQuestionNumber, questionsCount) && areSomeAnswersIncorrect(stats)) {
        
    }
    let step = questionNumber === currentQuestionNumber ? "finish" : "question";
    return step;
}

export default setStep;