import {
    DATA_RECIVED,
    REQUEST_SENT,
    INIT_GENRES,
    INIT_MOVIES,
    INIT_TV_SHOWS,
    INITED_GENRES,
    INITED_MOVIES,
    INITED_TV_SHOWS,
    FILTER_MOVIES_BY_NAME,
    FILTER_TV_SHOWS_BY_NAME,
    ADD_MOVIE,
    ADD_TV_SHOW,
    SAVE_ITEM,
    DELETE_ITEM
} from './dataControl.types';

export function dataWasRecived(payload) {
    return {
        type: DATA_RECIVED,
        payload
    };
}

export function sendRequestToServer(payload) {
    return {
        type: REQUEST_SENT,
        payload
    };
}

export function initGenres(payload) {
    return {
        type: INIT_GENRES,
        payload
    };
}


export function initMovies(payload) {
    return {
        type: INIT_MOVIES,
        payload
    };
}


export function initTvShows(payload) {
    return {
        type: INIT_TV_SHOWS,
        payload
    };
}

    export function initedGenres(payload) {
    return {
        type: INITED_GENRES,
        payload
    };
}

export function initedMovies(payload) {
    return {
        type: INITED_MOVIES,
        payload
    };
}

export function initedTvShows(payload) {
    return {
        type: INITED_TV_SHOWS,
        payload
    };
}
export function filterMoviesByName(payload) {
    return {
        type: FILTER_MOVIES_BY_NAME,
        payload
    };
}

export function filterTvShowsByName(payload) {
    return {
        type: FILTER_TV_SHOWS_BY_NAME,
        payload
    };
}

export function addMovie(payload) {
    return {
        type: ADD_MOVIE,
        payload
    };
}

export function addTvShow(payload) {
    return {
        type: ADD_TV_SHOW,
        payload
    };
}

export function saveItem(payload) {
    return {
        type: SAVE_ITEM,
        payload
    };
}

export function deleteItem(payload) {
    return {
        type: DELETE_ITEM,
        payload
    };
}


