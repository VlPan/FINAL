import { TOGGLE_FORM, OPEN_FORM, CLOSE_FORM } from '../actions/index';

const initialState = {
    state: 'INITIAL',
    isOpen: false
};

export function addMovieFormReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            return {
                state,
                isOpen: !state.isOpen
            };
        case OPEN_FORM:
            return {
                state,
                isOpen: true
            };
        case CLOSE_FORM:
            return {
                state,
                isOpen: false
            };
        default:
            return state;
    }
}