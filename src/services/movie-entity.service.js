import {RequestServise} from './request-service.js';
import {MovieEntity} from './movie.entity.dto.js';
import {urlService} from './url-service';


export class EntityMovieService {
    constructor() {
        this.requestServise = new RequestServise();
    }

    getMovieEntities() {
        return this.requestServise.getRequest(urlService.popularMovies()).then(result => {
            let arr = JSON.parse(result).results;
            let movies = arr.map((item) => {
                return new MovieEntity(item); // MAPPING
            });
            return movies;
        });
    }

    getRecommended(id) {
        return this.requestServise.getRequest(urlService.movieRecommended(id))
            .then(result => {
                let arr = JSON.parse(result).results;
                let recommendedMovies = arr.map((item) => {
                    return new MovieEntity(item); // MAPPING
                });
                return recommendedMovies;
            });
    }

    getMovieById(id) {
        return this.requestServise.getRequest(urlService.movie(id))
            .then(result => {
                let movie = JSON.parse(result);
                console.log(movie);
                let mappedMovie = new MovieEntity(movie);
                return mappedMovie;
            });
    }
}