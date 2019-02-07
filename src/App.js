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
    this.state = {
      step: "start",
      questionIndex: 0,
      question: {},
      correctAnswerIndex: ''
    }
  }

  isTheAnswerCorrect = (index) => {
    const correctIndex = this.state.correctAnswerIndex;
    return index === correctIndex; 
  }

  handleButtonClick = () => {
    let questionNum = 1;
    let question = loadQuestion(questionNum);
    this.setState({step:"question", questionIndex: questionNum, question, correctAnswerIndex: question[questionNum].correct});
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
        <Question question={this.state.question} checkAnswer={this.isTheAnswerCorrect}/>
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
