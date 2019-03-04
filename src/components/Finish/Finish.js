import React, { Component } from 'react';

export default class Finish extends Component {
    constructor(props) {
        super(props);
        this.getTotalQuestions = this.getTotalQuestions.bind(this);
    }

    getTotalQuestions = () => {
        return this.props.stats.length;
    }

    getCorrectNumber = () => {
        let count = 0;
        this.props.stats.forEach((item) => {
            if (item[1]) count++;
        });
        return count;
    }

    render () {
        let stats = Object.keys(this.props.stats).map((key)=>{
            return <p key={key}>Pytanie nr {this.props.stats[key][0]}: {this.props.stats[key][1] ? "poprawnie" : "niepoprawnie"}</p>;
          });
        let correctNumber = this.getCorrectNumber();
        let total = this.getTotalQuestions();
        return (
            <React.Fragment>
            {stats}
            {correctNumber}/{total}
          </React.Fragment>
        )
    }
}