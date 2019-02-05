import React, { Component } from 'react';
import logo from './logo.svg';
import Button from './Button';
import Title from './Title';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick = () => {
    console.log('click');
  }   
  
  render() {
    return (
      <div className="App">
        <section className="container d-flex flex-column justify-content-center align-items-center">
          <Title text="TestMe"/>
          <Button handleClick={this.handleButtonClick}/>
        </section>
      </div>
    );
  }
}

export default App;
