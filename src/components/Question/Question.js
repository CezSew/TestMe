import React, { Component } from 'react';
import Answer from './Answer/Answer';
import { Route, withRouter } from 'react-router-dom';

class Question extends Component {
    render () {
        const current = this.props.questionNum;
        const question = this.props.question ? this.props.question[current] : {};
        let renderContents = question ? 
        (   
        <React.Fragment>
            <h2>{question.question}</h2>
            <Answer 
            getCorrectAnswerIndex={this.props.getCorrectAnswerIndex}
            questionNum={this.props.questionNum}
            question={question} 
            state={this.props.state}
            isTheAnswerCorrect={this.props.isTheAnswerCorrect} 
            handleAnswer={this.props.handleAnswer}/>
            {this.props.state.repeat ? (<p className="random">Random questions enabled</p>) : '' }
        </React.Fragment>) :
        <p>Sorry, no question has been loaded!</p>;
        return (
            <section className="question">
               {renderContents}
            </section>
        )
    }
}

export default withRouter(Question);