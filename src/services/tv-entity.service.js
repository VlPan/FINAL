import {TvShowEntity} from './tvshow.entity.dto.js';
import {RequestServise} from './request-service.js';

export class EntityTvService {
    constructor() {
        this.requestServise = new RequestServise();
        this.url = 'https://api.themoviedb.org/3/tv/popular?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US&page=1';
    }

    getTvEntities() {
        return this.requestServise.getRequest(this.url).then(result => {
            let arr = JSON.parse(result).results;
            let shows = arr.map((item)=>{
                return new TvShowEntity(item); // MAPPING
            });
            return shows;
        });
    }

    getRecommended(id) {
        return this.requestServise.getRequest(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US&page=1`)
            .then(result => {
                let arr = JSON.parse(result).results;
                let recommendedTvShows = arr.map((item) => {
                    return new TvShowEntity(item); // MAPPING
                });
                return recommendedTvShows;
            });
    }

    getTvShowById(id) {
        return this.requestServise.getRequest(`https://api.themoviedb.org/3/tv/${id}?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US`)
            .then(result => {
                let tvShow = JSON.parse(result);
                console.log(tvShow);
                let mappedTvShow = new TvShowEntity(tvShow);
                return mappedTvShow;
            });
    }
}