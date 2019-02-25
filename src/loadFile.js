import setLocalStorage from './setLocalStorage';

const fileLoadModule = () => {
    const holder = document.getElementById('holder');
    const state = document.getElementById('status');
    if (typeof window.FileReader === 'undefined') {
        state.className = 'fail';
    } else {
        state.className = 'success';
    }
    holder.ondragover = function() {
        this.className = 'hover';
        return false;
    };
    holder.ondragend = function() {
        this.className = '';
        return false;
    };
    holder.ondrop = function(e) {
        this.className = '';
        e.preventDefault();
        let file = e.dataTransfer.files[0],
        reader = new FileReader();
        reader.onload = function(event) {
            let fileContents = event.target.result.split(/\r?\n/);
            let test = parseIntoObject(fileContents);
            test.name = 'user-test';
            setLocalStorage(test, 'user-test');
        };
        reader.readAsText(file);
        return false;
    };
}

const parseIntoObject = (file) => {
    let test = {};
    let counter = 0;
    file.forEach((item, index) => {
        const questionIndex = getQuestionIndex(index);
        counter = correctCounter(counter);
        if(item) {
            if (index%5 === 0 || index === 0) {
                test[questionIndex] = objectDefine(test[questionIndex]);
                test[questionIndex].question = item;
            } else {
                test[questionIndex] = objectDefine(test[questionIndex]);
                test[questionIndex].answers = objectDefine(test[questionIndex].answers);
                test[questionIndex].answers[counter] = item;
                if(isCorrect(item)) {
                    test[questionIndex].answers[counter] = trimAnswer(item);
                    test[questionIndex].correct = String(counter);
                } else {
                    test[questionIndex].answers[counter] = item;
                };
            }
            counter++;
        }
        
    });
    return test;
}

const getQuestionIndex = (index) => {
    let questionIndex = Math.floor(index / 5) + 1;
    return questionIndex;
}

const correctCounter = (counter) => {
    counter = (counter === 5) ? 0 : counter;
    return counter;
}

const isCorrect = (answer) => {
    let correct = answer[0] === "+" ? true : false;
    return correct;
}

const trimAnswer = (answer) => {
    answer = answer.substr(1);
    return answer;
}

const objectDefine = (object) => {
    return object = object || {};
} 

export default fileLoadModule;