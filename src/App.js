import React, { Component } from 'react';

import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; 
import { DragDropContext } from 'react-dnd';

import Container from './Container.jsx';
import SlotContainer from './SlotContainer.jsx';

import { wrap } from './fun'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Container id="1" />
        <Container id="2" />
        <SlotContainer id="3" />
      </div>
    );
  }
}

export default wrap(
  DragDropContext(MultiBackend(HTML5toTouch)),
  App
);


/*
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
*/