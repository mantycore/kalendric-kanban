import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { wrap } from './fun';

import Card from './Card.jsx';

const style = {
    width: 400,
    height: 600,
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: 10,
    backgroundColor: '#fff8f0',
    padding: 10
};

const containerTarget = {
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            // drop event already handled by a Card 
            return;
        }

        const dragItem = monitor.getItem();
        const dropContainerId = props.id;

        if (dragItem.containerId === dropContainerId) {
            props.moveCard(dragItem, dropContainerId, '$last');      
        } else {
            props.moveCardToAnotherContainer(dragItem, dropContainerId, '$last');
        }
    }
};

export default wrap(
    connect(
        state => { return state; },
        dispatch => { return {
            moveCard: (dragItem, dropContainerId, dropIndex) =>
                dispatch({type: 'MOVE_CARD', dragItem, dropContainerId, dropIndex}),
            moveCardToAnotherContainer: (dragItem, dropContainerId, dropIndex) =>
                dispatch({type: 'MOVE_CARD_TO_ANOTHER_CONTAINER', dragItem, dropContainerId, dropIndex}),
        }; }
    ),

    DropTarget(ItemTypes.CARD, containerTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    })),

    class Container extends Component {
        render() {
            const { cards, containers } = this.props;

            return wrap(
                this.props.connectDropTarget,
                <div style={style}>
                    {containers[this.props.id].map((cardId, i) => {
                        const card = cards.find((card) => card.id === cardId);
                        return <Card
                            key={card.id}
                            index={i}
                            id={card.id}
                            color={card.color}
                            containerId={this.props.id}
                            text={card.text}
                            moveCard={this.props.moveCard}
                            moveCardToAnotherContainer={this.props.moveCardToAnotherContainer}
                        />
                    })}
                </div>
            );
        }
    }
);