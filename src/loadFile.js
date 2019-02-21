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
            parseIntoObject(fileContents);
        };
        reader.readAsText(file);
        return false;
    };
    
}

const parseIntoObject = (file) => {
    let test = {};
    let counter = 0;
    test.questions = [];
    file.forEach((item, index) => {
        const questionIndex = getQuestionIndex(index);
        counter = correctCounter(counter);
        test.questions[questionIndex] = objectDefine(test.questions[questionIndex]);
        if (index%5 === 0 || index === 0) {
            test.questions[questionIndex].question = item;
        } else {
            test.questions[questionIndex].answers = objectDefine(test.questions[questionIndex].answers);
            if(isCorrect(item)) {
                test.questions[questionIndex].answers[counter] = trimAnswer(item);
                test.questions[questionIndex].correct = counter;
            } else {
                test.questions[questionIndex].answers[counter] = item;
            };
        } 
        counter++;
    });
}

const getQuestionIndex = (index) => {
    let questionIndex = Math.floor(index / 5);
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
    answer.split(1, answer.length);
    return answer;
}

const objectDefine = (object) => {
    return object = object || {};
} 

export default fileLoadModule;