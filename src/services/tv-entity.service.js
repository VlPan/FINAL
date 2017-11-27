import {TvShowEntity} from './tvshow.entity.dto.js';
import {RequestServise} from './request-service.js';
import{urlService} from './url-service';

export class EntityTvService {
    constructor() {
        this.requestServise = new RequestServise();
    }

    getTvEntities() {
        return this.requestServise.getRequest(urlService.popularTvShows())
            .then(result => {
            let arr = JSON.parse(result).results;
            let shows = arr.map((item)=>{
                return new TvShowEntity(item); // MAPPING
            });
            return shows;
        });
    }

    getRecommended(id) {
        return this.requestServise.getRequest(urlService.tvShowsRecommended(id))
            .then(result => {
                let arr = JSON.parse(result).results;
                let recommendedTvShows = arr.map((item) => {
                    return new TvShowEntity(item); // MAPPING
                });
                return recommendedTvShows;
            });
    }

    getTvShowById(id) {
        return this.requestServise.getRequest(urlService.tvShow(id))
            .then(result => {
                let tvShow = JSON.parse(result);
                console.log(tvShow);
                let mappedTvShow = new TvShowEntity(tvShow);
                return mappedTvShow;
            });
    }
}