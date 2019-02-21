import React from 'react';
import Button from './Button';
import Title from './Title';
import Question from './Question';
import TestChoose from './TestChoose';
import About from './About';
import Finish from './Finish';
import TestLoad from './TestLoad';

const getRenderContents = (state, getCorrectAnswerIndex, isTheAnswerCorrect, handleAnswer, handleButtonClick, handleChoosetest) => {
    let content;
    if(state.step === "start") {
        content = (
          <React.Fragment>
            <Title text="TestMe"/>
            <Button handleClick={handleButtonClick}/>
          </React.Fragment>
        );
      } else if(state.step === "question"){
        content = (
          <Question 
          getCorrectAnswerIndex = {getCorrectAnswerIndex}
          questionNum = {state.question.currentQuestionNumber}
          question={state.question.data} 
          checkAnswer={isTheAnswerCorrect} 
          handleAnswer={handleAnswer}/>
        );
      } else if(state.step === "finish") {
        content = (
            <Finish stats={state.stats} />
        );
      } else if(state.step === "choose") {
        content = (
          <TestChoose availableTests={state.options} handleChoosetest={handleChoosetest}/>
        );
      } else if(state.step === "about") {
          content = (
            <About />
          );
      } else if(state.step === "load") {
        content = (
          <TestLoad />
        );
    }

      return content;
}

export default getRenderContents;