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
    this.state = {
      step: "start",
      questionIndex: 0,
      question: {}
    }
  }

  handleButtonClick = () => {
    let questionNum = 1;
    let question = loadQuestion(questionNum);
    this.setState({step:"question", questionIndex: questionNum, question}, () => {
      console.log(this.state);
    });
    
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
        <Question question={this.state.question}/>
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
