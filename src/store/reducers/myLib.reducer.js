import {
    INIT_MYLIB,
    SAVE_ITEM,
    DELETE_ITEM,
    FILTER_ITEMS_BY_NAME,
    FILTER_ITEMS_ADVANCED
} from '../actions/index';
import {LS, customLib} from '../../services';
import {WATCH_ALL_ITEMS} from '../actions/store.types';

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
            savedItems = initialItems = fullItems = LS.get('savedItems') || [];

            if (filterOptions && savedItems) {
                initialItems = savedItems = customLib.filterArray(savedItems, filterOptions);
            }

            return {
                ...state,
                savedItems,
                initialItems,
                fullItems
            };
        case SAVE_ITEM:
            const saved = state.savedItems.filter((item) => item.id === action.payload.id).length > 0;
            if (saved) {
                alert('Item has already been saved!');
                break;
            }

            let newItems = state.savedItems.concat(action.payload);
            let newFullItems = state.fullItems.concat(action.payload);
            let newInitialItems = state.initialItems.concat(action.payload);
            LS.set('savedItems', newFullItems);
            return {
                ...state,
                savedItems: newItems,
                initialItems: newInitialItems,
                fullItems: newFullItems
            };
        case DELETE_ITEM:
            newItems = state.savedItems.filter((item) => {
                return item.id !== action.payload.id;
            });
            newFullItems = state.fullItems.filter((item) => {
                return item.id !== action.payload.id;
            });
            newInitialItems = state.initialItems.filter((item) => {
                return item.id !== action.payload.id;
            });
            LS.set('savedItems', newFullItems);
            return {
                ...state,
                savedItems: newItems,
                fullItems: newFullItems,
                initialItems: newInitialItems
            };
        case FILTER_ITEMS_BY_NAME:
            if (action.payload.length === 0) {
                return {
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

            filterOptions = action.payload;
            if (action.payload.rememberInputs) {
                localStorage.removeItem('filterOptionsMyLib');
                LS.set('filterOptionsMyLib', filterOptions);
            }
            let arrToFilter = state.fullItems;


            arrToFilter = customLib.filterArray(arrToFilter, filterOptions);
            return {
                ...state,
                savedItems: arrToFilter,
                initialItems: arrToFilter
            };
        case WATCH_ALL_ITEMS:
            let newSaveItems = state.savedItems.map((item) => {
                return {
                    ...item,
                    watched: true
                };
            });

            fullItems = state.fullItems;

            for (let i = 0; i < fullItems.length; i++) {
                for (let y = 0; y < newSaveItems.length; y++) {
                    if (fullItems[i].id === newSaveItems[y].id) {
                        fullItems[i].watched = true;
                    }
                }
            }


            LS.set('savedItems', fullItems);
            return {
                ...state,
                savedItems: newSaveItems,
                fullItems: fullItems
            };
        default:
            return state;
    }
}
