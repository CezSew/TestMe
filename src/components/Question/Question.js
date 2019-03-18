import React from 'react';
import Answers from './Answers/Answers';
import { withRouter } from 'react-router-dom';
import Title from '../../Title';
import Error from '../Error/Error';
import PropTypes from 'prop-types';


const Question = (props) => {
    let current = props.state.question.currentQuestionNumber;
    let question = props.state.question.data ? props.state.question.data[current] : {};
    let renderContents = question ? 
    (<React.Fragment>
        <Title text={question.question}/>
        <Answers {...props} />
        {props.state.repeat ? (<p className="random">Random questions enabled</p>) : '' }
    </React.Fragment>) :
    <Error error="Sorry, it seems there are no questions loaded!" />;
    return (
        <section className="question">
           {renderContents}
        </section>
    )
}

Question.propTypes = {
    state: PropTypes.object.isRequired
};

export default withRouter(Question);