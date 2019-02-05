import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <section className="container d-flex flex-column justify-content-center align-items-center">
          <h1 className="title text-center text-muted mb-5">TestMe</h1>
          <button className="btn btn-primary">ZACZNIJ TEST</button>
        </section>
      </div>
    );
  }
}

export default App;
