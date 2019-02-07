import React, { Component } from 'react';

export default class Question extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const question = this.props.question[1];
        return (
            <section className="question">
                <h2>{question.question}</h2>
            </section>
        )
    }
}