import {
    INIT_GENRES,
    INITED_GENRES
} from './../actions';

import {
    EntityGenresService,
    LS
} from '../../services';


export const genresInniter = store => next => action => {
    if (action.type === INIT_GENRES) {
        let entityGenresService = new EntityGenresService();
        entityGenresService.getGenres().then((genres) => {
            LS.set('genres', genres);
            store.dispatch({
                type: INITED_GENRES,
                payload: genres || LS.get('genres')
            });
        }, (error) => {
            console.log('Жанры не пришли с сервера. Используем Кэширование', error);
            store.dispatch({
                type: INITED_GENRES,
                payload: LS.get('genres')
            });
        });
    }
    return next(action);
};
