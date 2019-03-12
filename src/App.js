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
    this.generateNewTest= this.generateNewTest.bind(this);
    this.getRNG  = this.getRNG.bind(this);
    this.getRandomQuestion = this.getRandomQuestion.bind(this);

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
      options: options,
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
    let step = utils.setStep(questionNum, currentQuestionNumber, questionsCount, this.state.stats);
    let repeat = false;
    if(this.state.repeat || (utils.areSomeAnswersIncorrect(this.state.stats) && utils.isLastQuestion(currentQuestionNumber, questionsCount))) {
      step = 'question';
      questionNum = this.getRandomQuestion(this.state.question.data, questionsCount, this.state.stats, currentQuestionNumber);
      repeat = true;
    } 
    // if(this.state.stats.length > 0) this.getRNG(this.state.stats, questionNum, questionsCount);

    this.setState({
      step:step, 
      question: { data: question, currentQuestionNumber: questionNum, correctIndex: question[questionNum].correct},
      questionsCount: questionsCount,
      chosenTest: 'test_test',
      repeat: repeat
    });
  }

  getRandomQuestion = (test, questionsCount, stats, currentQuestionNumber) => {
    let randomNumber = Math.floor(Math.random() * questionsCount) + 1;
    randomNumber = (randomNumber === currentQuestionNumber) ? ((randomNumber - 1 === 0) ? randomNumber + 1 : randomNumber - 1 ) : randomNumber;
    randomNumber = randomNumber === 0 ? 1 : randomNumber;
    return randomNumber;
  }

  getRNG = (stats, questionNum, questionsCount) => {
    // console.log('test');
    // console.log(questionNum);
    // if(questionNum === questionsCount) console.log('last question');
    // if last question
    //   if more than 2 answers were incorrect dont change step to finish, 
  }

  /**
   * Sets new state of application step
   * @param {string}
   */
  changeAppStep = (step) => {
    this.setState({step:step});
  }

  /**
   * Sets new state values regarding question
   * @param {string} testName
   */
  generateNewTest = (testName) => {
    let question = utils.loadQuestion(testName);
    let questionsCount = Object.keys(question).length;
    this.setState({
      step:'question', 
      question: { data: question, currentQuestionNumber: 1, correctIndex: question[1].correct},
      questionsCount: questionsCount,
      chosenTest: testName,
      stats: [],
      repeat: false
    });
  } 

  /**
   * Sets a new state. After new state has been set, trigger new question render, after timeout.
   * @param {boolean} isCorrect
   */
  handleAnswer = (isCorrect) => {
    let currentNumber = this.state.question.currentQuestionNumber;
    let correctAnswersCount = utils.getCorrectAnswersCountOfQuestion(currentNumber - 1, this.state.stats);
    this.setState({
      stats: [...this.state.stats, [currentNumber, isCorrect, utils.setCorrectAnswersCountOfQuestion(correctAnswersCount, isCorrect)]]
    }, () => {
      setTimeout(()=> {
        this.prepareQuestion();
      }, this.state.questionTimeout);
    });
  }

  /**
   * Handle click of the main button, displaying on the first view
   */
  handleButtonClick = () => {
    this.prepareQuestion();
  }   

  render() {
    let renderContents = utils.getRenderContents(this.state, utils.getCorrectAnswerIndex, utils.isTheAnswerCorrect, this.handleAnswer, this.handleButtonClick, this.generateNewTest );
    return (
      <div className="App">
        <Menu changeAppStep = {this.changeAppStep}/>
        <section className="app__contents container d-flex flex-column justify-content-center align-items-center pt-4">
          {renderContents}
        </section>
      </div>
    );
  }
}

export default App;
