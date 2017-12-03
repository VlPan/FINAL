import { INITED_MOVIES,
    FILTER_MOVIES_BY_NAME,
    ADD_MOVIE,
    FILTER_MOVIES_ADVANCED
} from '../actions';
import {LS, customLib} from '../../services';


const initialState = {
    movies: [],
    initialMovies: [],
    fullMovies: []
};

export function movieReducer(state = initialState, action) {

    switch (action.type) {
        case INITED_MOVIES:
            let movies, initialMovies, fullMovies;
            let filterOptions = LS.get('filterOptionsMovies') || null;
            movies = initialMovies = fullMovies = action.payload;
            console.log(fullMovies);
            if(filterOptions){
                initialMovies = movies = customLib.filterArray(movies, filterOptions);
            }
            console.log(movies);
            console.log(fullMovies);
            return {
                ...state,
                movies,
                initialMovies,
                fullMovies
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
                    return movie.name.trim().toLowerCase().indexOf(action.payload.trim().toLowerCase()) !== -1;
                })
            };
        case ADD_MOVIE:
            let adddedFilms = LS.get('addedFilms') || [];
            action.payload.movie = true;
            adddedFilms.push(action.payload);
            LS.set('addedFilms', adddedFilms);
            return {
                ...state,
                initialMovies: state.initialMovies.concat(action.payload),
                fullMovies: state.fullMovies.concat(action.payload),
                movies: state.movies.concat(action.payload)
            };
        case FILTER_MOVIES_ADVANCED:
            filterOptions = action.payload;
            if(action.payload.rememberInputs) {
                console.log('______________________',true);
                console.log(action.payload.rememberInputs);
                localStorage.removeItem('filterOptionsMovies');
                LS.set('filterOptionsMovies', filterOptions);
            }
            let arrToFilter = state.fullMovies;
            console.log('arrToFilter', arrToFilter);

            arrToFilter = customLib.filterArray(arrToFilter,filterOptions );

            return {
                ...state,
                movies: arrToFilter,
                initialMovies: arrToFilter
            };
        default:
            return state;
    }
}

