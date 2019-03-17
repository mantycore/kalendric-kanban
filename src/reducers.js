import produce from 'immer';
import actionType from './ActionTypes.js';

let initialState = {
    cards: [
    {
        id: 1,
        text: 'The Wind That Shakes the Barley',
    }, {
        id: 2,
        text: 'Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci~ velit, sed quia non numquam ~ eius modi tempora inci~dunt, ut labore et dolore magnam aliquam quaerat voluptatem.',
    }, {
        id: 3,
        text: 'Zombie',
    }, {
        id: 4,
        text: 'With God on Our Side',
    }, {
        id: 5,
        text: 'Give Peace a Chance',
    }, {
        id: 6,
        text: 'Miss Sarajevo',
    }, {
        id: 7,
        text: 'Threnody for the Victims of Hiroshima',
    }],
    containers: {
        1: [1, 2, 3, 4, 5, 6, 7],
        2: []
    }
};

//initialize dozen empty slots in the slot container
[...Array(12).keys()].forEach(key => {initialState.containers['Slot_3_' + key] = [];});

//give the cards random pastel colors
initialState.cards.forEach(card => {
    card.color = '#' + [0, 0, 0].map(() => 
        Math.floor(Math.random() * (230 - 200) + 200).toString(16)).join('');
});

const reducer = (state = initialState, action) => {
    const dropIndex = action.dropIndex === '$last' 
        ? state.containers[action.dropContainerId].length
        : action.dropIndex;

    const move = (fromContainer, toContainer, fromIndex, toIndex, item) => {
        fromContainer.splice(fromIndex, 1);
        toContainer.splice(toIndex, 0, item);
    }

    switch (action.type) {
        case actionType('MOVE_CARD'):
            return produce(state, draftState => {
                let container = draftState.containers[action.dropContainerId];
                move(container, container,
                        action.dragItem.index, dropIndex, action.dragItem.id);
            });
        case actionType('MOVE_CARD_TO_ANOTHER_CONTAINER'):
            return produce(state, draftState => {
                move(
                    draftState.containers[action.dragItem.containerId],
                    draftState.containers[action.dropContainerId],
                    action.dragItem.index, dropIndex, action.dragItem.id
                );
            })
        case actionType('MOVE_CARD_TO_SLOT'):
            const slot = state.containers[action.dropContainerId];
            if (slot.length === 0) {
                return produce(state, draftState => {
                    draftState.containers[action.dragItem.containerId].splice(action.dragItem.index, 1);
                    draftState.containers[action.dropContainerId] = [action.dragItem.id];
                });
            } else {
                //the slot is already occupied
                return state;
            }
        default: return state; 
    }
};

export default reducer;