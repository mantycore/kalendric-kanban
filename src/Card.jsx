
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { wrap } from './fun'
import ItemTypes from './ItemTypes';

const style = {
  //border: '1px dashed gray',
  //borderRadius: 20,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  //backgroundColor: 'white',
  cursor: 'move',
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

    if (dragItem.index === dropIndex) {
      return;
    }

    if (dragItem.containerId === dropContainerId) {
      props.moveCard(dragItem, dropContainerId, dropIndex);      
    } else {
      props.moveCardToAnotherContainer(dragItem, dropContainerId, dropIndex);
    }
    
  }
};

export default wrap(
  
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),

  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
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