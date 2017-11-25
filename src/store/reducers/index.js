import { combineReducers } from 'redux';
import {sidebarReducer} from './sidebar.reducer';
import {addMovieFormReducer} from './addMovieForm.reducer';
import {movieReducer} from './movie.reducer';
import {tvShowReducer} from './tvshow.reducer';
import {genresReducer} from './genres.reducer';
import {myLibReducer} from './myLib.reducer';

export const appReducers = combineReducers({
    sidebar: sidebarReducer,
    addMovieForm: addMovieFormReducer,
    movieControl: movieReducer,
    tvShowsControl: tvShowReducer,
    genresControl: genresReducer,
    myLib: myLibReducer
});
