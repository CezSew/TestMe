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
                    <li className="menu__item"><button onClick={this.handleButtonClick} data-step="start" className="menu__button">Default</button></li>
                    <li className="menu__item"><button className="menu__button">Load questions</button></li>
                    <li className="menu__item"><button onClick={this.handleButtonClick} data-step="choose" className="menu__button">Choose test</button></li>
                    <li className="menu__item"><button className="menu__button">Mode: Explorer</button></li>
                    <li className="menu__item"><button className="menu__button">About</button></li>
                </ul>
            </nav>
        );
    }
}         