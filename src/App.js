import React, { Component } from 'react';
import loadQuestion from './loadQuestion';
import getRenderContents from './getRenderContents';
import getOptions from './getOptions';
import Menu from './Menu';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.isTheAnswerCorrect = this.isTheAnswerCorrect.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.prepareQuestion = this.prepareQuestion.bind(this);
    this.setStep = this.setStep.bind(this);
    this.setQuestionNumber = this.setQuestionNumber.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getCorrectAnswerIndex = this.getCorrectAnswerIndex.bind(this);
    this.changeAppStep = this.changeAppStep.bind(this);
    this.handleChoosetest = this.handleChoosetest.bind(this);
    this.generateNewQuestion = this.generateNewQuestion.bind(this);
    this.getQuestionsCount = this.getQuestionsCount.bind(this);
    this.getCorrectAnswersCountOfQuestion = this.getCorrectAnswersCountOfQuestion.bind(this);
    this.setCorrectAnswersCountOfQuestion = this.setCorrectAnswersCountOfQuestion.bind(this);

    const options = getOptions();

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
    let question = this.getQuestions();
    let currentQuestionNumber = this.state.question.currentQuestionNumber;
    let questionsCount = this.getQuestionsCount(question);
    let questionNum = this.setQuestionNumber(currentQuestionNumber, questionsCount);
    let step = this.setStep(questionNum, currentQuestionNumber);

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
   * Returns count of questions in the current test
   * @param {object} question
   * @returns {number} Set count of questions depending on existance of question.name
   */
  getQuestionsCount = (question) => {
    let length;
    if(question.name) {
      length = Object.keys(question).length - 1;
    } else {
      length = Object.keys(question).length;
    }
    
    return length;
  }

  /**
   * Returns value of step
   * @param {number} questionNumber
   * @param {number} currentQuestionNumber
   * @returns {string} If questionNumber equals currentQuestionNumber set step to "finish" else "question"
   */
  setStep = (questionNumber, currentQuestionNumber) => {
    let step = questionNumber === currentQuestionNumber ? "finish" : "question";
    return step;
  }

  /**
   * Sets new state of application step
   * @param {string}
   */
  changeAppStep = (step) => {
    this.setState({step:step});
  }

  /**
   * Returns question data depending on existance of current state question data
   * @returns {object}
   */
  getQuestions = () => {
    return Object.entries(this.state.question.data).length !== 0 ? this.state.question.data : loadQuestion(this.state.chosenTest);
  }

  /**
   * Returns new value of questionNumber depending on count of all questions in the test. Prevents out of bounds of questions array
   * @param {number} questionNumber
   * @param {number} questionsCount
   * @returns {number} Returns number of the question
   */
  setQuestionNumber = (questionNumber, questionsCount) => {
    questionNumber = questionNumber + 1 > questionsCount ? +questionNumber : +questionNumber + 1;
    return questionNumber;
  }

  /** 
   * Returns boolean value depending on correctness of the answer 
   * @param {number} index
   * @returns {boolean} Boolean value depending on correctness of the answer of a given index
   */ 
  isTheAnswerCorrect = (index) => {
    let correctIndex = this.getCorrectAnswerIndex();
    let isCorrect = (index === correctIndex);
    return isCorrect; 
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
    let question = loadQuestion(testName);
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

  /**
   * Returns the correct answer index
   * @returns {number} Returns index of the correct answer
   */
  getCorrectAnswerIndex() {
      return this.state.question.correctIndex;
  }

  render() {
    let renderContents = getRenderContents(this.state, this.getCorrectAnswerIndex, this.isTheAnswerCorrect, this.handleAnswer, this.handleButtonClick, this.handleChoosetest );
  
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
