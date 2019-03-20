import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import * as utils from './utils/index';

import Button from './button/Button';
import Title from './Title';
import Question from './components/Question/Question';
import Choose from './components/Choose/Choose';
import About from './components/About/About';
import Finish from './components/Finish/Finish';
import Load from './components/Load/Load';
import { Route, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);


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
      randomModeStats: [],
      questionsCount: '',
      questionTimeout: 1500,
      options: options,
    }
  }

/**
 * Sets state values dependant on question
 */
  prepareQuestion = () => {
    let question = {...utils.getQuestions(this.state.question.data, this.state.chosenTest)};
    let currentQuestionNumber = this.state.question.currentQuestionNumber;
    let questionsCount = utils.getQuestionsCount(question);
    let questionNum = utils.setQuestionNumber(currentQuestionNumber, questionsCount);
    let step = utils.setStep(questionNum, currentQuestionNumber, questionsCount, this.state.stats);
    let repeat = false;
    let randomModeStats;
    
    if(this.state.repeat || (utils.areSomeAnswersIncorrect(this.state.stats) && utils.isLastQuestion(currentQuestionNumber, questionsCount))) {
      step = 'question';
      questionNum = this.getRandomQuestion(this.state.question.data, questionsCount, this.state.stats, currentQuestionNumber);
      repeat = true;
      this.getRandomQuestionNumber(this.state.question.data, questionsCount, this.state.stats, currentQuestionNumber);
    } 
    // if(this.state.stats.length > 0) this.getRNG(this.state.stats, questionNum, questionsCount);

    this.setState({
      step:step, 
      question: { data: question, currentQuestionNumber: questionNum, correctIndex: question[questionNum].correct},
      questionsCount: questionsCount,
      chosenTest: 'test_test',
      repeat: repeat
    }, function() {
      step === 'finish' ? 
      this.props.history.push('/summary') :
      this.props.history.push('/question');
    });

  }

  getRandomQuestion = (test, questionsCount, stats, currentQuestionNumber) => {
    let randomNumber = Math.floor(Math.random() * questionsCount) + 1;
    randomNumber = (randomNumber === currentQuestionNumber) ? ((randomNumber - 1 === 0) ? randomNumber + 1 : randomNumber - 1 ) : randomNumber;
    randomNumber = randomNumber === 0 ? 1 : randomNumber;
    return randomNumber;
  }

  getRandomQuestionNumber = (test, questionsCount, stats, currentQuestionNumber) => {
    // stats = this.state.randomModeStats.length !== 0 ? this.state.randomModeStats : stats;
    let randomModeStats = [];
    let testQuestionsCount = Object.size(test) - 1;
    let questionsRepeated = stats.length - testQuestionsCount;
    let firstQuestionStats = stats.filter(stat => {
      return stat[0] === 1;
    });
    // let firstQuestionTimesAsked = firstQuestionStats.length;
    // let firstQuestionCorrectAnswers = firstQuestionStats.filter(stat => {
    //   return stat[1] === true;
    // }).length;
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
      let probabilityPercentage = ((1 - correctAnswers/timesAsked) * 100) + '%' ;
      console.log("-----------------");
      console.log("question number " + key);
      console.log("asked times: " + timesAsked);
      console.log("correct: " + correctAnswers);
      console.log("probability: " + probabilityPercentage);
      console.log("-----------------");
      randomModeStats[key] = {"tries":timesAsked,"correct":correctAnswers,"probability":probabilityPercentage};
    });
    // let probabilityPercentage = ((1 - firstQuestionCorrectAnswers/firstQuestionTimesAsked) * 100) + '%' ;
    // let probability = 1 - firstQuestionCorrectAnswers/firstQuestionTimesAsked;
    // let random = Math.random();
    //console.log(randomModeStats);
    this.setState({randomModeStats}, () => console.log(this.state.randomModeStats));
    // if(random < probability) {
      
    // } else {
      
    // }

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
    }, function() {
      this.props.history.push('/question');
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
    return (
        <div className="App">
          <Menu changeAppStep = {this.changeAppStep}/>
          <section className="app__contents container d-flex flex-column justify-content-center align-items-center pt-4">
            <Route path="/question" exact render={ () =>
              <Question 
                utils={{...utils}}
                handleAnswer={this.handleAnswer}
                state={{...this.state}}
              />
              } />
            <Route path="/" exact render={ () => 
              <React.Fragment>
                <Title text="Let's start"/>
                <Button 
                  handleClick={this.handleButtonClick} 
                  text="Begin the test"
                />
              </React.Fragment>
            }/>
            <Route path="/load-questions" exact render={ () => 
              <Load />
            }/>
            <Route path="/choose-test" exact render={ () => 
              <Choose 
                availableTests={{...this.state.options}} 
                handleChoosetest={this.generateNewTest}
              />
            }/>
            <Route path="/about" exact render={ () => 
              <About />
            }/>
            <Route path="/summary" exact render={ () => 
              <Finish 
                stats={[...this.state.stats]} 
              />
            } />
          </section>
        </div>
    );
  }
}

export default withRouter(App);
