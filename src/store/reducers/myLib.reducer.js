import {SAVE_ITEM, DELETE_ITEM, FILTER_ITEMS_BY_NAME, SET_INITIAL_STATE} from '../actions/index';
import {LS} from '../../services';

const initialState = {
    savedItems: LS.get('savedItems') || [],
    initialItems: LS.get('savedItems') || []
};

export function myLibReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ITEM:
            const saved = state.savedItems.filter((item) => item.id === action.payload.id).length > 0;
            if (saved) {
                alert('Item has already been saved');
                break;
            }

            let newItems = state.savedItems.concat(action.payload);
            console.log(newItems);
            LS.set('savedItems', newItems);
            return {
                ...state,
                savedItems: newItems
            };
        case DELETE_ITEM:
            newItems = state.savedItems.filter((item) => {
                return item.id !== action.payload.id;
            });
            console.log(newItems);
            LS.set('savedItems', newItems);
            return {
                ...state,
                savedItems: newItems
            };
        case FILTER_ITEMS_BY_NAME:
            if(action.payload.length === 0){
                return{
                    ...state,
                    savedItems: state.initialItems
                };
            }
            return {
                ...state,
                savedItems: state.initialItems.filter((item) => {
                    return item.name.indexOf(action.payload) !== -1;
                })
            };
        default:
            return state;
    }
}
