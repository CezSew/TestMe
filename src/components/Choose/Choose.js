import React from 'react';
import Item from './Item/Item';
import Title from '../../Title';


const Choose = (props) => {
    const setUserTestItem = (key) => {
        let storage = JSON.parse(localStorage.getItem('user-test'));
        if(storage) {
            return <Item test={storage} isUserTest={true} key={key} itemKey={1} imageURL='img/no-image.jpg' alt='No image' handleChoosetest={props.handleChoosetest}/>
        } else {
            return '';
        }
    }
    let testObj = props.availableTests.tests;
    let testArrayKeys =  Object.keys(testObj);
    let tests =  testArrayKeys.map((key) => {
        let imageURL = testObj[key].imageURL ? testObj[key].imageURL : 'img/no-image.jpg';
        return <Item test={testObj} key={key} itemKey={parseInt(key, 10)} imageURL={imageURL} alt={testObj[key].imageAlt} handleChoosetest={props.handleChoosetest}/>
        });
    let key = testArrayKeys.length;
    let userTest = setUserTestItem(key);
    return (
        <section className="page-choose-test">
            <Title text="Available tests:" additionalClasses="page-choose-test__title"/>
            <ul className="page-choose-test__list">
                {tests}
                {userTest}
            </ul>
        </section>
    )
}

export default Choose;