import React, { Component } from 'react';
import logo from './logo.svg';
import Button from './Button';
import Title from './Title';
import Question from './Question';
import loadQuestion from './loadQuestion';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.isTheAnswerCorrect = this.isTheAnswerCorrect.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.prepareQuestion = this.prepareQuestion.bind(this);

    this.state = {
      step: "start",
      questionIndex: 0,
      question: {
        data: {},
        correctIndex: '',
        currentQuestionNumber: '',
        isTheAnswerCorrect: false
      },
      stats: []
    }
  }
  prepareQuestion = () => {
    let currentQuestionNumber = this.state.question.currentQuestionNumber;
    let questionNum = currentQuestionNumber ? (currentQuestionNumber + 1) : 1;
    let question = loadQuestion(questionNum);
    question = question ? question : this.state.question.data;
    console.log(questionNum);
    this.setState({
      step:"question", 
      question: { 
        data: question,
        currentQuestionNumber: questionNum,
        correctIndex: question[questionNum].correct
      }
    });
  }

  isTheAnswerCorrect = (index) => {
    const correctIndex = this.state.question.correctIndex;
    const isCorrect = (index === correctIndex);
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
      }, 3000);
    });
    
  }

  handleButtonClick = () => {
    this.prepareQuestion();
  }   

  render() {
    let content;
    if(this.state.step == "start") {
      content = (
        <React.Fragment>
          <Title text="TestMe"/>
          <Button handleClick={this.handleButtonClick}/>
        </React.Fragment>
      );
    } else if(this.state.step == "question"){
      content = (
        <Question 
        questionNum = {this.state.question.currentQuestionNumber}
        question={this.state.question.data} 
        checkAnswer={this.isTheAnswerCorrect} 
        handleAnswer={this.handleAnswer}/>
      );
    }

    return (
      <div className="App">
        <section className="container d-flex flex-column justify-content-center align-items-center">
          {content}
        </section>
      </div>
    );
  }
}

export default App;
