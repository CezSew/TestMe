import React, { Component } from 'react';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(e) {
        const step = e.target.dataset.step;
        this.props.changeAppStep(step);
    }

    render () {
        return (
            <nav className="menu">
                <ul>
                    <li className="menu__item"><a href="/" onClick={this.handleButtonClick} data-step="start" className="menu__button">Default</a></li>
                    <li className="menu__item"><a href="/load-questions" onClick={this.handleButtonClick} data-step="load" className="menu__button">Load questions</a></li>
                    <li className="menu__item"><a href="/choose-test" onClick={this.handleButtonClick} data-step="choose" className="menu__button">Choose test</a></li>
                    <li className="menu__item"><button className="menu__button">Mode: Explorer</button></li>
                    <li className="menu__item"><a href="/about" onClick={this.handleButtonClick} data-step="about" className="menu__button">About</a></li>
                </ul>
            </nav>
        );
    }
}         