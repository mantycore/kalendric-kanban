import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import actionType from '../ActionTypes.js';
import itemType from '../ItemTypes.js';
import { wrap } from '../fun.js';

import Card from './Card.jsx';

const style = {
    width: 400,
    height: 600,
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: 10,
    backgroundColor: '#f0f8ff',
    padding: 10
};

const slotStyle = {
    width: 400,
    minHeight: 40,
    marginBottom: 10,
    backgroundColor: '#e0f0f8'
}

const slotTarget = {
    drop(props, monitor, component) {
        const dragItem = monitor.getItem();
        const dropContainerId = props.id;

        if (dragItem.containerId !== dropContainerId) {
            props.moveCardToSlot(dragItem, dropContainerId);
        }
    }
}

const Slot = wrap(
    connect(
        state => state,
        dispatch => ({
            moveCardToSlot: (dragItem, dropContainerId) =>
                dispatch({type: actionType('MOVE_CARD_TO_SLOT'), dragItem, dropContainerId}),
        })
    ),

    DropTarget(itemType('CARD'), slotTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    })),

    class extends Component {
        static propTypes = {
            connectDropTarget: PropTypes.func.isRequired,
            id: PropTypes.any.isRequired,
            moveCardToSlot: PropTypes.func.isRequired,
        };

        render() {
            const cardId = this.props.containers[this.props.id][0];
            const card = cardId === null || cardId === undefined
                ? null
                : this.props.cards.find((card) => card.id === cardId);
            return wrap(
                this.props.connectDropTarget,
                <div style={slotStyle}>
                {(card !== null) ? 
                    <Card
                        key={card.id}
                        id={card.id}
                        index={0}
                        color={card.color}
                        containerId={this.props.id}
                        text={card.text}
                    /> : ''
                }
                </div>
            );
        }
    }
)

export default class SlotContainer extends Component {
    render() {
        return <div style={style}>
        {[...Array(12).keys()].map(key =>
            <Slot
                key={key}
                id={"Slot_" + this.props.id + "_" + key.toString(10)}
            />
        )}
        </div>; 
    }
};