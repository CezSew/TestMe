import React, { Component } from 'react';

export default class Answer extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.assignClassName = this.assignClassName.bind(this);
        this.blockAnswers = this.blockAnswers.bind(this);
    }
    handleClick = (index, that) => {
        let isAnswerCorrect = this.props.checkAnswer(index);
        let elClass = isAnswerCorrect ? "correct" : "incorrect";
        this.assignClassName(that, elClass);
        this.blockAnswers();
        this.props.handleAnswer(isAnswerCorrect);
    }
    blockAnswers() {
        let elements = document.getElementsByClassName('question__answer');
        Object.keys(elements).map((key)=> {
            elements[key].disabled = true;
        });
    }
    assignClassName(el, elClass) {
        el.classList.add(elClass);
    }
    render () {
        const question = this.props.question;
        const answers = question.answers;
        let answersElement = Object.keys(answers).map((key)=>{
            return <button className="question__answer " onClick={(e)=>{this.handleClick(key, e.target)}} key={key}>{answers[key]}</button>;
        });
        return (
            <div className="question__answers mt-5 d-flex flex-column align-items-start">
                {answersElement}
            </div>
        )
    }
}