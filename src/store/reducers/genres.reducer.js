import {INITED_GENRES} from '../actions/index';

const initialState = {
    genres: [],
    initialGenres: []
};

export function genresReducer(state = initialState, action) {
    switch (action.type) {
        case INITED_GENRES:
            return {
                ...state,
                genres: action.payload,
                initialGenres: action.payload
            };
        default:
            return state;
    }
}