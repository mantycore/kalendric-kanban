import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { wrap } from './fun';
import ItemTypes from './ItemTypes';
import { connect } from 'react-redux';
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
    state => { return state; },
    dispatch => { return {
      moveCardToSlot: (dragItem, dropContainerId, dropIndex) => dispatch({type: 'MOVE_CARD_TO_SLOT', dragItem, dropContainerId, dropIndex}),
    }; }

  ),

  DropTarget(ItemTypes.CARD, slotTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),

  class extends Component {
    render() {
      const cardId = this.props.containers[this.props.id][0];
      const card = cardId === null || cardId === undefined ? null : this.props.cards[cardId];

      return wrap(
        this.props.connectDropTarget,
        <div style={slotStyle}>
        {(card !== null) ? 
            
          <Card
            key={card.id}
            id={card.id}
            index="0"
            color={card.color}
            containerId={this.props.id}
            text={card.text}
            moveCard={this.props.moveCard}
            moveCardToAnotherContainer={this.props.moveCardToAnotherContainer}
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
    {
      [...Array(12).keys()].map(key => <Slot key={key} id={"Slot_" + this.props.id + "_" + key.toString(10)} />)
    }
    </div>; 
  }
};