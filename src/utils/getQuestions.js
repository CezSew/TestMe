import loadQuestion from './loadQuestion';
/**
 * Returns question data depending on existance of current state question data
 * @returns {object}
 */
const getQuestions = (data, chosenTest) => {
    return Object.entries(data).length !== 0 ? data : loadQuestion(chosenTest);
}

export default getQuestions;