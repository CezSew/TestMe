import React, { Component } from 'react';

export default class Button extends Component {
    render () {
        return (
            <button onClick={this.props.handleClick} className="btn btn-primary">ZACZNIJ TEST</button>
        )
    }
}