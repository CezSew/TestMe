import React, { Component } from 'react';
import Answer from './Answer';

export default class Question extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const question = this.props.question[1];
        return (
            <section className="question">
                <h2>{question.question}</h2>
                <Answer question={question} checkAnswer={this.props.checkAnswer}/>
            </section>
        )
    }
}