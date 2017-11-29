import {
    INIT_MYLIB,
    SAVE_ITEM,
    DELETE_ITEM,
    FILTER_ITEMS_BY_NAME,
    FILTER_ITEMS_ADVANCED
} from '../actions/index';
import {LS, customLib} from '../../services';

const initialState = {
    savedItems: [],
    initialItems: [],
    fullItems: []
};

export function myLibReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_MYLIB:
            let savedItems, initialItems, fullItems;
            let filterOptions = LS.get('filterOptionsMyLib') || null;
            savedItems = initialItems = fullItems = LS.get('savedItems');
            console.log(fullItems);
            if(filterOptions && savedItems){
                initialItems = savedItems = customLib.filterArray(savedItems, filterOptions);
            }
            console.log(savedItems);
            console.log(fullItems);
            return {
                ...state,
                savedItems,
                initialItems,
                fullItems
            };
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
                    return item.name.trim().toLowerCase().indexOf(action.payload.trim().toLowerCase()) !== -1;
                })
            };
        case FILTER_ITEMS_ADVANCED:
            console.log('FILTER MyLibs Items ADVANCED');
            filterOptions = action.payload;
            if(action.payload.rememberInputs) {
                localStorage.removeItem('filterOptionsMyLib');
                LS.set('filterOptionsMyLib', filterOptions);
            }
            let arrToFilter = state.fullItems;
            console.log('arrToFilter', arrToFilter);

            arrToFilter = customLib.filterArray(arrToFilter, filterOptions);

            return {
                ...state,
                savedItems: arrToFilter,
                initialItems: arrToFilter
            };
        default:
            return state;
    }
}
