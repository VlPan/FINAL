import {
    INIT_TV_SHOWS,
    INITED_TV_SHOWS
} from './../actions';

import {
    EntityTvService,
    LS
} from '../../services';


export const tvShowsInniter = store => next => action => {
    if (action.type === INIT_TV_SHOWS) {
        let entityTvService = new EntityTvService();
        let addedTvShows = LS.get('addedTvShows') || [];
        entityTvService.getTvEntities().then((tvShows) => {
            LS.set('tvShows', tvShows);
            store.dispatch({
                type: INITED_TV_SHOWS,
                payload: [...tvShows, ...addedTvShows]
            });
        }, (error) => {
            console.log('ТвШоу не пришли не пришли с сервера. Используем Кэширование', error);
            store.dispatch({
                type: INITED_TV_SHOWS,
                payload: [...LS.get('tvShows'), ...addedTvShows]
            });
        });
    }
    return next(action);
};
