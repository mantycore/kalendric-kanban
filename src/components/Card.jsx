import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import itemType from '../ItemTypes.js';
import { wrap } from '../fun.js'

const style = {
    //border: '1px dashed gray',
    //borderRadius: 20,
      // dnd api copies rectangular area, so non-rectangular draggables work poorly out of the box
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    //backgroundColor: 'white',
    cursor: 'move',
    userSelect: 'none'
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            containerId: props.containerId
        };
    },
};

const cardTarget = {
    drop(props, monitor, component) {
        const dragItem = monitor.getItem();
        
        const dropIndex = props.index;
        const dropContainerId = props.containerId;

        if (dragItem.containerId === dropContainerId) {
            if (dragItem.index !== dropIndex) {
                props.moveCard(dragItem, dropContainerId, dropIndex);
            }
        } else {
            if (dropContainerId.match(/^Slot/)) {
                props.moveCardToSlot(dragItem, dropContainerId);
            } else {
                props.moveCardToAnotherContainer(dragItem, dropContainerId, dropIndex);
            }
        }
    }
};

export default wrap(
    connect(
        state => state,
        dispatch => ({
            moveCard: (dragItem, dropContainerId, dropIndex) =>
                dispatch({type: 'MOVE_CARD', dragItem, dropContainerId, dropIndex}),
            moveCardToAnotherContainer: (dragItem, dropContainerId, dropIndex) =>
                dispatch({type: 'MOVE_CARD_TO_ANOTHER_CONTAINER', dragItem, dropContainerId, dropIndex}),
            moveCardToSlot: (dragItem, dropContainerId) =>
                dispatch({type: 'MOVE_CARD_TO_SLOT', dragItem, dropContainerId}),
        })
    ),

    DropTarget(itemType('CARD'), cardTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    })),

    DragSource(itemType('CARD'), cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })),

    class Card extends Component {
        static propTypes = {
            connectDragSource: PropTypes.func.isRequired,
            connectDropTarget: PropTypes.func.isRequired,
            index: PropTypes.number.isRequired,
            isDragging: PropTypes.bool.isRequired,
            id: PropTypes.any.isRequired,
            text: PropTypes.string.isRequired,
            moveCard: PropTypes.func.isRequired,
            moveCardToAnotherContainer: PropTypes.func.isRequired,
            moveCardToSlot: PropTypes.func.isRequired
        };

        render() {
            const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
            const opacity = isDragging ? 0 : 1;

            return wrap(
                connectDragSource,
                connectDropTarget,
                <div style={{ ...style, opacity, backgroundColor: this.props.color }}>
                    {text}
                </div>,
            );
        }
    }
);