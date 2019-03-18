import React  from 'react';
import PropTypes from 'prop-types';

const Menu = ({changeAppStep}) =>  {

    const handleButtonClick = (e) => {
        const step = e.target.dataset.step;
        changeAppStep(step);
    }
    return (
        <nav className="menu">
            <ul>
                <li className="menu__item">
                    <a href="/" onClick={handleButtonClick} data-step="start" className="menu__button">
                        Default
                    </a>
                </li>
                <li className="menu__item">
                    <a href="/load-questions" onClick={handleButtonClick} data-step="load" className="menu__button">
                        Load questions
                    </a>
                </li>
                <li className="menu__item">
                    <a href="/choose-test" onClick={handleButtonClick} data-step="choose" className="menu__button">
                        Choose test
                    </a>
                </li>
                <li className="menu__item">
                    <button className="menu__button">Mode: Explorer</button>
                </li>
                <li className="menu__item">
                    <a href="/about" onClick={handleButtonClick} data-step="about" className="menu__button">
                        About
                    </a>
                </li>
            </ul>
        </nav>
    );
}         

Menu.propTypes = {
    changeAppStep: PropTypes.func.isRequired
};

export default Menu;