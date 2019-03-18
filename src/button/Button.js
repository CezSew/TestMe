import React from 'react';
import PropTypes from 'prop-types';

 const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick} className="btn btn-primary">{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default Button;