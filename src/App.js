import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; 
import { wrap } from './fun'
import './App.css';

import Container from './Container.jsx';
import SlotContainer from './SlotContainer.jsx';

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
