import React, { Component } from 'react';
import Button from './Button';
import Title from './Title';
import Question from './Question';
import loadQuestion from './loadQuestion';
import Menu from './Menu';
import TestChoose from './TestChoose';
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
      questionsCount: ''
    }
  }

  prepareQuestion = () => {
    let question = this.getQuestions();
    let currentQuestionNumber = this.state.question.currentQuestionNumber;
    let questionsCount = Object.keys(question).length;
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
      questionTimeout: 1500
    });
  }

  setStep = (questionNumber, currentQuestionNumber) => {
    let step = questionNumber === currentQuestionNumber ? "finish" : "question";
    return step;
  }

  changeAppStep = (step) => {
    this.setState({step:step});
  }

  getQuestions = () => {
    return Object.entries(this.state.question.data).length !== 0 ? this.state.question.data : loadQuestion();
  }

  setQuestionNumber = (questionNumber, questionsCount) => {
    questionNumber = questionNumber + 1 > questionsCount ? +questionNumber : +questionNumber + 1;
    return questionNumber;
  }

  isTheAnswerCorrect = (index) => {
    let correctIndex = this.getCorrectAnswerIndex();
    let isCorrect = (index === correctIndex);
    return isCorrect; 
  }

  handleAnswer = (isCorrect) => {
    let currentNumber = this.state.question.currentQuestionNumber;
    this.setState({
      stats: [...this.state.stats, [currentNumber,
        isCorrect]]
    }, () => {
      setTimeout(()=> {
        this.prepareQuestion();
      }, this.state.questionTimeout);
    });
  }

  handleButtonClick = () => {
    this.prepareQuestion();
  }   

  getCorrectAnswerIndex() {
      return this.state.question.correctIndex;
  }

  render() {
    let content;
    if(this.state.step === "start") {
      content = (
        <React.Fragment>
          <Title text="TestMe"/>
          <Button handleClick={this.handleButtonClick}/>
        </React.Fragment>
      );
    } else if(this.state.step === "question"){
      content = (
        <Question 
        getCorrectAnswerIndex = {this.getCorrectAnswerIndex}
        questionNum = {this.state.question.currentQuestionNumber}
        question={this.state.question.data} 
        checkAnswer={this.isTheAnswerCorrect} 
        handleAnswer={this.handleAnswer}/>
      );
    } else if(this.state.step === "finish") {
      let stats = Object.keys(this.state.stats).map((key)=>{
        return <p key={key}>Pytanie nr {this.state.stats[key][0]}: {this.state.stats[key][1] ? "poprawnie" : "niepoprawnie"}</p>;
      });
      content = (
        <React.Fragment>
          {stats}
        </React.Fragment>
      );
    } else if(this.state.step === "choose") {
      content = (
        <TestChoose />
      );
    }

    return (
      <div className="App">
        <Menu changeAppStep = {this.changeAppStep}/>
        <section className="container d-flex flex-column justify-content-center align-items-center">
          {content}
        </section>
      </div>
    );
  }
}

export default App;
