import React from 'react';
import '../../styles/Error.css';
import PropTypes from 'prop-types';

const Error = ({error}) => 
        <div className="error">
            {error}
        </div>

Error.propTypes = {
    error: PropTypes.string.isRequired
};

export default Error;