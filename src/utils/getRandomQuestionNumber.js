  /**
   * Get random question number depending on answers given by user
   * @param {object} test
   * @param {number} questionsCount
   * @param {array} stats
   * @param {number} currentQuestionNumber
   * @returns {number}
   */

const getRandomQuestionNumber = (test, questionsCount, stats, currentQuestionNumber) => {
    let randomModeStats = [];
    let questions = {...test};
    delete questions.name;
    Object.keys(questions).forEach(key => {
      key = Number(key);
      let questionStats = stats.filter(stat => {
        return stat[0] === key;
      });
      let timesAsked = questionStats.length;
      let correctAnswers = questionStats.filter(stat => {
        return stat[1] === true;
      }).length;
      let probability = (1 - correctAnswers/timesAsked);
      randomModeStats[key - 1] = {"index":key,"tries":timesAsked,"correct":correctAnswers,"probability":probability};
    });
    let random = Math.random();
    let randomModeStatsCopy = [...randomModeStats]; 
    let counter = 0;
    let randomNumberAcquired = false;
    let questionIndex;
    let countLoop = 0;
    while(!randomNumberAcquired) {
        let probability = randomModeStatsCopy[counter].probability;
        random = Math.random();
        if((random <= probability) && ( counter + 1 ) !== currentQuestionNumber) {
            randomNumberAcquired = true;
            questionIndex = counter + 1;
            break;
        }
        counter++;
        if(counter === randomModeStatsCopy.length) counter = 0;
        if(countLoop === 100) { 
            console.error('Error: Too many iterations in getRandomQuestionNumber. If you got this error, it probably means that only last answer have been incorrect. Error have been handled to proceed with the first available question.');
            randomNumberAcquired = true;
            questionIndex = 1;
            break; 
        }
        countLoop++;
    }
    return questionIndex;
  }

  export default getRandomQuestionNumber;