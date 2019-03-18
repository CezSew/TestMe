import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({handleAnswer, state, utils}) => {
    const handleClick = (index, that) => {
        let isAnswerCorrect = utils.isTheAnswerCorrect(index, state);
        let elClass = isAnswerCorrect ? "correct" : "incorrect";
        if(!isAnswerCorrect) showCorrect(utils.getCorrectAnswerIndex(state) - 1);
        assignClassName(that, elClass);
        blockAnswers();
        handleAnswer(isAnswerCorrect);
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
    let current = state.question.currentQuestionNumber;
    let question = state.question.data ? state.question.data[current] : {};
    let answers = question.answers;
    let answersElement = Object.keys(answers).map((key)=>{
        return <button className="question__answer " onClick={(e)=>{handleClick(key, e.target)}} key={current + ':' + key}>{answers[key]}</button>;
    });
    return (
        <div className="question__answers mt-5 d-flex flex-column align-items-start">
            {answersElement}
        </div>
    )
}

Answers.propTypes = {
    state: PropTypes.object.isRequired,
    handleAnswer: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired
};


export default Answers;