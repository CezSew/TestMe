import React from 'react';

const Answers = (props) => {
    const handleClick = (index, that) => {
        let isAnswerCorrect = props.utils.isTheAnswerCorrect(index, props.state);
        let elClass = isAnswerCorrect ? "correct" : "incorrect";
        if(!isAnswerCorrect) showCorrect(props.utils.getCorrectAnswerIndex(props.state) - 1);
        assignClassName(that, elClass);
        blockAnswers();
        props.handleAnswer(isAnswerCorrect);
    }
    const showCorrect = (index) => {
        let elements = document.getElementsByClassName('question__answer');
        elements[index].classList.add('missed-correct');
    }
    const blockAnswers = () => {
        let elements = document.getElementsByClassName('question__answer');
        Object.keys(elements).map((key)=> {
            return elements[key].disabled = true;
        });
    }
    const assignClassName = (el, elClass) => {
        el.classList.add(elClass);
    }
    let question = props.question;
    let answers = question.answers;
    let answersElement = Object.keys(answers).map((key)=>{
        return <button className="question__answer " onClick={(e)=>{handleClick(key, e.target)}} key={props.questionNum + ':' + key}>{answers[key]}</button>;
    });
    return (
        <div className="question__answers mt-5 d-flex flex-column align-items-start">
            {answersElement}
        </div>
    )
}

export default Answers;