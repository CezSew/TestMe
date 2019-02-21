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
    let objectFileContents = {... file};
    let test = {};
    let counter = 0;
    test.questions = [];
    test.questions.answers = [];
    file.forEach((item, index) => {
        const questionIndex = getQuestionIndex(index);
        counter = correctCounter(counter);
        console.log(counter);
        test.questions[questionIndex] = test.questions[questionIndex] ? test.questions[questionIndex] : {};
        if (index%5 === 0 || index === 0) {
            test.questions[questionIndex].question = item;
        } else {
            test.questions[questionIndex].answers = test.questions[questionIndex].answers ? test.questions[questionIndex].answers : [];
            test.questions[questionIndex].answers[counter] = item;
        } 
        counter++;
    });

    console.log(test);
}

const getQuestionIndex = (index) => {
    let questionIndex = Math.floor(index / 5);
    return questionIndex;
}

const correctCounter = (counter) => {
    counter = (counter === 4) ? 0 : counter;
    return counter;
}

export default fileLoadModule;