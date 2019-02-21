import React, { Component } from 'react';


export default class TestChooseItem extends Component {
    render () {
      let key = this.props.itemKey;
      let imageURL = this.props.imageURL;
      let imageAlt = this.props.imageAlt;
      let test = this.props.test;
      console.log(key);
        return (
            <li className="page-choose-test__item" key={key}>
                <button className="page-choose-test__button" onClick={() => { this.props.handleChoosetest(test[key].name)}}>
                    <img className="page-choose-test__image" src={imageURL} alt={imageAlt} />
                    {test[key].name}
                </button>
            </li>
        )
    }
}