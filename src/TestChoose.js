import React, { Component } from 'react';

export default class TestChoose extends Component {
    render () {
        let tests = this.props.availableTests.tests.map((item, index) => {
            return <li key={index}><button onClick={() => { this.props.handleChoosetest(item)}}>{item}</button></li>;
          });
        return (
            <div>
                Available tests: 
                <ul>
                    {tests}
                </ul>
            </div>
        )
    }
}