import React, { Component } from 'react';
import fileLoadModule from '../../utils/loadFile';

export default class Load extends Component {
    componentDidMount() {
        fileLoadModule();
    }
    render () {
        return (
        <div>
            <div className="app__file-holder" id="holder"></div> 
            <p id="status">Drop the .txt file</p>
        </div>
        )
    }
}