import {
    INIT_MOVIES,
    INITED_MOVIES
} from './../actions';

import {
    EntityMovieService,
    LS
} from '../../services';


export const movieInniter = store => next => action => {

    if (action.type === INIT_MOVIES) {
        let entityMovieService = new EntityMovieService();
        let addedMovies = LS.get('addedFilms') || [];
        entityMovieService.getMovieEntities().then((movies) => {
            LS.set('films', movies);
            store.dispatch({
                type: INITED_MOVIES,
                payload: [...movies, ...addedMovies]
            });
        }, (error) => {
            console.log('Фильмы не пришли с сервера. Используем Кэширование', error);
            store.dispatch({
                type: INITED_MOVIES,
                payload: [...LS.get('films'), ...addedMovies]
            });
        });
    }
    return next(action);
};
