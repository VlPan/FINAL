import { combineReducers } from 'redux';
import {sidebarReducer} from './sidebar.reducer';
import {addMovieFormReducer} from './addMovieForm.reducer';

export const appReducers = combineReducers({
    sidebar: sidebarReducer,
    addMovieForm: addMovieFormReducer
});
