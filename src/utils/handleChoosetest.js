  import generateNewTest from './generateNewTest';
  
  /**
   * Generates new question for the given test name
   * @param {string} testName
   */
  const handleChoosetest = (testName) => {
    generateNewTest(testName);
  }

  export default handleChoosetest;