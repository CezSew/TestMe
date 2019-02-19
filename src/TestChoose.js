import React, { Component } from 'react';
import TestChooseItem from './TestChooseItem';

export default class TestChoose extends Component {
    render () {
        let testObj = this.props.availableTests.tests;
        let tests =  Object.keys(testObj).map((key) => {
            let imageURL = testObj[key].imageURL ? testObj[key].imageURL : 'img/no-image.jpg';
            return <TestChooseItem test={testObj} key={key} itemKey={key} imageURL={imageURL} alt={testObj[key].imageAlt} handleChoosetest={this.props.handleChoosetest}/>
          });
        return (
            <section className="page-choose-test">
                <h2 className="page-choose-test__title">Available tests: </h2>
                <ul className="page-choose-test__list">
                    {tests}
                </ul>
            </section>
        )
    }
}