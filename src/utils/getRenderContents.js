import React from 'react';
import Button from '../button/Button';
import Title from '../Title';
import Question from '../components/Question/Question';
import Choose from '../components/Choose/Choose';
import About from '../components/About/About';
import Finish from '../components/Finish/Finish';
import Load from '../components/Load/Load';


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
          isTheAnswerCorrect={isTheAnswerCorrect} 
          handleAnswer={handleAnswer}
          state={state}/>
        );
      } else if(state.step === "finish") {
        content = (
            <Finish stats={state.stats} />
        );
      } else if(state.step === "choose") {
        content = (
          <Choose availableTests={state.options} handleChoosetest={handleChoosetest}/>
        );
      } else if(state.step === "about") {
          content = (
            <About />
          );
      } else if(state.step === "load") {
        content = (
          <Load />
        );
    }

      return content;
}

export default getRenderContents;