import React, { Component } from 'react';
import Item from './Item/Item';

export default class Choose extends Component {
    constructor(props) {
        super(props);
        
        this.setUserTestItem = this.setUserTestItem.bind(this);
    }

    setUserTestItem = (key) => {
        let storage = JSON.parse(localStorage.getItem('user-test'));
        if(storage) {
            return <Item test={storage} isUserTest={true} key={key} itemKey={1} imageURL='img/no-image.jpg' alt='No image' handleChoosetest={this.props.handleChoosetest}/>
        } else {
            return '';
        }
    }

    render () {
        let testObj = this.props.availableTests.tests;
        let lastKey;
        let tests =  Object.keys(testObj).map((key) => {
            let imageURL = testObj[key].imageURL ? testObj[key].imageURL : 'img/no-image.jpg';
            lastKey = key;
            return <Item test={testObj} key={key} itemKey={parseInt(key, 10)} imageURL={imageURL} alt={testObj[key].imageAlt} handleChoosetest={this.props.handleChoosetest}/>
          });
        let userTest = this.setUserTestItem(lastKey + 1);
        return (
            <section className="page-choose-test">
                <h2 className="page-choose-test__title">Available tests: </h2>
                <ul className="page-choose-test__list">
                    {tests}
                    {userTest}
                </ul>
            </section>
        )
    }
}