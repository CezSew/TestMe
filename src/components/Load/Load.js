import React, { Component } from 'react';
import fileLoadModule from '../../utils/loadFile';


export default class Load extends Component {
    componentDidMount() {
        fileLoadModule();
    }
    render () {
        
        return (
        <article>
            <div id="holder"></div> 
            <p id="status">Drop the .txt file</p>
        </article>
        )
    }
}