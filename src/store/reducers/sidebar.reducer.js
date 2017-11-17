import { TOGGLE_SIDEBAR } from '../actions/index';

const initialState = {
    state: 'INITIAL',
    isOpen: false
};

export function sidebarReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                state,
                isOpen: !state.isOpen
            };
        default:
            return state;
    }
}