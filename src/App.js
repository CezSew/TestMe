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
      stats: [],
      questionsCount: ''
    }
  }
  
  prepareQuestion = () => {
    let currentQuestionNumber = this.state.question.currentQuestionNumber;
    let questionNum = currentQuestionNumber ? (currentQuestionNumber + 1) : 1;
    let question = loadQuestion(questionNum);
    let questionsCount = Object.keys(question).length;
    let step;
    if(questionNum > questionsCount) {
      step = "finish";
      questionNum--;
    } else {
      step = "question";
    }
    question = question ? question : this.state.question.data;
    console.log(question);
    this.setState({
      step:step, 
      question: { 
        data: question,
        currentQuestionNumber: questionNum,
        correctIndex: question[questionNum].correct
      },
      questionsCount: questionsCount
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
      }, 1000);
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
    } else if(this.state.step == "finish") {
      let stats = Object.keys(this.state.stats).map((key)=>{
        console.log(this.state.stats[key]);
        return <p key={key}>Pytanie nr {this.state.stats[key][0]}: {this.state.stats[key][1] ? "poprawnie" : "niepoprawnie"}</p>;
      });
      content = (
        <React.Fragment>
          {stats}
        </React.Fragment>
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
