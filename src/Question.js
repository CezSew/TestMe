import React, { Component } from 'react';
import Answer from './Answer';

export default class Question extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const current = this.props.questionNum;
        const question = this.props.question ? this.props.question[current] : {};
        console.log(current);
        return (
            <section className="question">
                <h2>{question.question}</h2>
                <Answer 
                questionNum={this.props.questionNum}
                question={question} 
                checkAnswer={this.props.checkAnswer} 
                handleAnswer={this.props.handleAnswer}/>
            </section>
        )
    }
}