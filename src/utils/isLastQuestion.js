

const isLastQuestion = (currentQuestionNumber, questionsCount) => {
    return currentQuestionNumber === questionsCount ? true : false;
}

export default isLastQuestion;