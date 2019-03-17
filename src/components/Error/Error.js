import React, { Component } from 'react';
import '../../styles/Error.css';

const Error = ({error}) => {
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default Error;