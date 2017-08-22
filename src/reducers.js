import update from 'immutability-helper';

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

[...Array(12).keys()].forEach(key => {initialState.containers['Slot_3_' + key] = [null];});

initialState.cards.forEach(card => {
    card.color = '#' + [0, 0, 0].map(() => 
        Math.floor(Math.random() * (230 - 200) + 200).toString(16)).join('');
});

const remove = (dragIndex) => [dragIndex, 1];
const add = (dropIndex, dragId) => [dropIndex, 0, dragId];

const reducer = (state = initialState, action) => {
    const dropIndex = action.dropIndex === '$last' 
        ? state.containers[action.dropContainerId].length
        : action.dropIndex;
    switch (action.type) {
        case 'MOVE_CARD':
            return update(state, {
                containers: {
                    [action.dropContainerId]: {
                        $splice: [
                            remove(action.dragItem.index),
                            add(dropIndex, action.dragItem.id)
                        ],
                    }
                },
            });
        case 'MOVE_CARD_TO_ANOTHER_CONTAINER':
            return update(state, {
                containers: {
                    [action.dragItem.containerId]: {
                        $splice: [remove(action.dragItem.index)]
                    },
                    [action.dropContainerId]: {
                        $splice: [add(dropIndex, action.dragItem.id)]
                    }
                },
            });
        case 'MOVE_CARD_TO_SLOT':
            const slot = state.containers[action.dropContainerId]
            if (slot.length === 0 || slot[0] === null) {
                return update(state, {
                    containers: {
                        [action.dragItem.containerId]: {
                            $splice: [remove(action.dragItem.index)]
                        },
                        [action.dropContainerId]: {
                            $set: [action.dragItem.id]
                        }
                    }
                });
            } else {
                return state;
            }
        default: return state; 
    }
};

export default reducer;