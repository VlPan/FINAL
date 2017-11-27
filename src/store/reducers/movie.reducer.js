import { INITED_MOVIES, FILTER_MOVIES_BY_NAME, ADD_MOVIE } from '../actions';
import {LS} from '../../services';


const initialState = {
    movies: [],
    initialMovies: []
};

export function movieReducer(state = initialState, action) {
    switch (action.type) {
        case INITED_MOVIES:
            return {
                ...state,
                movies: action.payload,
                initialMovies: action.payload
            };
        case FILTER_MOVIES_BY_NAME:
            if(action.payload.length === 0){
                return{
                    ...state,
                    movies: state.initialMovies
                };
            }
            return{
                ...state,
                movies: state.initialMovies.filter((movie)=>{
                    return movie.name.indexOf(action.payload) !== -1;
                })
            };
        case ADD_MOVIE:
            let adddedFilms = LS.get('addedFilms') || [];
            action.payload.movie = true;
            adddedFilms.push(action.payload);
            LS.set('addedFilms', adddedFilms);
            return {
                ...state,
                movies: state.initialMovies.concat(action.payload)
            };
        default:
            return state;
    }
}