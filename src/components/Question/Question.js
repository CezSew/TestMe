import React, { Component } from 'react';
import Answer from './Answer/Answer';

export default class Question extends Component {
    render () {
        const current = this.props.questionNum;
        const question = this.props.question ? this.props.question[current] : {};
        return (
            <section className="question">
                <h2>{question.question}</h2>
                <Answer 
                getCorrectAnswerIndex={this.props.getCorrectAnswerIndex}
                questionNum={this.props.questionNum}
                question={question} 
                state={this.props.state}
                isTheAnswerCorrect={this.props.isTheAnswerCorrect} 
                handleAnswer={this.props.handleAnswer}/>
            </section>
        )
    }
}