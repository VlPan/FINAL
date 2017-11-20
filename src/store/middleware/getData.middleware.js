import LS from './../../services/LS';
import {EntityMovieService} from './../../services/movie-entity.service';
import {EntityTvService} from './../../services/tv-entity.service';
import {EntityGenresService} from './../../services/genres.entity.service';
import {dataWasRecived} from './../../store/actions';


export const getData = store => next => action => {

    let films = LS.get('films');
    let tvShows = LS.get('tvShows');
    let genres = LS.get('genres');
    if (!films || !tvShows || !genres) {
        let entityMovieService = new EntityMovieService();
        let entityTvService = new EntityTvService();
        let entityGenresService = new EntityGenresService();
        entityMovieService.getMovieEntities().then((movies) => {
            LS.set('films', movies);
            return entityTvService.getTvEntities().then((tvShows) => {
                LS.set('tvShows', tvShows);
                return entityGenresService.getGenres().then((genres) => {
                    LS.set('genres', genres);
                    return store.dispatch(dataWasRecived());
                });
            });
        });
    }
    return next(action);
};



