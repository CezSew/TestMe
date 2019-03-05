/**
 * Returns count of questions in the current test
 * @param {object} question
 * @returns {number} Set count of questions depending on existance of question.name
 */

const getQuestionsCount = (question) => {
    let length;
    if(question.name) {
        length = Object.keys(question).length - 1;
    } else {
        length = Object.keys(question).length;
    }

    return length;
}

export default getQuestionsCount;