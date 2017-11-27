import { combineReducers } from 'redux';
import {layoutReducer} from './layout.reducer';
import {movieReducer} from './movie.reducer';
import {tvShowReducer} from './tvshow.reducer';
import {genresReducer} from './genres.reducer';
import {myLibReducer} from './myLib.reducer';

export const appReducers = combineReducers({
    layout: layoutReducer,
    movieControl: movieReducer,
    tvShowsControl: tvShowReducer,
    genresControl: genresReducer,
    myLib: myLibReducer
});
