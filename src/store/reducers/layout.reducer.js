import { TOGGLE_FORM, OPEN_FORM, CLOSE_FORM, TOGGLE_SIDEBAR } from '../actions/index';

const initialState = {
    isOpenAddForm: false,
    isOpenSidebar: false
};

export function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            return {
                state,
                isOpenAddForm: !state.isOpen
            };
        case OPEN_FORM:
            return {
                state,
                isOpenAddForm: true
            };
        case CLOSE_FORM:
            return {
                state,
                isOpenAddForm: false
            };
        case TOGGLE_SIDEBAR:
            return {
                state,
                isOpenSidebar: !state.isOpenSidebar
            };
        default:
            return state;
    }
}

