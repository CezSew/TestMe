import getIncorrectAnswersIndexes from './getIncorrectAnswersIndexes';

const areSomeAnswersIncorrect = (stats) => {
    let incorrectAnswersIndexes = getIncorrectAnswersIndexes(stats);
    return !!incorrectAnswersIndexes.length;
}

export default areSomeAnswersIncorrect;