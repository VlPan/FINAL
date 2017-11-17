import {
    TOGGLE_FORM,
    OPEN_FORM,
    CLOSE_FORM
} from './addMovieForm.types';

export function toggleAddMovieForm(payload) {
    return {
        type: TOGGLE_FORM,
        payload
    };
}

export function openAddMovieForm(payload) {
    return {
        type: OPEN_FORM,
        payload
    };
}

export function closeAddMovieForm(payload) {
    return {
        type: CLOSE_FORM,
        payload
    };
}

