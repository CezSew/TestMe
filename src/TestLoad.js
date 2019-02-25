import React, { Component } from 'react';
import fileLoadModule from './loadFile';


export default class TestLoad extends Component {
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