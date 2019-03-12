import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Item extends Component {
    constructor(props) {
        super(props); 

        this.getName = this.getName.bind(this);
    }

    getName = (test, key) => {
        let testName;
        if(this.props.isUserTest) {
            testName = test.name;
        } else {
            testName = test[key].name;
        }

        return testName;
    }

    render () {
        let key = this.props.itemKey;
        let imageURL = this.props.imageURL;
        let imageAlt = this.props.imageAlt;
        let test = this.props.test;
        let testName = this.getName(test, key);
        return (
            <li className="page-choose-test__item m-2" key={key}>
                <button className="page-choose-test__button" onClick={() => { this.props.handleChoosetest(testName)}}>
                    <img className="page-choose-test__image" src={imageURL} alt={imageAlt} />
                    <div className="page-choose-test__name p-3 bg-secondary text-white">{testName}</div>
                </button>
            </li>
        )
    }
}

Item.propTypes = {
    imageURL: PropTypes.string.isRequired,
    itemKey: PropTypes.number.isRequired,
    imageAlt: PropTypes.string,
    test: PropTypes.object.isRequired,
    handleChoosetest: PropTypes.func.isRequired,
    isUserTest: PropTypes.bool
}