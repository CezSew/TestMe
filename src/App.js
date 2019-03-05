import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import * as utils from './utils/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.prepareQuestion = this.prepareQuestion.bind(this);
    this.changeAppStep = this.changeAppStep.bind(this);
    this.handleChoosetest = this.handleChoosetest.bind(this);
    this.generateNewQuestion = this.generateNewQuestion.bind(this);
    this.getCorrectAnswersCountOfQuestion = this.getCorrectAnswersCountOfQuestion.bind(this);
    this.setCorrectAnswersCountOfQuestion = this.setCorrectAnswersCountOfQuestion.bind(this);

    const options = utils.getOptions();

    this.state = {
      step: "start",
      questionIndex: 0,
      question: {
        data: {},
        correctIndex: '',
        currentQuestionNumber: '',
        isTheAnswerCorrect: false
      },
      stats: [],
      questionsCount: '',
      questionTimeout: 1500,
      options: options
    }
  }

/**
 * Sets state values dependant on question
 */
  prepareQuestion = () => {
    let question = utils.getQuestions(this.state.question.data, this.state.chosenTest);
    let currentQuestionNumber = this.state.question.currentQuestionNumber;
    let questionsCount = utils.getQuestionsCount(question);
    let questionNum = utils.setQuestionNumber(currentQuestionNumber, questionsCount);
    let step = utils.setStep(questionNum, currentQuestionNumber);

    this.setState({
      step:step, 
      question: { 
        data: question,
        currentQuestionNumber: questionNum,
        correctIndex: question[questionNum].correct
      },
      questionsCount: questionsCount,
      chosenTest: 'test_test'
    });
  }

  /**
   * Sets new state of application step
   * @param {string}
   */
  changeAppStep = (step) => {
    this.setState({step:step});
  }





  /**
   * Generates new question for the given test name
   * @param {string} testName
   */
  handleChoosetest = (testName) => {
    this.generateNewQuestion(testName);
  }

  /**
   * Sets new state values regarding question
   * @param {string} testName
   */
  generateNewQuestion = (testName) => {
    let question = utils.loadQuestion(testName);
    let questionsCount = Object.keys(question).length;
    this.setState({
      step:'question', 
      question: { 
        data: question,
        currentQuestionNumber: 1,
        correctIndex: question[1].correct
      },
      questionsCount: questionsCount,
      chosenTest: testName
    });
  } 

  /**
   * Sets a new state. After new state has been set, trigger new question render, after timeout.
   * @param {boolean} isCorrect
   */
  handleAnswer = (isCorrect) => {
    let currentNumber = this.state.question.currentQuestionNumber;
    let correctAnswersCount = this.getCorrectAnswersCountOfQuestion(currentNumber - 1);
    this.setState({
      stats: [...this.state.stats, [currentNumber, isCorrect, this.setCorrectAnswersCountOfQuestion(correctAnswersCount, isCorrect)]]
    }, () => {
      setTimeout(()=> {
        this.prepareQuestion();
      }, this.state.questionTimeout);
    });
  }

  /**
   * Returns the number of times the question was answered correctly
   * @param {number} index
   * @returns {number} Returns the number of times the question was answered correctly
   */
  getCorrectAnswersCountOfQuestion = (index) => {
    if(index >= 0 && this.state.stats[index]) {
      return this.state.stats[index][2];
    } else {
      return 0;
    }
  }

  /**
   * Returns how many times question has been answered correctly
   * @param {number} numberOfCorrectAnswers
   * @param {boolean} isCorrect
   * @returns {number} Returns the count of correct answers
   */
  setCorrectAnswersCountOfQuestion = (numberOfCorrectAnswers, isCorrect) => {
    let count = isCorrect ? numberOfCorrectAnswers + 1 : numberOfCorrectAnswers;
    return count;
  }

  /**
   * Handle click of the main button, displaying on the first view
   */
  handleButtonClick = () => {
    this.prepareQuestion();
  }   


  render() {
    let renderContents = utils.getRenderContents(this.state, utils.getCorrectAnswerIndex, utils.isTheAnswerCorrect, this.handleAnswer, this.handleButtonClick, this.handleChoosetest );
  
    return (
      <div className="App">
        <Menu changeAppStep = {this.changeAppStep}/>
        <section className="app__contents container d-flex flex-column justify-content-center align-items-center">
          {renderContents}
        </section>
      </div>
    );
  }
}

export default App;
