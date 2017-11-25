import {SAVE_ITEM, DELETE_ITEM} from '../actions/index';
import {LS} from '../../services';

const initialState = {
    savedItems: LS.get('savedItems') || []
};

export function myLibReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ITEM:
            const saved = state.savedItems.filter((item) => item.id === action.payload.id).length > 0;
            if (saved) {
                alert('Item has already been added');
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
            newItems = state.savedItems.filter((item)=>{
                return item.id !== action.payload.id;
            });
            console.log(newItems);
            LS.set('savedItems', newItems);
            return {
                ...state,
                savedItems: newItems
            };
        default:
            return state;
    }
}