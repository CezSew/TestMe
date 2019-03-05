  import generateNewQuestion from './generateNewQuestion';
  
  /**
   * Generates new question for the given test name
   * @param {string} testName
   */
  const handleChoosetest = (testName) => {
    generateNewQuestion(testName);
  }

  export default handleChoosetest;